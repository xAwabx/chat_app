"use client";
import { useAuth } from "@/context/AuthContext";
import { FC, useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { sendRequestCall } from "@/lib/utils/sendrequestcall";
import { useForm } from "react-hook-form";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("something went wrong");
  const { user, setUser } = useAuth();

  const onSubmit = async () => {
    if (email != "") {
      if (email != user.email) {
        const res = await sendRequestCall(user.uid, email, user.name);
        console.log(res);
        if (
          (res && res.message === "success") ||
          res.message === "friend added successfully"
        ) {
          setEmail("");
          setDisabled(false);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 5000);
          res.data && setUser(res.data);
        } else {
          setDisabled(false);
          setErrMessage(res.message);
          setError(true);
          setTimeout(() => setError(false), 5000);
        }
      } else {
        setDisabled(false);
        setErrMessage(
          "why are you trying to add yourself, are you that lonely?"
        );
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
    } else {
      setDisabled(false);
      setErrMessage("email is required");
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="h-[100vh] flex flex-col gap-3 items-center p-20">
      <h1 className="font-bold text-center text-3xl">Add Friend Using Email</h1>
      <Input
        error={error}
        success={success}
        crossOrigin={"hi"}
        size="lg"
        type="email"
        label="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <Button
        disabled={disabled}
        className="w-full"
        placeholder={"hi"}
        onClick={async () => {
          setDisabled(true);
          await onSubmit();
        }}
      >
        Add
      </Button>
      {success && (
        <p className="text-green-500 text-lg text-center">
          friend request sent successfully
        </p>
      )}
      {error && (
        <p className="text-red-500 text-lg text-center">{errMessage}</p>
      )}
    </div>
  );
};

export default page;
