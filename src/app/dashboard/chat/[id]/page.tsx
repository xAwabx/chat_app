"use client";
import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import InputBar from "@/components/Chat/InputBar";
import Message from "@/components/Chat/Message";
import { pusherCLient } from "@/lib/pusher";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface pageProps {
  params: {
    id: string;
  };
}
interface Message {
  _id: string;
  name: string;
  text: string;
  time: string;
}

const page: FC<pageProps> = ({ params }: pageProps) => {
  const { id: chatId } = params;
  const { user } = useAuth();
  const [data, setData] = useState<ChatDB | null>(null);
  const [messages, setMessages] = useState<any>(null);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `https://chat-itup.netlify.app/api/chat?chatId=${chatId}`
        );
        console.log(res.data.messages);
        setData(res.data);
        setMessages(res.data.messages.reverse());
      } catch (error) {}
    };
    fetch();
  }, [chatId]);

  useEffect(() => {
    pusherCLient.subscribe(`chat-channel-${chatId}`);

    function messageHandler(message: any) {
      console.log(message);
      setMessages((prev: any) => [message, ...prev]);
    }

    pusherCLient.bind("incomming-message", messageHandler);

    return () => {
      pusherCLient.unsubscribe(`chat-channel-${chatId}`);
      pusherCLient.unbind("incomming-message", messageHandler);
    };
  }, []);

  // useEffect(() => {
  //   messages && messages.reverse();
  // }, []);

  return (
    <div className="h-full flex flex-col justify-end ">
      <div className="flex flex-row justify-between w-full h-[6vh] border-b-gray-500 border-b-[1px]">
        <div className="flex flex-row gap-3">
          <p>chat with</p>
          <h1 className="text-3xl font-extralight">
            {data?.members[0] != user.name
              ? data?.members[0]
              : data?.members[1]}
          </h1>
        </div>
      </div>
      <div
        id="chat-box"
        className="flex  gap-2 flex-col-reverse overflow-y-auto px-2 pt-2 h-full"
      >
        {messages ? (
          messages.length != 0 ? (
            messages.map((message: Message, i: number) => {
              return (
                <Message
                  key={i}
                  message={message}
                  i={i}
                  length={messages.length}
                  reference={ref}
                />
              );
            })
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-bold">
                This is the start of your chat
              </h1>
              <p>send a message to begin</p>
            </div>
          )
        ) : (
          <></>
        )}
      </div>
      <InputBar setMessages={setMessages} chatId={chatId} />
    </div>
  );
};

export default page;

// export async function getServerSideProps(context: any) {
//   console.log(context.params);
//   let chatData;
//   try {

//   } catch (error) {}

//   return { props: { chatData } };
// }
