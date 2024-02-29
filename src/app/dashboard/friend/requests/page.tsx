"use client";
import FriendRequestCard from "@/components/Friend/FriendRequestCard";
import { useAuth } from "@/context/AuthContext";
import { pusherCLient } from "@/lib/pusher";
import { FC, useEffect } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { user, setUser } = useAuth();
  console.log(user.requests.length);

  return (
    <div className="flex flex-col gap-4">
      {user.requests.length != 0 ? (
        user.requests.map((req) => (
          <FriendRequestCard friendName={req.name} friendUid={req.Id} />
        ))
      ) : (
        <>
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-black text-2xl ">
              You have no friend Requests{" :("}
            </h1>
            <p className="text-lg">
              try sending friend request using the Add Friend tab
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
