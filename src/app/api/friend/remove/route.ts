import dbConnect from "@/lib/mongodb";
import { pusherServer } from "@/lib/pusher";
import Chat from "@/models/Chats";
import User from "@/models/User";
import { NextResponse } from "next/server";

// Removing a friend - friendUid userUid chatId
export async function POST(req: any) {
  await dbConnect();
  const { friendUid, userUid, chatId } = await req.json();
  console.log(friendUid, userUid);

  //removing user from friend data
  const updatedFriend = await User.findOneAndUpdate(
    { uid: friendUid },
    { $pull: { friends: { friendId: userUid } } },
    { new: true }
  );

  //removing friend from user data
  const updatedUser = await User.findOneAndUpdate(
    { uid: userUid },
    { $pull: { friends: { friendId: friendUid } } },
    { new: true }
  );

  const doc = await Chat.findOneAndDelete({ _id: chatId });
  console.log("DELETED CHAT: ", doc);

  if (updatedFriend === null || updatedUser === null) {
    return NextResponse.json({ message: "failed" });
  } else {
    pusherServer.trigger(
      `friend-remove-channel-${friendUid}`,
      "removed-friend-incoming-data",
      updatedFriend
    );
    return NextResponse.json({ message: "success", data: updatedUser });
  }
}
