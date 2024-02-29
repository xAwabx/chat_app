import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

// Rejecting a friend request - friendUid userUid - returns Updated user without the request

export async function POST(req: any) {
  await dbConnect();
  const { userUid, friendUid } = await req.json();

  const updatedMe = await User.findOneAndUpdate(
    { uid: userUid },
    {
      $pull: { requests: { Id: friendUid } },
    },
    { new: true }
  );

  return NextResponse.json({
    message: "rejected successfully",
    data: updatedMe,
  });
}
