import React from "react";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";

export default function MainPageModal({ closeModal }: any) {
  const dropIn = {
    hidden: {
      y: "100%",
      opacity: 1,
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.2,
      },
      opacity: 1,
    },
    exit: {
      y: "100%",
      opacity: 1,
    },
  };
  return (
    <Backdrop onClick={closeModal}>
      <motion.div onClick={(e) => e.stopPropagation()} className="rounded-t-3xl py-6 px-4 bg-white w-full max-w-[420px] fixed bottom-0 space-y-4" variants={dropIn} initial="hidden" animate="visible" exit="exit">
        <div className="font-semibold text-base text-slate-700 flex gap-x-2 items-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 8.33331C2.5 4.19118 5.85786 0.833313 10 0.833313C14.1421 0.833313 17.5 4.19118 17.5 8.33331C17.5 11.3987 15.7828 13.0718 14.1814 14.415C14.0121 14.557 13.8461 14.6944 13.684 14.8285C12.2504 16.0152 11.1276 16.9446 10.8172 18.4967C10.7392 18.8863 10.3972 19.1666 10 19.1666C9.60277 19.1666 9.26075 18.8863 9.18285 18.4967C8.87242 16.9446 7.74956 16.0152 6.31596 14.8285C6.15391 14.6944 5.98789 14.557 5.81863 14.415C4.21724 13.0718 2.5 11.3987 2.5 8.33331ZM12.5 8.33331C12.5 9.71403 11.3807 10.8333 10 10.8333C8.61929 10.8333 7.5 9.71403 7.5 8.33331C7.5 6.9526 8.61929 5.83331 10 5.83331C11.3807 5.83331 12.5 6.9526 12.5 8.33331Z" fill="#333333"/>
</svg>

          <p>Mau ganti lokasi?</p>
        </div>
        <p className="text-slate-500">Wah, belum bisa. Maaf ya saat ini hanya tersedia di Jakarta aja.</p>
        <button onClick={closeModal} className="bg-brandPrimary600 rounded-full w-full text-white px-5 py-3 font-semibold">
          Tutup
        </button>
      </motion.div>
    </Backdrop>
  );
}
