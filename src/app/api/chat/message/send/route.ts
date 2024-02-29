import dbConnect from "@/lib/mongodb";
import { pusherServer } from "@/lib/pusher";
import Chat from "@/models/Chats";
import { NextResponse } from "next/server";

// send message - chatId  name  text
export async function POST(req: any) {
  const { chatId, name, text } = await req.json();

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  pusherServer.trigger(`chat-channel-${chatId}`, "incomming-message", {
    name: name,
    text: text,
    time: time,
  });

  await dbConnect();
  const doc = await Chat.findOneAndUpdate(
    { _id: chatId },
    { $push: { messages: [{ name: name, text: text, time: time }] } },
    { new: true }
  );
  const messages: [] = doc.messages;
  console.log(messages[messages.length - 1]);

  return NextResponse.json(messages[messages.length - 1]);
}
