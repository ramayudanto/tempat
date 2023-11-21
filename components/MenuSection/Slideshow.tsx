import React from "react";
import { motion } from "framer-motion";
import Backdrop from "../modal/Backdrop";
import Image from "next/image";

export default function Slideshow({ closeModal, currentImageIndex, setCurrentImageIndex, image }: any) {
  const dropIn = {
    hidden: {
      //   y: "100%",
      opacity: 1,
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.1,
      },
      opacity: 1,
    },
    exit: {
      //   y: "100%",
      opacity: 1,
    },
  };
  return (
    <Backdrop onClick={closeModal}>
      <motion.div onClick={(e) => e.stopPropagation()} className="max-w-[420px] mt-14 mb-10 mx-auto flex flex-col justify-between" variants={dropIn} initial="hidden" animate="visible" exit="exit">
        <div className="relative">
          <Image src={image[currentImageIndex]} alt="resto" objectFit="contain" className="rounded-md" width={348} height={500} />

          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 absolute -top-2 -right-3 z-50" onClick={closeModal}>
            <rect width="24" height="24" rx="12" fill="white" />
            <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex gap-x-4 overflow-x-scroll">
          {image.map((item: string, i: number) => {
            // console.log(currentImageIndex);
            return (
              <div
                key={i}
                className={`w-32 h-32 relative rounded-md overflow-hidden shrink-0 flex-none border-2 border-black border-opacity-10 ${currentImageIndex == i && "border-red-600 border-opacity-100"}`}
                onClick={() => {
                  setCurrentImageIndex(i);
                }}
              >
                <Image src={item} alt={"image"} layout="fill" objectFit="cover" />
              </div>
            );
          })}
        </div>
      </motion.div>
    </Backdrop>
  );
}
