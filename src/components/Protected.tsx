"use client";
import React, { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";

export const Protected = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, []);

  return <div>{user ? children : "loading..."} </div>;
};
