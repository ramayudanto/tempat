import React from "react";
import { useRouter } from "next/router";

export default function LoginPrompt() {
  const router = useRouter();

  const loginclick = () => {
    router.push("/account"); // Replace "/account" with the actual path to your account page
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex py-4 gap-x-4">
        <div className="h-[64px] min-w-[64px] flex justify-center align-middle items-center">
          <img
            src="https://tempatapp.sgp1.cdn.digitaloceanspaces.com/image/login.svg"
            alt="login prompt"
          />
        </div>
        <div className="flex flex-col justify-between">
          <h4 className="text-slate-700 text-lg font-semibold">
            Udah punya akun belum?
          </h4>
          <p className="text-sm text-slate-500">
            Buat akun atau masuk dulu yuk biar bisa simpen koleksi restoran favoritmu!
          </p>
        </div>
      </div>
      <button
        className="bg-brandPrimary50 p-3 font-bold text-brandPrimary600 text-sm rounded-full"
        onClick={loginclick}
      >
        Gabung Sekarang
      </button>
    </div>
  );
}
