"use client";
import { pusherCLient } from "@/lib/pusher";
import { FC, useEffect, useRef, useState } from "react";
import Message from "./Message";
import InputBar from "./InputBar";

interface ChatPageProps {
  //   messages_data: any;
  data: ChatDB;
  chatId: string;
}

interface Message {
  _id: string;
  name: string;
  text: string;
  time: string;
}

const ChatPage: FC<ChatPageProps> = ({ data, chatId }) => {
  const [messages, setMessages] = useState<any>(null);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("DATA SET");
    setMessages(data.messages);

    return () => {};
  }, [data]);

  useEffect(() => {
    console.log(messages && messages[messages.length - 1]);
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
  }, [chatId]);

  return (
    <div className="h-full flex flex-col justify-end ">
      <div className="flex flex-row justify-between w-full h-[9vh] border-b-gray-500 border-b-[1px]">
        <div className="flex flex-row gap-3">
          <p>chat with</p>
          <h1 className="text-3xl font-thin">{data.members[1]}</h1>
        </div>
      </div>
      <div
        id="chat-box"
        className="flex  gap-2 flex-col-reverse overflow-y-auto px-2 h-full"
      >
        {messages &&
          messages.map((message: Message, i: number) => {
            return (
              <div id={`message-${i}`}>
                <Message
                  key={i}
                  message={message}
                  i={i}
                  length={messages.length}
                  reference={ref}
                />
              </div>
            );
          })}
      </div>
      <InputBar setMessages={setMessages} chatId={chatId} />
    </div>
  );
};

export default ChatPage;
