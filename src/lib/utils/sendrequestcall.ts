import axios from "axios";

export const sendRequestCall = async (
  currentUserId: string,
  friendEmail: string,
  currentUserName: string
) => {
  try {
    const res = (await axios.post("http://localhost:3000/api/friend/request", {
      uid: currentUserId,
      name: currentUserName,
      email: friendEmail,
    })) as any;
    return res.data;
  } catch (error) {
    console.log("ERROR WHILE SENDING FRIEND REQUEST ", error);
  }
};