"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { fetchFriendData } from "@/lib/utils/fetchingdata";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Avatar } from "@material-tailwind/react";

interface OpenChatButtonProps {
  id: string;
  chatId: string;
  edit: boolean;
}

const OpenChatButton: FC<OpenChatButtonProps> = ({ id, chatId, edit }) => {
  const [friendData, setFriendData] = useState<UserDB | null>(null);
  const [open, setOpen] = useState(false);
  const { user, setUser } = useAuth();
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const handleRemoveFriend = async () => {
    setDisabled(true);
    try {
      const res: any = await axios.post(
        `https://chat-app-psi-murex-45.vercel.app/api/friend/remove`,
        {
          userUid: user.uid,
          friendUid: id,
          chatId: chatId,
        }
      );

      if (res.data.message === "success") {
        console.log("USER WAS SET AS SUCCESS ==============");
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setDisabled(false);
    handleOpen();
    router.push("/dashboard");
  };

  const handleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    const func = async () => {
      const x = await fetchFriendData(id);
      setFriendData(x);
    };
    func();
  }, [id]);

  return (
    <div className="flex flex-row px-4 items-center pr-0 h-[7vh] rounded-md bg-gray-200 shadow-md">
      <Link
        href={`/dashboard/chat/${chatId}`}
        className={`flex flex-row w-full justify-between items-center  
      "
    }`}
      >
        <div
          className={`flex flex-row gap-2 items-center ${edit && "opacity-30"}`}
        >
          <Avatar
            placeholder={undefined}
            src={friendData?.pfp}
            alt="avatar"
            // className="rounded-full h-[5vh]"
          />
          <h1 className="font-bold text-xl">{friendData?.name}</h1>
        </div>
      </Link>
      {/* kebab menu */}
      <Menu>
        <MenuHandler>
          <div className="p-4  hover:scale-105 hover:cursor-pointer ease-in-out duration-200">
            <CiMenuKebab size={25} />
          </div>
        </MenuHandler>
        <MenuList placeholder={undefined}>
          <MenuItem
            onClick={handleOpen}
            placeholder={undefined}
            className="flex flex-row gap-2 text-black items-center"
          >
            <IoPersonRemoveSharp /> remove friend
          </MenuItem>
        </MenuList>
      </Menu>
      <Dialog open={open} handler={handleOpen} placeholder={undefined}>
        <DialogHeader placeholder={undefined}>Are you sure?</DialogHeader>
        <DialogBody placeholder={undefined}>
          All messages and chats will be permanently deleted and this action is
          irreversible
        </DialogBody>
        <DialogFooter placeholder={undefined}>
          <Button
            disabled={disabled}
            variant="text"
            color="black"
            onClick={handleOpen}
            className="mr-1"
            placeholder={undefined}
          >
            <span>No</span>
          </Button>
          <Button
            loading={disabled}
            disabled={disabled}
            variant="gradient"
            color="red"
            onClick={handleRemoveFriend}
            placeholder={undefined}
          >
            <span>Yes</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default OpenChatButton;
