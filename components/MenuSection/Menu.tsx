// import { Menu } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Slideshow from "./Slideshow";
import { useRouter } from "next/router";
import Header from "../Head/Header";

export default function Menu({ restaurant }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(-1);
  const [isSlideshowOpened, setIsSlideshowOpened] = useState<boolean>(false);
  const { Menu: menu }: any = restaurant;
  const router = useRouter();

  return (
    <>
      <Header title={`${restaurant.name} Menu`} />
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isSlideshowOpened && (
          <Slideshow
            closeModal={() => {
              setIsSlideshowOpened(false);
              setCurrentImageIndex(-1);
            }}
            image={menu.image}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        )}
      </AnimatePresence>
      <div className="pt-4 px-4 max-w-[420px] space-y-6 mx-auto min-h-screen bg-white">
        <div className="flex gap-x-4 items-center border-b-[1px] px-4 pb-4 mx-[-16px]">
          <button
            className="flex w-9 h-9 justify-center items-center gap-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-2 rounded-[1000px]"
            onClick={() => {
              router.back();
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-darkGray">Menu</p>
            <p className="text-sm text-gray-500">{restaurant.name}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 cursor-pointer pb-6">
          {menu.image.map((item: string, i: number) => {
            return (
              <div
                className="relative w-full max-h-[175px] shrink-0 rounded-md overflow-hidden ring-1 ring-gray-200"
                key={i}
                onClick={() => {
                  setIsSlideshowOpened(true);
                  setCurrentImageIndex(i);
                }}
              >
                {/* ini biar height image nya auto */}
                <img src={item} alt={restaurant.name} />
                <Image src={item} alt={restaurant.name} layout="fill" objectFit="cover" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
