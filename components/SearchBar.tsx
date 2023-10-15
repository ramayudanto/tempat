import Image from "next/image";
import React from "react";

export default function SearchBar({ searchRef, q, handler }: any) {
  return (
    <form className="border-[1px] flex justify-between items-center overflow-hidden rounded-2xl px-2 py-1 w-full" onSubmit={handler}>
      <input ref={searchRef} placeholder={q || "Bakmie? Ayam? Kopi? Ada Semua!"} type="text" className="w-[90%] outline-none p-1 text-sm placeholder:text-[#7a7a7a]" spellCheck={false} />
      <button className="pr-2" type="submit">
        <Image src={"/searchIcon.svg"} width={15} height={15} alt="search" />
      </button>
    </form>
  );
}
