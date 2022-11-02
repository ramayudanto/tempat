import { useRouter } from "next/router";
import React, { useState } from "react";
import Bookmark from "./Bookmark";
import Home from "./Home";
import Maps from "./Maps";
import Search from "./Search";
import User from "./User";
import { useSession } from "next-auth/react";
import LoginPage from "../login/LoginPage";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="fixed z-20 md:hidden bg-white text-darkGray text-opacity-70 bottom-0 w-screen flex justify-around text-sm py-2 min-w-fit">
      <Home route={router.asPath} />
      {session && <Bookmark />}
      <Search />
      <Maps />
      <User
        openLogin={() => {
          setIsLoginOpen(true);
        }}
        session={session}
      />
      {isLoginOpen && (
        <LoginPage
          closeLogin={() => {
            setIsLoginOpen(false);
          }}
        />
      )}
    </div>
  );
}
