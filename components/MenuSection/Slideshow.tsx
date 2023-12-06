import React from "react";
import { motion } from "framer-motion";
import Backdrop from "../modal/Backdrop";
import Image from "next/image";

export default function Slideshow({
  closeModal,
  currentImageIndex,
  setCurrentImageIndex,
  image,
}: any) {
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
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="max-w-[420px] mt-14 mx-auto flex flex-col justify-between"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="fixed inset-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 fixed top-2 right-2 z-50"
            onClick={closeModal}
          >
            <rect width="24" height="24" rx="12" fill="white" />
            <path
              d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* ini image nya */}
          <img
            src={image[currentImageIndex]}
            alt="resto"
            className="rounded-md object-contain h-5/6 w-full p-4"
          />
          {/* <Image src={image[currentImageIndex]} alt="resto" objectFit="contain" className="rounded-md" width={336} height={400} /> */}
        </div>
        <div className="fixed inset-x-0 bottom-0 flex gap-x-2 overflow-x-scroll p-4">
          {image.map((item: string, i: number) => {
            // console.log(currentImageIndex);
            return (
              <div
                key={i}
                className={`w-[50px] h-[50px] relative rounded-md overflow-hidden shrink-0 flex-none border-2 border-black border-opacity-10 ${
                  currentImageIndex == i && "border-red-600 border-opacity-100"
                }`}
                onClick={() => {
                  setCurrentImageIndex(i);
                }}
              >
                {" "}
                {/* ini controller image nya */}
                <img
                  src={item}
                  alt={"image"}
                  className=" h-full w-full object-cover"
                />
                {/* <Image src={item} alt={"image"} layout="fill" objectFit="cover" /> */}
              </div>
            );
          })}
        </div>
      </motion.div>
    </Backdrop>
  );
}
