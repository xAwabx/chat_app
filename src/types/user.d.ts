type UserDB = {
  _id: string;
  uid: string;
  pfp: string;
  name: string;
  email: string;
  requests: {
    _id?: string;
    Id: string;
    name: string;
  }[];
  friends: {
    friendId: string;
    chatId: string;
  }[];
};
