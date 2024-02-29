import dbConnect from "@/lib/mongodb";
import { pusherServer } from "@/lib/pusher";
import Chat from "@/models/Chats";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

//Accepting a friend request - friendUid  friendName  userUid   userName - returns updated user with a new friend and removed request

export async function POST(req: any) {
  await dbConnect();
  const { userUid, friendName, friendUid, userName } = await req.json();

  //creating a new chat document
  const doc = (await Chat.create({
    members: [userName, friendName],
  })) as ChatDB;
  console.log(doc._id);

  //updating friend data with our id and adding the new chatId
  const updatedFriend = await User.findOneAndUpdate(
    { uid: friendUid },
    { $push: { friends: { friendId: userUid, chatId: doc._id } } },
    { new: true }
  );

  //updating our data with friend id and adding the new chatId
  const updatedMe = await User.findOneAndUpdate(
    { uid: userUid },
    {
      $push: { friends: { friendId: friendUid, chatId: doc._id } },
      $pull: { requests: { Id: friendUid } },
    },
    { new: true }
  );
  console.log("UPDATED FRIEND: ", updatedFriend, "UPDATED ME: ", updatedMe);

  if (updatedFriend) {
    pusherServer.trigger(
      `friend-accept-channel-${friendUid}`,
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
      data: null,
    });
  }
}
