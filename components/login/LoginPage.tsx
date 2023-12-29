import React, { FormEvent, useRef } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import Backdrop from "./Backdrop";
import Header from "../Head/Header";
import LoginForm from "./LoginForm";
import Navbar from "../Navbar/Navbar";
import { useRouter } from "next/router";
import Sucess from "./Sucess";
import Toast from "../Toasts/Toast";

export default function LoginPage({ closeLogin }: any) {
  const { data: session } = useSession();
  const router = useRouter();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const toastRef = useRef<any>(null);
  const errorToastRef = useRef<any>(null);

  const emailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.status && res.error === "Password doesn't match") {
      errorToastRef.current!.show();
    } else {
      toastRef.current!.show();
      setTimeout(() => {
        router.push("/", undefined, { shallow: true });
      }, 1000);
    }
  };
  // if (router.query.success) {
  //   return <Sucess />;
  // }
  return (
    <>
      <Header title={"Login"} />
      <Toast message="Berhasil masuk!" color="green" ref={toastRef} />
      <Toast message="Salah Password" ref={errorToastRef} />
      <div className="px-4 py-6 bg-white flex flex-col gap-y-5 relative z-10 h-full">
        <div className="text-center">
          <p className="font-semibold text-xl text-darkGray">Masuk</p>
          <p className="text-darkGray text-opacity-70">Isi email dan passwordmu</p>
        </div>
        <LoginForm passwordInputRef={passwordInputRef} emailInputRef={emailInputRef} onSubmit={emailSubmit} />
        <div className="text-sm flex justify-between cursor-pointer">
          <p>Belum punya akun?</p>
          <p
            className="text-brandPrimary600 text-sm font-semibold"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Daftar Akun baru
          </p>
        </div>
        <div className="flex items-center justify-evenly my-5">
          <hr className="border-t-[2px] w-1/4" />
          <p className="font-medium text-darkGray text-opacity-80"> atau gunakan akun</p>
          <hr className="border-t-[2px] w-1/4" />
        </div>
        <div className="flex items-center justify-around">
          <button
            className="flex items-center px-3 py-1 border-[1px] rounded-2xl"
            onClick={() => {
              signIn("google");
            }}
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_674_21159)">
                <g clipPath="url(#clip0_674_21159)">
                  <path d="M33.766 22.2765C33.766 21.4608 33.6999 20.6406 33.5588 19.8381H22.24V24.4591H28.7217C28.4528 25.9495 27.5885 27.2679 26.323 28.1056V31.104H30.19C32.4608 29.014 33.766 25.9274 33.766 22.2765Z" fill="#4285F4" />
                  <path
                    d="M22.24 34.0008C25.4764 34.0008 28.2058 32.9382 30.1944 31.1039L26.3274 28.1055C25.2516 28.8375 23.8626 29.252 22.2444 29.252C19.1138 29.252 16.4593 27.1399 15.5069 24.3003H11.5165V27.3912C13.5536 31.4434 17.7028 34.0008 22.24 34.0008V34.0008Z"
                    fill="#34A853"
                  />
                  <path d="M15.5025 24.3002C14.9999 22.8099 14.9999 21.196 15.5025 19.7057V16.6147H11.5165C9.81449 20.0055 9.81449 24.0004 11.5165 27.3912L15.5025 24.3002V24.3002Z" fill="#FBBC04" />
                  <path
                    d="M22.24 14.7497C23.9508 14.7232 25.6043 15.367 26.8433 16.5487L30.2694 13.1226C28.1 11.0855 25.2207 9.96553 22.24 10.0008C17.7028 10.0008 13.5536 12.5582 11.5165 16.6148L15.5025 19.7058C16.4505 16.8617 19.1094 14.7497 22.24 14.7497V14.7497Z"
                    fill="#EA4335"
                  />
                </g>
              </g>
              <defs>
                <filter id="filter0_d_674_21159" x="-2" y="-1" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_674_21159" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_674_21159" result="shape" />
                </filter>
                <clipPath id="clip0_674_21159">
                  <rect width="24" height="24" fill="white" transform="translate(10 10)" />
                </clipPath>
              </defs>
            </svg>
            <p className="text-sm text-darkGray cursor-pointer ">Sign In With Google</p>
          </button>
        </div>
      </div>
      <Navbar />
    </>
  );
}
