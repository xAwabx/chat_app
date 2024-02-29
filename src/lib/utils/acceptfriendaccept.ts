import axios from "axios";

export const acceptFriendRequest = async (
  currentUserId: string,
  friendName: string,
  friendUid: string,
  currentUserName: string
) => {
  try {
    const res = (await axios.post(
      "https://chat-itup.netlify.app/api/friend/accept",
      {
        userUid: currentUserId,
        userName: currentUserName,
        friendName: friendName,
        friendUid: friendUid,
      }
    )) as any;
    return res.data.data as UserDB;
  } catch (error) {
    console.log("ERROR WHILE SENDING FRIEND REQUEST ", error);
  }
};
