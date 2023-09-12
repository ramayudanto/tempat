import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import LoginPage from "../components/login/LoginPage";
import Header from "../components/Head/Header";
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
  return { props: {} };
};

export default function login() {
  return (
    <>
      <Header title={"Login"} />
      <div className="max-w-[425px] mx-auto">
        <div className="h-[275px] relative">
          <Image src={"/homepage-1.png"} layout="fill" alt="burger" objectFit="cover" priority />
        </div>
        <LoginPage />
      </div>
    </>
  );
}
