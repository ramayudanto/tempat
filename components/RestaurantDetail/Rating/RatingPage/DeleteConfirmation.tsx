import React, { useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "../../../modal/Backdrop";

export default function RatingCardModal({ closeModal }: any) {
  const dropIn = {
    hidden: {
      opacity: 1,
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.3,
      },
      opacity: 1,
    },
    exit: {
      opacity: 1,
    },
  };
  return (
    <motion.div onClick={(e) => e.stopPropagation()} className="rounded-2xl px-6 py-8 bg-white z-[999] w-[80%] max-w-[420px] fixed space-y-6" initial="hidden" animate="visible" exit="exit" variants={dropIn}>
      <p>test</p>
    </motion.div>
  );
}
