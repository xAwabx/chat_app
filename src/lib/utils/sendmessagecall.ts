import axios from "axios";

export default async function sendMessageCall(
  name: string,
  text: string,
  chatId: string
) {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/chat/message/send",
      {
        chatId: chatId,
        name: name,
        text: text,
      }
    );
    return res.data;
  } catch (error) {
    console.log("ERROR SENDING MESSAGE", error);
  }
}
