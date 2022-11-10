import { useRouter } from "next/router";
import React, { useState } from "react";
import Bookmark from "./Bookmark";
import Home from "./Home";
import Maps from "./Maps";
import Search from "./Search";
import User from "./User";

export default function Navbar({ user }: any) {
  const router = useRouter();
  // const { data: session } = useSession();

  return (
    <div className="fixed z-20 md:hidden bg-white text-darkGray text-opacity-70 bottom-0 w-screen flex justify-around text-sm py-2 min-w-fit">
      <Home route={router.asPath} />
      {user && <Bookmark route={router.asPath} />}
      <Search />
      <Maps />
      <User user={user} route={router.asPath} />
    </div>
  );
}
