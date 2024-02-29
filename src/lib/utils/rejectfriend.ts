import axios from "axios";

export const rejectFriendRequest = async (
  userUid: string,
  friendUid: string
) => {
  try {
    const res = (await axios.post("http://localhost:3000/api/friend/reject", {
      userUid: userUid,
      friendUid: friendUid,
    })) as any;
    return res.data.data as UserDB;
  } catch (error) {
    console.log("ERROR WHILE SENDING FRIEND REQUEST ", error);
  }
};
