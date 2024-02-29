import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "./firebase";
import { useRouter } from "next/navigation";

export const handleLogin = async () => {
  const router = useRouter();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    router.push("/dashboard");
    return user;
  } catch (error) {
    console.log("error while logging in: ", error);
  }
};
