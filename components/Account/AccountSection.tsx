import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { useState } from "react";
import { captureEvent } from "../../lib/posthog";
import Divider from "../design-system/Divider";

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
    <div className="mx-auto min-h-screen pb-[100px] bg-white max-w-[420px]">
      <div
        className="h-[200px] relative"
        style={{
          backgroundImage: `url("https://tempatapp.sgp1.cdn.digitaloceanspaces.com/asset/05_restaurant_%201%20(1).png")`,
          backgroundSize: "cover",
        }}
      >
        <div className="py-5 px-4 shadow-md absolute bg-white right-0 left-0 mx-auto -bottom-[60%] rounded-lg space-y-4 w-[90%]">
          <div className="flex gap-x-3 text-[#5D6B98]">
            <p className="w-10 h-10 f rounded-full font-semibold bg-[#EFF1F5] uppercase flex items-center justify-center">
              {getFirstLetters(user.name)}
            </p>
            <div>
              <p className="font-semibold text-[#404968]">{user.name}</p>
              {/* review user */}
              <p className="text-slate-500">@{user.username}</p>
            </div>
          </div>
          <button
            onClick={() => {
              captureEvent("Edit account button");
              router.push("/account/edit", undefined, { shallow: true });
            }}
            className="text-brand-600 font-semibold bg-brandPrimary50 rounded-lg w-full py-2"
          >
            Edit Akun
          </button>
        </div>
      </div>
      <div className="mt-[128px] py-6 text-[#404968] px-4 space-y-6">
        <Divider />
        <p className="font-semibold ml-1">Aktivitas</p>
        <div className="rounded-xl border-[1px] border-[#EFF1F]">
          <div
            className="p-4 flex gap-x-4"
            onClick={() => {
              router.push("/bookmark", undefined, { shallow: true });
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="12" fill="#FDEAEA" />
              <path
                d="M7.3335 9.2C7.3335 8.0799 7.3335 7.51984 7.55148 7.09202C7.74323 6.71569 8.04919 6.40973 8.42552 6.21799C8.85334 6 9.41339 6 10.5335 6H13.4668C14.5869 6 15.147 6 15.5748 6.21799C15.9511 6.40973 16.2571 6.71569 16.4488 7.09202C16.6668 7.51984 16.6668 8.0799 16.6668 9.2V18L12.0002 15.3333L7.3335 18V9.2Z"
                stroke="#D12D2D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <div>
              <p className="text-sm font-medium text-sate-700">Koleksi tempatmu</p>
              <p className="text-[#667085] text-xs">
                Cek lagi restoran yang pernah kamu simpan
              </p>
            </div>
          </div>
          <hr />
          <div className="p-4 flex gap-x-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="12" fill="#EAFBF0" />
              <path
                d="M11.5219 6.30217C11.6756 5.99088 11.7524 5.83523 11.8567 5.7855C11.9475 5.74224 12.0529 5.74224 12.1436 5.7855C12.2479 5.83523 12.3248 5.99088 12.4784 6.30217L13.9362 9.25548C13.9816 9.34738 14.0042 9.39333 14.0374 9.42901C14.0667 9.4606 14.1019 9.48619 14.141 9.50437C14.1852 9.52491 14.2359 9.53232 14.3373 9.54714L17.5982 10.0238C17.9415 10.074 18.1132 10.099 18.1927 10.1829C18.2618 10.2559 18.2943 10.3562 18.2812 10.4558C18.266 10.5703 18.1417 10.6914 17.8931 10.9335L15.5345 13.2309C15.4609 13.3025 15.4242 13.3383 15.4004 13.3809C15.3794 13.4187 15.366 13.4601 15.3608 13.503C15.3549 13.5514 15.3636 13.602 15.3809 13.7031L15.9375 16.948C15.9962 17.2903 16.0255 17.4614 15.9704 17.563C15.9224 17.6513 15.8371 17.7133 15.7382 17.7316C15.6246 17.7527 15.4709 17.6719 15.1636 17.5102L12.2484 15.9772C12.1576 15.9294 12.1122 15.9055 12.0643 15.8961C12.022 15.8878 11.9784 15.8878 11.936 15.8961C11.8882 15.9055 11.8428 15.9294 11.7519 15.9772L8.83678 17.5102C8.52944 17.6719 8.37577 17.7527 8.26214 17.7316C8.16328 17.7133 8.07798 17.6513 8.02999 17.563C7.97483 17.4614 8.00418 17.2903 8.06288 16.948L8.61942 13.7031C8.63677 13.602 8.64545 13.5514 8.63958 13.503C8.63438 13.4601 8.6209 13.4187 8.5999 13.3809C8.57618 13.3383 8.53941 13.3025 8.46589 13.2309L6.1072 10.9335C5.8586 10.6914 5.73431 10.5703 5.71918 10.4558C5.70602 10.3562 5.73853 10.2559 5.80766 10.1829C5.88712 10.099 6.05881 10.074 6.40219 10.0238L9.66304 9.54714C9.76445 9.53232 9.81515 9.52491 9.85931 9.50437C9.89841 9.48619 9.9336 9.4606 9.96295 9.42901C9.9961 9.39333 10.0188 9.34738 10.0641 9.25548L11.5219 6.30217Z"
                stroke="#4FAB5E"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <div>
              <p className="text-sm font-medium text-sate-700">Kumpulan Review-mu</p>
              <p className="text-[#667085] text-xs">
                Lihat tempat yang udah pernah kamu review
              </p>
            </div>
          </div>
          <hr />
          {/* <div
            className="p-4 flex gap-x-4"
            onClick={() => {
              router.push("/account/kritik", undefined, { shallow: true });
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="12" fill="#F2F4F7" />
              <path
                d="M18.3335 16L13.9049 12M10.0954 12L5.66685 16M5.3335 8.66663L10.7768 12.4769C11.2176 12.7855 11.4379 12.9397 11.6777 12.9995C11.8894 13.0523 12.1109 13.0523 12.3227 12.9995C12.5624 12.9397 12.7828 12.7855 13.2235 12.4769L18.6668 8.66663M8.5335 17.3333H15.4668C16.5869 17.3333 17.147 17.3333 17.5748 17.1153C17.9511 16.9236 18.2571 16.6176 18.4488 16.2413C18.6668 15.8135 18.6668 15.2534 18.6668 14.1333V9.86663C18.6668 8.74652 18.6668 8.18647 18.4488 7.75865C18.2571 7.38232 17.9511 7.07636 17.5748 6.88461C17.147 6.66663 16.5869 6.66663 15.4668 6.66663H8.5335C7.41339 6.66663 6.85334 6.66663 6.42552 6.88461C6.04919 7.07636 5.74323 7.38232 5.55148 7.75865C5.3335 8.18647 5.3335 8.74652 5.3335 9.86663V14.1333C5.3335 15.2534 5.3335 15.8135 5.55148 16.2413C5.74323 16.6176 6.04919 16.9236 6.42552 17.1153C6.85334 17.3333 7.41339 17.3333 8.5335 17.3333Z"
                stroke="#667085"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <div>
              <p className="text-sm text-sate-700">Kritik & Saran</p>
              <p className="text-[#667085] text-xs">
                Kirim ide kamu agar Tempat bisa lebih baik
              </p>
            </div>
          </div>
          <hr />
          <div
            className="p-4 flex gap-x-4"
            onClick={() => {
              router.push("/account/kritik", undefined, { shallow: true });
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="12" fill="#F2F4F7" />
              <g clip-path="url(#clip0_2262_25821)">
                <path
                  d="M12.0002 14.6666V12M12.0002 9.33331H12.0068M18.6668 12C18.6668 15.6819 15.6821 18.6666 12.0002 18.6666C8.31826 18.6666 5.3335 15.6819 5.3335 12C5.3335 8.31808 8.31826 5.33331 12.0002 5.33331C15.6821 5.33331 18.6668 8.31808 18.6668 12Z"
                  stroke="#667085"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2262_25821">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(4 4)"
                  />
                </clipPath>
              </defs>
            </svg>

            <div>
              <p className="text-sm text-sate-700">Privasi & Kebijakan</p>
              <p className="text-[#667085] text-xs">
                Cek lagi restoran yang pernah kamu simpan
              </p>
            </div>
          </div> */}
        </div>
        <Divider />
      </div>
      <p
        onClick={() => {
          signOut();
          posthog.capture("logout button");
          posthog.reset();
        }}
        className="bg-brandPrimary600 mt-4 text-white font-semibold w-fit mx-auto rounded-lg px-16 py-2"
      >
        Keluar
      </p>
    </div>
  );
}
