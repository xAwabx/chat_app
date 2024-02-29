import { NextApiRequest } from "next";

declare global {
  interface userApiRequest extends NextApiRequest {
    uid: string;
    name: string;
    pfp: string;
  }
}
