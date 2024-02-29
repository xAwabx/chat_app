import dbConnect from "@/lib/mongodb";
import { pusherServer } from "@/lib/pusher";
import Chat from "@/models/Chats";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// friendEmail  our uid  our name
export async function POST(req: any) {
  await dbConnect();
  const { uid, name, email } = await req.json();

  const friend = await User.findOne({ email: email });
  const user = (await User.findOne({ uid: uid })) as UserDB;

  //check if valid email
  if (!friend) {
    return NextResponse.json({ message: "email not found" });
  }

  //check if a request is already sent to that user
  const isRequested = friend.requests.some((obj: any) => obj.Id === user.uid);
  if (isRequested) {
    return NextResponse.json({ message: "friend request is already sent" });
  }

  //check if user is already a friend
  const isFriend = user.friends.some((obj) => obj.friendId === friend.uid);
  if (isFriend) {
    ("is friend");
    return NextResponse.json({
      message: "user is already added as a friend",
    });
  }
  console.log("SERVER SIDE: ", name, uid);

  //accepting friend request if the friend has already sent a friend request to user
  const userRequestExist = user.requests.some(
    (obj: any) => obj.Id === friend.uid
  );
  if (userRequestExist) {
    //creating a new chat document
    const doc = (await Chat.create({
      members: [user.name, friend.name],
    })) as ChatDB;
    console.log(doc._id);

    //updating friend data with our id and adding the new chatId
    const updatedFriend = await User.findOneAndUpdate(
      { uid: friend.uid },
      { $push: { friends: { friendId: uid, chatId: doc._id } } },
      { new: true }
    );

    //updating our data with friend id and adding the new chatId
    const updatedMe = await User.findOneAndUpdate(
      { uid: uid },
      {
        $push: { friends: { friendId: friend.uid, chatId: doc._id } },
        $pull: { requests: { Id: friend.uid } },
      },
      { new: true }
    );
    if (updatedFriend) {
      pusherServer.trigger(
        `friend-accept-channel-${friend.uid}`,
        "accepted-friend-incoming",
        updatedFriend
      );

      return NextResponse.json({
        message: "friend added successfully",
        data: updatedMe,
      });
    } else {
      return NextResponse.json({
        message: "friend accept failed",
      });
    }
  }

  //updating friend data with new request
  friend.requests.push({ Id: uid, name: name });
  const updatedFriend = await friend.save();

  console.log("UPDATED FRIEND REQUESTS: ", updatedFriend);

  if (updatedFriend) {
    pusherServer.trigger(
      `friend-request-channel-${email}`,
      "incomming-friend-request",
      updatedFriend
    );

    return NextResponse.json({ message: "success" });
  } else {
    return NextResponse.json({ message: "user not found" });
  }
}
