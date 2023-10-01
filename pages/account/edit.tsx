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
  const router = useRouter();
  const toastRef = useRef<any>(null);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value! === "" ? user.name : nameRef.current?.value!;
    const username = usernameRef.current?.value! === "" ? user.username : usernameRef.current?.value!;
    fetch(`/api/updateUser`, {
      body: JSON.stringify({ name, username, image }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((res) => {
      if (res.status === 400) {
        toastRef.current!.show();
      }
      if (res.status === 200) {
        setTimeout(() => {
          router.push("/account");
        }, 1000);
      }
    });
  };
  return (
    <>
      <Header title="Edit" />
      <div className="pt-20 mx-4 space-y-16">
        <p className="text-2xl font-semibold text-center">Edit Akun</p>
        <div className="flex flex-col items-center w-full gap-y-5">
          <p className={`mr-auto font-medium text-darkGray text-opacity-70`}>Foto</p>
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
          </div>
          <form onSubmit={submitHandler} className="w-full space-y-5">
            <div className="self-start w-full flex gap-x-2">
              <label className="font-medium text-darkGray text-opacity-70">Username</label>
              <input spellCheck={false} className="outline-none border-2 bg-white w-full p-2 rounded" type="text" placeholder={user.username || "not set"} required={!user.username} ref={usernameRef} />
            </div>
            <div className="self-start w-full flex gap-x-2">
              <label className="font-medium text-darkGray text-opacity-70">Nama</label>
              <input spellCheck={false} className="outline-none border-2 bg-white w-full p-2 rounded" type="text" placeholder={user.name || "not set"} required={!user.name} ref={nameRef} />
            </div>
            <div className="self-start w-full flex gap-x-2">
              <label className="font-medium text-darkGray text-opacity-70">Email</label>
              <input className="border-2 bg-white w-full p-2 rounded text text-darkGray text-opacity-70" disabled type="text" value={user.email} />
            </div>

            <button className="w-full py-3 rounded-full bg-darkRed text-white font-medium" type="submit">
              Simpan
            </button>
          </form>
        </div>
      </div>
      {isImageSelectOpen && (
        <ImageContext.Provider value={{ image, setImage }}>
          <SelectImage
            close={() => {
              setIsImageSelectOpen(false);
            }}
          />
        </ImageContext.Provider>
      )}
      <Navbar user={user} />
      <Toast message={"Username sudah terpakai!"} ref={toastRef} />
    </>
  );
}
