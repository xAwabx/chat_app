"use client";
import { useAuth } from "@/context/AuthContext";
import { FC, useEffect, useState } from "react";

interface MessageProps {
  message: {
    name: string;
    text: string;
    time: string;
    id: string;
  };
  length: number;
  i: number;
  reference: any;
}

const Message: FC<MessageProps> = ({ message, length, i }) => {
  const [mine, setMine] = useState(false);
  const { user } = useAuth();
  const { name, text, time, id } = message;

  useEffect(() => {
    console.log(user.name);
    if (user.uid == id) {
      setMine(true);
    } else {
      setMine(false);
    }
    if (i === length - 1) {
      ("im in");
      const element = document.getElementById("chat-box");
      element!.scrollTo({
        top: element!.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [message]);

  return (
    <div className={`flex flex-col ${mine && "items-end "}`}>
      <div
        className={`flex flex-col  bg-gray-200 shadow-sm  p-4  max-w-[30vw] gap-3 w-fit ${
          mine ? " rounded-2xl rounded-br-none " : "rounded-2xl rounded-bl-none"
        } `}
      >
        <div className="flex flex-col">
          {!mine && <h1 className="text-xl font-bold ">{name}</h1>}

          <p className="font-semibold">{text}</p>
        </div>
        <p className="text-sm">{time}</p>
      </div>
    </div>
  );
};

export default Message;
