import Image from "next/image";
import React, { FormEvent } from "react";

export default function SearchBar({ setSearchQuery, searchQuery }: any) {
  return (
    <form className="border-[1px] gap-x-1 flex items-center overflow-hidden rounded-lg px-2 py-1 w-full min-h-[38px]">
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
        <path
          d="M14 14L10.0001 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
          stroke="#667085"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <input
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder="Lagi mood apa nihh?? Croissant? Latte? ramen?"
        className="w-[90%] outline-none p-1 text-xs placeholder:text-[#7a7a7a]"
        spellCheck={false}
      />
    </form>
  );
}
