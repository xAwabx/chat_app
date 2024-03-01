import axios from "axios";

export default async function sendMessageCall(
  name: string,
  text: string,
  chatId: string,
  uid: string
) {
  try {
    const res = await axios.post(
      "https://chat-app-psi-murex-45.vercel.app/api/chat/message/send",
      {
        chatId: chatId,
        name: name,
        text: text,
        uid: uid,
      }
    );
    return res.data;
  } catch (error) {
    console.log("ERROR SENDING MESSAGE", error);
  }
}
