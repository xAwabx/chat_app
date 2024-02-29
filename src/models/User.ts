import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  uid: string;
  pfp: string;
  name: string;
  email: string;
  requests: { Id: string; name: string }[];
  friends: {
    friendId: string;
    chatId: string;
  }[];
}

const UserSchema = new mongoose.Schema<Users>({
  uid: { required: true, type: String },
  pfp: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  requests: [
    {
      Id: { type: String },
      name: { type: String },
    },
  ],
  friends: [
    {
      friendId: { type: String },
      chatId: { type: String },
    },
  ],
});

const User = mongoose.models.User || mongoose.model<Users>("User", UserSchema);
export default User;
