"use client";
import { FC, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Tooltip } from "@material-tailwind/react";
import { LiaGratipay } from "react-icons/lia";
import { FaGoogle } from "react-icons/fa";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { login, user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <>
      <div className="h-[100vh] flex items-center justify-center">
        <div className="flex relative flex-col justify-center gap-4 items-center bg-gray-200 rounded-lg shadow-md h-[20vh] p-[5vw]">
          <div className="absolute top-2 right-2">
            <Tooltip
              content="Designed & Developed by Awab Saghir :)"
              placement="right"
            >
              <h1 className="flex flex-row items-center">
                <LiaGratipay size={20} />
              </h1>
            </Tooltip>
          </div>
          <h1 className="text-2xl font-bold "> Sign In</h1>
          <div
            className="flex flex-row items-center justify-center relative shadow-lg bg-gray-400 w-[10vw] p-4 rounded-xl text-center hover:cursor-pointer"
            onClick={async () => {
              login();
            }}
          >
            <FaGoogle className="absolute left-4" />
            <h1>Google</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
