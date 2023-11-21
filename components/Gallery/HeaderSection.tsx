import { useRouter } from "next/router";
import React from "react";

export default function HeaderSection({ restaurant }: any) {
  const router = useRouter();
  return (
    <div className="flex gap-x-4 pt-4 items-center mx-4">
      <button
        className="flex w-9 h-9 justify-center items-center gap-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-2 rounded-[1000px]"
        onClick={() => {
          router.back();
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="text-center text-darkGray -space-y-1">
        <p className="text-lg font-semibold">Gallery</p>
      </div>
    </div>
  );
}
