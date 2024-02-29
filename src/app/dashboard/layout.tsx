"use client";
import OpenChatButton from "@/components/Chat/OpenChatButton";
import AddFriendButton from "@/components/Friend/AddFriendButton";
import FriendRequestsButton from "@/components/Friend/FriendRequestsButton";
import NavBar from "@/components/NavBar";
import { Protected } from "@/components/Protected";
import { useAuth } from "@/context/AuthContext";
import { pusherCLient } from "@/lib/pusher";
import { FiEdit } from "react-icons/fi";
import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from "@material-tailwind/react";
import { LiaGratipay } from "react-icons/lia";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  const [edit, setEdit] = useState(false);
  const { user, setUser } = useAuth();
  const router = useRouter();
  console.log("----------------------------", user && user.friends);

  //realtime for accepted friend request
  useEffect(() => {
    function acceptHandler(data: any) {
      // alert("friend request accepted");
      setUser(data);
    }
    pusherCLient.subscribe(`friend-accept-channel-${user && user.uid}`);

    pusherCLient.bind("accepted-friend-incoming", acceptHandler);

    return () => {
      pusherCLient.unsubscribe(`friend-accept-channel-${user && user.uid}`);
      pusherCLient.unbind("accepted-friend-incoming", acceptHandler);
    };
  }, [user]);

  //realtime for friend requests
  useEffect(() => {
    pusherCLient.subscribe(`friend-request-channel-${user && user.email}`);

    function requestHandler(data: any) {
      // alert("new freq");
      setUser(data);
    }

    pusherCLient.bind("incomming-friend-request", requestHandler);

    return () => {
      pusherCLient.unsubscribe(`friend-request-channel-${user && user.email}`);
      pusherCLient.unbind("incomming-friend-request", requestHandler);
    };
  }, [user]);

  //realtime for remove friend
  useEffect(() => {
    pusherCLient.subscribe(`friend-remove-channel-${user && user.uid}`);

    function requestHandler(data: any) {
      // alert("its working");
      setUser(data);
      router.push("/dashboard");
    }

    pusherCLient.bind("removed-friend-incoming-data", requestHandler);

    return () => {
      pusherCLient.unsubscribe(`friend-remove-channel-${user && user.uid}`);
      pusherCLient.unbind("removed-friend-incoming-data", requestHandler);
    };
  }, [user]);

  return (
    <Protected>
      <div className="flex flex-row">
        <div className="bg-white w-[30vw] px-4 h-[100vh] border-r-gray-500 border-r-[1px]">
          <NavBar />
          <div className="flex flex-row  items-center justify-center  border-b-gray-500 border-b-[1px] py-4 mb-3">
            <h1 className="text-gray-600 text-xl">chats</h1>
            <div
              className={`absolute bottom-5 left-5 hover:cursor-pointer ${
                edit && "text-red-800 "
              }`}
            >
              <Tooltip
                content="Designed & Developed by Awab Saghir :)"
                placement="right"
              >
                <h1 className="flex flex-row items-center">
                  <LiaGratipay size={20} />
                </h1>
              </Tooltip>
            </div>
          </div>
          <ul className="flex flex-col gap-2 py-4 px-2 overflow-y-scroll  h-[40vh]">
            {user &&
              user.friends.map((friendData, i) => (
                <OpenChatButton
                  edit={edit}
                  id={friendData.friendId}
                  chatId={friendData.chatId}
                  key={i}
                />
              ))}
          </ul>
          <h1 className="text-gray-600 text-xl text-center py-4 border-b-gray-500 border-b-[1px] mb-3 ">
            overview
          </h1>
          <ul className="flex flex-col gap-2">
            <AddFriendButton />
            <FriendRequestsButton noti={user && user.requests.length} />
          </ul>
        </div>
        <div className="p-8 h-[100vh] w-[100%]">
          {/* <div className="bg-pink-100">
            <Link href={"/dashboard/"}>back</Link>
          </div> */}
          {children}
        </div>
      </div>
    </Protected>
  );
};

export default layout;
