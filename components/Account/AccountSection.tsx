import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { useState } from "react";

export default function AccountSection({ user }: any) {
  function getFirstLetters(inputString: string) {
    const words = inputString.split(" ");
    let result: string = "";

    for (const word of words) {
      if (word.length > 0) {
        result += word[0];
      }
    }

    return result;
  }
  const router = useRouter();
  return (
    <div className="mx-auto h-screen bg-white max-w-[420px]">
      <div
        className="h-[200px] relative"
        style={{
          backgroundImage: `url("https://tempatapp.sgp1.cdn.digitaloceanspaces.com/asset/05_restaurant_%201%20(1).png")`,
          backgroundSize: "cover",
        }}
      >
        <div className="py-5 px-4 shadow-md absolute bg-white right-0 left-0 mx-auto -bottom-[60%] rounded-lg space-y-8 w-[90%]">
          <div className="flex gap-x-3 text-[#5D6B98]">
            <p className="w-10 h-10 f rounded-full font-semibold bg-[#EFF1F5] uppercase flex items-center justify-center">{getFirstLetters(user.name)}</p>
            <div>
              <p className="font-semibold text-[#404968]">{user.name}</p>
              {/* review user */}
              <p>Kamu belum punya review :(</p>
            </div>
          </div>
          <button
            onClick={() => {
              router.push("/account/edit", undefined, { shallow: true });
            }}
            className="text-red-600 font-semibold bg-red-50 rounded-lg w-full py-2"
          >
            Edit Akun
          </button>
        </div>
      </div>
      <div className="mt-36 border-y-8 border-[#F2F4F7] py-6 text-[#404968] px-4 space-y-4">
        <p className="font-semibold ml-1">Aktivitas</p>
        <div className="rounded-xl border-[1px] border-[#EFF1F]">
          <div
            className="p-4 flex gap-x-4"
            onClick={() => {
              router.push("/bookmark", undefined, { shallow: true });
            }}
          >
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 p-2 bg-red-50 rounded-full">
              <path
                d="M3.33337 5.2C3.33337 4.0799 3.33337 3.51984 3.55136 3.09202C3.74311 2.71569 4.04907 2.40973 4.42539 2.21799C4.85322 2 5.41327 2 6.53337 2H9.46671C10.5868 2 11.1469 2 11.5747 2.21799C11.951 2.40973 12.257 2.71569 12.4487 3.09202C12.6667 3.51984 12.6667 4.0799 12.6667 5.2V14L8.00004 11.3333L3.33337 14V5.2Z"
                fill="#A32323"
              />
            </svg>
            <div>
              <p className="font-semibold text-sm">Koleksi tempatmu</p>
              <p className="text-[#667085] text-xs">Cek lagi restoran yang pernah kamu simpan</p>
            </div>
          </div>
          <hr />
          <div className="p-4 flex gap-x-4">
            <svg className="w-9 h-9 p-2 bg-[#EAFBF0] rounded-full" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.52181 2.30217C7.67547 1.99088 7.75229 1.83523 7.85659 1.7855C7.94734 1.74224 8.05277 1.74224 8.14351 1.7855C8.24781 1.83523 8.32464 1.99088 8.4783 2.30217L9.93608 5.25548C9.98144 5.34738 10.0041 5.39333 10.0373 5.42901C10.0666 5.4606 10.1018 5.48619 10.1409 5.50437C10.1851 5.52491 10.2358 5.53232 10.3372 5.54714L13.598 6.02376C13.9414 6.07395 14.1131 6.09905 14.1926 6.18292C14.2617 6.25589 14.2942 6.35616 14.281 6.45581C14.2659 6.57034 14.1416 6.69141 13.893 6.93355L11.5343 9.23091C11.4608 9.30252 11.424 9.33833 11.4003 9.38093C11.3793 9.41866 11.3658 9.4601 11.3607 9.50296C11.3548 9.55137 11.3635 9.60196 11.3808 9.70312L11.9373 12.948C11.996 13.2903 12.0254 13.4614 11.9702 13.563C11.9222 13.6513 11.8369 13.7133 11.7381 13.7316C11.6245 13.7527 11.4708 13.6719 11.1634 13.5102L8.24829 11.9772C8.15746 11.9294 8.11205 11.9055 8.0642 11.8961C8.02184 11.8878 7.97827 11.8878 7.9359 11.8961C7.88806 11.9055 7.84264 11.9294 7.75181 11.9772L4.83666 13.5102C4.52932 13.6719 4.37565 13.7527 4.26202 13.7316C4.16316 13.7133 4.07786 13.6513 4.02987 13.563C3.97471 13.4614 4.00406 13.2903 4.06276 12.948L4.6193 9.70312C4.63665 9.60196 4.64532 9.55137 4.63945 9.50296C4.63426 9.4601 4.62078 9.41866 4.59978 9.38093C4.57606 9.33833 4.53929 9.30252 4.46576 9.2309L2.10708 6.93355C1.85848 6.69141 1.73418 6.57034 1.71906 6.45581C1.7059 6.35616 1.73841 6.25589 1.80754 6.18292C1.887 6.09905 2.05869 6.07395 2.40207 6.02376L5.66291 5.54714C5.76432 5.53232 5.81503 5.52491 5.85919 5.50437C5.89828 5.48619 5.93348 5.4606 5.96283 5.42901C5.99598 5.39333 6.01866 5.34738 6.06402 5.25548L7.52181 2.30217Z"
                fill="#4FAB5E"
              />
            </svg>
            <div>
              <p className="font-semibold text-sm">Kumpulan Review-mu</p>
              <p className="text-[#667085] text-xs">Lihat tempat yang udah pernah kamu review</p>
            </div>
          </div>
        </div>
      </div>
      <p
        onClick={() => {
          signOut();
          posthog.capture("logout");
          posthog.reset();
        }}
        className="bg-red-600 mt-6 text-white font-semibold w-fit mx-auto rounded-lg px-16 py-2"
      >
        Keluar
      </p>
    </div>
  );
}
