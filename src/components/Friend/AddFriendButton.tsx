import Link from "next/link";
import { FC } from "react";
import { IoMdPersonAdd } from "react-icons/io";

interface AddFriendButtonProps {}

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  return (
    <Link href="/dashboard/friend/add">
      <div className="flex flex-row gap-2 items-center justify-center  h-[7vh] rounded-md bg-gray-200 shadow-md cursor-pointer">
        <IoMdPersonAdd size={25} />
        <h1 className="font-bold text-xl">Add Friend</h1>
      </div>
    </Link>
  );
};

export default AddFriendButton;
