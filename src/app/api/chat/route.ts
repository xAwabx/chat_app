import dbConnect from "@/lib/mongodb";
import Chat from "@/models/Chats";
import { NextResponse } from "next/server";

//get chat using chatId returns chat object
export async function GET(req: any) {
  const chatId = req.nextUrl.searchParams.get("chatId");
  await dbConnect();
  const doc = await Chat.findOne({ _id: chatId });
  // console.log(doc);

  return NextResponse.json(doc);
}
