import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AccountSection({ user }: any) {
  const router = useRouter();
  return (
    <div className="px-4 pt-10 space-y-16 bg-white max-w-[420px] h-screen mx-auto bg-white max-w-[420px]">
      <div className="flex gap-x-4">
        <p className="text-3xl font-semibold text-darkGray">Akun</p>
        <button
          onClick={() => {
            router.push("/account/edit", undefined, { shallow: true });
          }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 18.5H19M14.5 1.99998C14.8978 1.60216 15.4374 1.37866 16 1.37866C16.2786 1.37866 16.5544 1.43353 16.8118 1.54014C17.0692 1.64674 17.303 1.803 17.5 1.99998C17.697 2.19697 17.8532 2.43082 17.9598 2.68819C18.0665 2.94556 18.1213 3.22141 18.1213 3.49998C18.1213 3.77856 18.0665 4.05441 17.9598 4.31178C17.8532 4.56915 17.697 4.803 17.5 4.99998L5 17.5L1 18.5L2 14.5L14.5 1.99998Z"
              stroke="#101828"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center w-full gap-y-5">
        {/* <Image src={user?.image!} width="150" height={"150"} alt="logo putih" objectFit="cover" className="rounded-full self-center" /> */}
        <div className="self-start w-full">
          <p className="font-medium text-darkGray text-opacity-70">Username</p>
          <input className="outline-none border-b-2 bg-white w-full" disabled type="text" placeholder={user.username || "not set"} />
        </div>
        <div className="self-start w-full">
          <p className="font-medium text-darkGray text-opacity-70">Nama</p>
          <input className="outline-none border-b-2 bg-white w-full" disabled type="text" placeholder={user.name || "not set"} />
        </div>
        <div className="self-start w-full">
          <p className="font-medium text-darkGray text-opacity-70">Email</p>
          <input className="border-b-2 outline-none bg-white w-full" disabled type="text" placeholder={user.email} />
        </div>
        <button
          className="w-full py-3 rounded-full bg-darkRed text-white font-medium"
          onClick={() => {
            signOut();
          }}
        >
          Keluar
        </button>
      </div>
    </div>
  );
}
