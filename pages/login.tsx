import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import LoginPage from "../components/login/LoginPage";
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: { user: false } };
};

export default function login() {
  return (
    <>
      <div className="w-screen h-[30vh] relative">
        <Image src={"https://ramayudanto.com/wp-content/uploads/2022/11/Burger.png"} layout="fill" alt="burger" objectFit="cover" priority />
      </div>
      <LoginPage />
    </>
  );
}
