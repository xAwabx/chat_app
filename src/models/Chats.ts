import mongoose from "mongoose";

export interface Chats extends mongoose.Document {
  members: string[];
  messages: [
    {
      id: string;
      name: string;
      text: string;
    }
  ];
}

const ChatsSchema = new mongoose.Schema<Chats>({
  members: [{ type: String, required: true }],
  messages: [
    {
      id: String,
      name: String,
      text: String,
      time: {
        type: String,
        default: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      },
    },
  ],
});

const Chat = mongoose.models.Chat || mongoose.model<Chats>("Chat", ChatsSchema);

export default Chat;
