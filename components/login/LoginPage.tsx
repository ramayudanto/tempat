import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import Backdrop from "./Backdrop";

export default function LoginPage({ closeLogin }: any) {
  const { data: session } = useSession();
  return (
    <Backdrop onClick={closeLogin}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="fixed z-[100] animate-loginFade bg-white h-[75vh] bottom-0 w-screen rounded-t-2xl pt-4 flex justify-center"
      >
        {session ? (
          <button className="rounded-full border-[1px] font-medium transition hover:bg-[#bbae86] dark:hover:bg-[#8a8a8a] w-[75%] h-[8%]" onClick={() => signOut()}>
            Logout
          </button>
        ) : (
          <button className="rounded-full border-[1px] font-medium transition hover:bg-[#bbae86] dark:hover:bg-[#8a8a8a] w-[75%] h-[8%]" onClick={() => signIn("google")}>
            Login with google
          </button>
        )}
      </div>
    </Backdrop>
  );
}
