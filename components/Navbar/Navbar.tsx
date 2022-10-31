import { useRouter } from "next/router";
import React from "react";
import Bookmark from "./Bookmark";
import Home from "./Home";
import Maps from "./Maps";
import Search from "./Search";
import User from "./User";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="fixed z-20 px-3 md:hidden bg-white text-darkGray text-opacity-70 bottom-0 w-screen flex justify-around text-sm py-2">
      <Home route={router.asPath} />
      <Bookmark />
      <Search />
      <Maps />
      <User />
    </div>
  );
}
