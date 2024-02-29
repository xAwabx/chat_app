import Link from "next/link";
import { FC } from "react";
import { WiTime10 } from "react-icons/wi";

interface FriendRequestsButtonProps {
  noti: number;
}

const FriendRequestsButton: FC<FriendRequestsButtonProps> = ({ noti }) => {
  return (
    <Link href="/dashboard/friend/requests">
      <div className="flex flex-row gap-2 items-center justify-center relative h-[7vh] rounded-md bg-gray-200 shadow-md cursor-pointer">
        <WiTime10 size={25} />

        <h1 className="font-bold text-xl">Friend Requests</h1>

        {noti != 0 && (
          <div className="flex items-center justify-center text-white w-6 h-6 rounded-full bg-red-700 absolute right-8">
            {noti}
          </div>
        )}
      </div>
    </Link>
  );
};

export default FriendRequestsButton;
