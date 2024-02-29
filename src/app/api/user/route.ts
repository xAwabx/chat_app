import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

//Get user - firebase uid
export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get("uid");

  await dbConnect();
  const user: object | null = await User.findOne({ uid: uid });

  return NextResponse.json({ message: "ok", data: user });
}

//Create user - uid  name  pfp email
export async function POST(req: NextRequest) {
  const { uid, name, pfp, email } = await req.json();
  console.log(email);
  await dbConnect();
  const createdUser = await User.create({
    uid: uid,
    name: name,
    pfp: pfp,
    email: email,
  });
  console.log("Created USer: ", createdUser);
  return NextResponse.json({ message: "ok", data: createdUser });
}
