"use client";
import { useAuth } from "@/context/AuthContext";
import sendMessageCall from "@/lib/utils/sendmessagecall";
import { Textarea, Button } from "@material-tailwind/react";
import EmojiPicker from "emoji-picker-react";
import { FC, useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";

interface InputBarProps {
  setMessages: any;
  chatId: string;
}

const InputBar: FC<InputBarProps> = ({ setMessages, chatId }) => {
  const [disabled, setDisabled] = useState(false);
  const [text, setText] = useState("");
  const { user } = useAuth();
  const name = user.name;

  const inputRef = useRef<any>();

  const submitHandler = async () => {
    setDisabled(true);
    const new_message = {
      id: user.uid,
      name: name,
      text: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    setMessages((prev: any) => [new_message, ...prev]);
    setText("");
    const res = await sendMessageCall(name, text, chatId, user.uid);
    setDisabled(false);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitHandler();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setText((prev) => prev + "\n");
    }
  };

  return (
    <div>
      <div id="input-area" className="flex items-center justify-center ">
        <div className="flex flex-row justify-between mt-10 items-center p-2 px-4 gap-2 bg-gray-100 shadow-lg shad rounded-3xl w-[90%] min-h-[8vh]">
          <input
            placeholder="Aa"
            ref={inputRef}
            onKeyDown={handleKeyPress}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="outline-none text-justify w-full min-h-[2vh] max-h-[10vh] rounded-full h-[4vh] border-gray-400 border-[1px] text-xl px-4"
          />
          <Button
            disabled={disabled}
            placeholder={""}
            onClick={submitHandler}
            className="bg-white rounded-full border-gray-400 border-[1px]  focus:outline-[1px]"
            size="sm"
          >
            <IoSend color="black" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputBar;
