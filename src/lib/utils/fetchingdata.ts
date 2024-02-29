import axios from "axios";

export const fetchFriendData = async (id: string) => {
  try {
    console.log("IM RUNNN");
    const getres: any = await axios.get(
      `https://chat-itup.netlify.app/api/user?uid=${id}`
    );
    console.log(getres.data.data);
    return getres.data.data;
  } catch (error) {
    console.log("ERROR FETCHING DATA", error);
  }
};
