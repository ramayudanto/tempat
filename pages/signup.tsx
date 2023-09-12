import React, { FormEvent, useRef, useState } from "react";
import Header from "../components/Head/Header";
import Image from "next/image";
import SignUpForm from "../components/signup/SignUpForm";
import Navbar from "../components/Navbar/Navbar";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions);
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

export default function Signup() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const user = useSession();
  const [password, setPassword] = useState<string>("");
  const [passwordState, setPasswordState] = useState({
    length: false, // Initialize as false
    uppercase: false,
    number: false,
  });
  const [isUserExist, setIsUserExist] = useState<null | boolean>(null);

  function isPasswordValid(password: string) {
    const newState = { ...passwordState };

    // Check for minimum 8 characters
    if (password.length < 8) {
      newState.length = false;
    } else {
      newState.length = true;
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      newState.uppercase = false;
    } else {
      newState.uppercase = true;
    }

    // Check for at least one number
    if (!/\d/.test(password)) {
      newState.number = false;
    } else {
      newState.number = true;
    }

    setPasswordState(newState);

    // If all checks pass, return true; otherwise, return false
    return newState.length && newState.uppercase && newState.number;
  }

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    const valid = isPasswordValid(password);
    if (!valid) return;
    try {
      const res = await fetch("/api/auth/credentialRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInputRef.current!.value,
          password,
          name: nameInputRef.current!.value,
        }),
      });
      if (!res.ok) {
        // Handle HTTP error status codes here
        if (res.status === 400) {
          const errorMessage = await res.text();
          console.error(`Bad Request: ${errorMessage}`);
        }
      } else {
        // Handle successful res here
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkExistingEmail = async (email: string) => {
    const res = await fetch("/api/userExistCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    if (!res.ok) return;
    const data = await res.json();
    setIsUserExist(data.userExists);
  };

  const testHandler = async () => {
    checkExistingEmail(emailInputRef.current!.value);
  };

  return (
    <>
      <Header title={"Sign Up"} />
      <div className="max-w-[425px] mx-auto">
        <div className="h-[275px] relative">
          <Image src={"/homepage-1.png"} layout="fill" alt="burger" objectFit="cover" priority />
        </div>
        <div className="animate-loginFade h-screen px-4 bg-white rounded-t-2xl pt-4 flex flex-col gap-y-5">
          <div className="text-center">
            <p className="font-semibold text-xl text-darkGray">Sign Up</p>
            <p className="text-darkGray text-opacity-70">Enter your email and pasword</p>
          </div>
          <SignUpForm
            isPasswordValid={isPasswordValid}
            nameInputRef={nameInputRef}
            setPassword={setPassword}
            emailInputRef={emailInputRef}
            passwordState={passwordState}
            isUserExist={isUserExist}
            onSubmit={handleSignUp}
            test={testHandler}
          />
        </div>
      </div>
      <Navbar />
    </>
  );
}
