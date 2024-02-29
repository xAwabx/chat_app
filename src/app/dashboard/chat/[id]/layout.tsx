import Link from "next/link";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return <div className="h-full w-full">{children}</div>;
};

export default layout;
