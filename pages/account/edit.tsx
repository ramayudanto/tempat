import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { createContext, FormEvent, useRef, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { prisma } from "../../lib/prisma";
import Header from "../../components/Head/Header";
import SelectImage from "../../components/EditProfile/SelectImage";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import Toast from "../../components/Toasts/Toast";
import EditPassword from "../../components/Account/edit/EditPassword";
import bcrypt, { hash } from "bcryptjs";
import { encryptAES } from "../../lib/logic";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  // const { routeName } = context.params;
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
    select: {
      username: true,
      name: true,
      email: true,
      image: true,
    },
  });
  return { props: { user } };
};
export const ImageContext = createContext(null as any);

export default function Edit({ user }: any) {
  const [image, setImage] = useState<string>(user?.image!);
  const [isImageSelectOpen, setIsImageSelectOpen] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();
  const toastRef = useRef<any>(null);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value! === "" ? user.name : nameRef.current?.value!;
    const username = usernameRef.current?.value! === "" ? user.username : usernameRef.current?.value!;
    const oldPassword = oldPasswordRef.current?.value!;
    const newPassword = newPasswordRef.current?.value!;

    // Assuming you have the oldPassword and newPassword variables

    const encryptedNewPassword = encryptAES(newPassword);
    const encryptedOldPassword = encryptAES(oldPassword);

    fetch(`/api/updateUser`, {
      body: JSON.stringify({
        encryptedOldPassword,
        encryptedNewPassword,
        username,
        name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    // fetch(`/api/updateUser`, {
    //   body: JSON.stringify({ name, username, oldPassword, newPassword }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "PUT",
    // });
    // .then((res) => {
    //   if (res.status !== 200) {
    //     toastRef.current!.show();
    //   }
    //   if (res.status === 200) {
    //     setTimeout(() => {
    //       router.push("/account");
    //     }, 1000);
    //   }
    // });
  };

  const passwordProps = {
    setIsPasswordVisible,
    isPasswordVisible,
    oldPasswordRef,
    newPasswordRef,
  };
  return (
    <>
      <Header title="Edit" />
      <div className="py-6 px-4 mx-auto space-y-6 text-sm max-w-[420px] bg-white h-screen">
        <p className="text-xl font-semibold text-[#404968]">Edit Akun</p>
        <div className="flex flex-col items-center w-full gap-y-5">
          {/* <p className={`mr-auto font-medium text-darkGray text-opacity-70`}>Foto</p>
          <div className="flex flex-col gap-y-2 items-center">
            <Image src={image} width="150" height={"150"} alt="logo putih" objectFit="cover" className="rounded-full" />
            <button
              onClick={() => {
                setIsImageSelectOpen(true);
              }}
              className="px-5 py-2 rounded border-2 border-black border-opacity-10 bg-darkGray bg-opacity-10"
            >
              Pilih dari tempalate
            </button>
          </div> */}
          <form onSubmit={submitHandler} className="w-full space-y-5">
            <div className="self-start w-full flex flex-col gap-x-2">
              <label className="font-medium text-darkGray">Nama</label>
              <input spellCheck={false} className="outline-none border-2 bg-white w-full p-2 rounded-lg" type="text" placeholder={user.name || "not set"} required={!user.name} ref={nameRef} />
            </div>
            <div className="self-start w-full flex flex-col gap-x-2">
              <label className="font-medium text-darkGray">Username</label>
              <input spellCheck={false} className="outline-none border-2 bg-white w-full p-2 rounded-lg" type="text" placeholder={user.username || "not set"} ref={usernameRef} />
            </div>
            <div className="self-start w-full flex flex-col gap-x-2">
              <label className="font-medium text-darkGray">Email</label>
              <input className="border-2 bg-white w-full p-2 rounded-lg text text-darkGray cursor-not-allowed" disabled type="text" value={user.email} />
            </div>
            <EditPassword {...passwordProps} />
            <button className="w-full py-3 rounded-full bg-brandPrimary600 text-white font-medium" type="submit">
              Simpan
            </button>
          </form>
        </div>
      </div>
      {/* {isImageSelectOpen && (
        <ImageContext.Provider value={{ image, setImage }}>
          <SelectImage
            close={() => {
              setIsImageSelectOpen(false);
            }}
          />
        </ImageContext.Provider>
      )} */}
      <Navbar user={user} />
      <Toast message={"Username sudah terpakai!"} ref={toastRef} />
    </>
  );
}
