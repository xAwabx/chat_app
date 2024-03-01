import dbConnect from "@/lib/mongodb";
import { pusherServer } from "@/lib/pusher";
import Chat from "@/models/Chats";
import { NextResponse } from "next/server";

// send message - chatId  name  text uid
export async function POST(req: any) {
  const { chatId, name, text, uid, time } = await req.json();

  // const time = new Date().toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: true,
  // });

  pusherServer.trigger(`chat-channel-${chatId}`, "incomming-message", {
    id: uid,
    name: name,
    text: text,
    time: time,
  });

  await dbConnect();
  const doc = await Chat.findOneAndUpdate(
    { _id: chatId },
    { $push: { messages: [{ name: name, text: text, time: time, id: uid }] } },
    { new: true }
  );
  const messages: [] = doc.messages;
  console.log(messages[messages.length - 1]);

  return NextResponse.json(messages[messages.length - 1]);
}
