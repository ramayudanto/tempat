import { useRouter } from "next/router";
import React, { useState } from "react";
import Bookmark from "./Bookmark";
import Home from "./Home";
import Maps from "./Maps";
import Search from "./Search";
import User from "./User";
import { useSession } from "next-auth/react";

export default function Navbar({ user }: any) {
  const router = useRouter();
  // const { data: session } = useSession();

  return (
    <div className="fixed max-w-[420px] mx-auto left-0 right-0 z-20 bg-white text-darkGray text-opacity-70 bottom-0 w-screen flex justify-around text-sm py-2 min-w-fit">
      <Home route={router.asPath} />
      <Bookmark route={router.asPath} />
      <Search route={router.pathname} />
      {/* <Maps /> */}
      <User user={user} route={router.asPath} />
    </div>
  );
}
