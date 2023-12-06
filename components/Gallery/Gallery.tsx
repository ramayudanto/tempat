import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getRestaurantImage } from "../../lib/firebase";
import Header from "../Head/Header";
import { AnimatePresence } from "framer-motion";
import Slideshow from "../MenuSection/Slideshow";
import { useRouter } from "next/router";

export default function Gallery({ restaurant }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(-1);
  const [isSlideshowOpened, setIsSlideshowOpened] = useState<boolean>(false);
  const { Image: image, thumbnail } = restaurant;
  const combinedImage = [thumbnail, ...image];
  const router = useRouter();
  return (
    <>
      <Header title={`${restaurant.name} Gallery`} />
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isSlideshowOpened && (
          <Slideshow
            closeModal={() => {
              setIsSlideshowOpened(false);
              setCurrentImageIndex(-1);
            }}
            image={combinedImage}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        )}
      </AnimatePresence>
      <div className="pt-4 px-4 max-w-[420px] mx-auto space-y-6 min-h-screen bg-white">
        <div className="flex gap-x-4 items-center border-b-[1px] px-4 pb-4 mx-[-16px]">
          <button
            className="flex w-9 h-9 justify-center items-center gap-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-2 rounded-[1000px]"
            onClick={() => {
              router.back();
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 shrink-0"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-darkGray">Gallery</p>
            <p className="text-sm text-gray-500">{restaurant.name}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3 cursor-pointer pb-6">
          {combinedImage.map((item: any, i: any) => {
            return (
              <img
                src={item}
                alt={restaurant.name}
                className="relative w-full h-[175px] rounded-md ring-1 ring-gray-200"
                onClick={() => {
                  setIsSlideshowOpened(true);
                  setCurrentImageIndex(i);
                }}
              />
              // <Image
              //   className="rounded-md"
              //   src={item}
              //   key={i}
              //   width={162}
              //   height={162}
              //   alt={"test"}
              //   objectFit={"cover"}
              //   onClick={() => {
              //     setIsSlideshowOpened(true);
              //     setCurrentImageIndex(i);
              //   }}
              // />
            );
          })}
        </div>
      </div>
    </>
  );
}
