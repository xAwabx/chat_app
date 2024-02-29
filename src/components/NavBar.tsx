"use client";
import { useAuth } from "@/context/AuthContext";
import { Avatar } from "@material-tailwind/react";
import { FC } from "react";
import { IoIosLogOut } from "react-icons/io";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = ({}) => {
  const { user, logout } = useAuth();
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-row justify-between mt-4 items-center p-2 px-4 bg-gray-100 shadow-lg shad rounded-3xl w-[80vw] min-h-[5vh]">
        {user && (
          <>
            <div className="flex-row flex items-center gap-3">
              <Avatar
                src={user.pfp}
                // className="rounded-full h-[4vh]"
                alt="avatar"
                placeholder={undefined}
              />
              <div>
                <h1 className="text-xl font-bold">{user.name}</h1>
                <p className="text-md ">{user.email}</p>
              </div>
            </div>
            <IoIosLogOut
              size={30}
              onClick={logout}
              className="cursor-pointer"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
