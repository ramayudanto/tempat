import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import LoginPage from "../components/login/LoginPage";
import Header from "../components/Head/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
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
          <Image src={"/homepage-1.jpg"} layout="fill" alt="burger" objectFit="cover" priority />
        </div>
        <LoginPage />
      </div>
    </>
  );
}
