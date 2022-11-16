import Image from "next/image";
import React from "react";

export default function SearchBar({ searchRef, handler }: any) {
  return (
    <form className="border-[1px] flex justify-between items-center overflow-hidden my-4 rounded-2xl px-2 py-1" onSubmit={handler}>
      <input ref={searchRef} placeholder="Restaurant name, cuisine, or a dish..." type="text" name="" className="w-[90%] outline-none p-1 text-sm" spellCheck={false} />
      <button className="pr-2" type="submit">
        <Image src={"/searchIcon.svg"} width={15} height={15} alt="search" />
      </button>
    </form>
  );
}
