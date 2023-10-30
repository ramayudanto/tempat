import React from "react";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";

export default function Modal({ closeModal }: any) {
  return (
    <Backdrop onClick={closeModal}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="rounded-t-3xl py-6 px-4 bg-white w-full max-w-[420px] absolute bottom-0 space-y-6"
        variants={{
          hidden: {
            y: "-10vh",
            opacity: 1,
          },
          visible: {
            y: 0,
            transition: {
              duration: 0.1,
            },
            opacity: 1,
          },
        }}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="font-semibold text-2xl text-[#333333] flex gap-x-2 items-center">
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 12.6785 15.9393 14.6862 14.0176 16.298C13.8145 16.4684 13.6153 16.6333 13.4208 16.7943C11.7005 18.2182 10.3531 19.3335 9.98058 21.1961C9.8871 21.6635 9.47668 22 9 22C8.52332 22 8.1129 21.6635 8.01942 21.1961C7.6469 19.3335 6.29947 18.2182 4.57915 16.7943C4.38469 16.6333 4.18547 16.4684 3.98236 16.298C2.06069 14.6862 0 12.6785 0 9ZM12 9C12 10.6569 10.6569 12 9 12C7.34315 12 6 10.6569 6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9Z"
              fill="black"
            />
          </svg>
          <p>Mau ganti lokasi?</p>
        </div>
        <p className="text-[#333] text-opacity-60">Wah, maaf ya. Saat ini hanya tersedia di Jakarta aja.</p>
        <button onClick={closeModal} className="bg-red-600 rounded-full w-full text-white px-5 py-3">
          Tutup
        </button>
      </motion.div>
    </Backdrop>
  );
}
