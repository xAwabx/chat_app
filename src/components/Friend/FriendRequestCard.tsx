"use client";
import { FC, useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useAuth } from "@/context/AuthContext";
import { acceptFriendRequest } from "@/lib/utils/acceptfriendaccept";
import { rejectFriendRequest } from "@/lib/utils/rejectfriend";

interface FriendRequestCardProps {
  friendName: string;
  friendUid: string;
  req_id: string;
}

const FriendRequestCard: FC<FriendRequestCardProps> = ({
  friendName,
  friendUid,
  req_id,
}) => {
  const { user, setUser } = useAuth();
  const [disabled, setDisabled] = useState(false);

  const onAccept = async () => {
    try {
      setDisabled(true);
      const data = await acceptFriendRequest(
        user.uid,
        friendName,
        friendUid,
        user.name
      );
      console.log("ACCEPTED DATA: ", data);
      setDisabled(false);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onReject = async () => {
    setDisabled(true);
    try {
      const data = await rejectFriendRequest(user.uid, friendUid);
      setDisabled(false);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row gap-2 items-center px-4 justify-between h-[7vh] rounded-md bg-gray-200 shadow-md cursor-pointer">
      <h1 className="text-xl font-bold">{friendName}</h1>
      <div className="flex gap-4">
        <Button
          onClick={onAccept}
          disabled={disabled}
          placeholder={null}
          className="bg-green-600"
        >
          Accept
        </Button>
        <Button
          onClick={onReject}
          disabled={disabled}
          placeholder={null}
          className="bg-red-600"
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
