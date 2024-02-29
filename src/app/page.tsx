"use client";
import { redirect } from "next/navigation";
import { FC, useEffect } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  // const router = useRouter();
  useEffect(() => {
    console.log("im /");
    redirect("/login");
  }, []);

  return <div>/</div>;
};

export default page;
