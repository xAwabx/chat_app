"use client";
import React, { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import axios from "axios";

type UseAuthType = {
  user: UserDB;
  setUser: any;
  login: Function;
  logout: Function;
};

const AuthContext = createContext<any>({});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserDB | null>(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user_cb) => {
      !user_cb && router.push("/login");
      if (user_cb) {
        const getres: any = await axios.get(
          `http://localhost:3000/api/user?uid=${user_cb.uid}`
        );
        console.log("GET DATA", getres.data.data);
        if (getres.data.data === null) {
          try {
            const res = await axios.post("http://localhost:3000/api/user", {
              uid: user_cb.uid,
              name: user_cb.displayName,
              pfp: user_cb.photoURL,
              email: user_cb.email,
            });
            console.log("POST RES: ", res.data.data);
            setUser(res.data.data);
          } catch (error) {
            console.log("ERROR WHILE POSTING USER TO DB: ", error);
          }
        } else {
          console.log("im in the else statement");
          setUser(getres.data.data);
        }
      }
    });
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error) {
      console.log("error while logging in: ", error);
    }
  };

  const logout = async () => {
    console.log("logging out...");
    setUser(null);
    await signOut(auth);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as UseAuthType;
