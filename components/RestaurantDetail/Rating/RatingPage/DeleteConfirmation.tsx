import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "../../../modal/Backdrop";
import Link from "next/link";
import Image from "next/image";
import DeleteRatingToast from "./DeleteRatingToast";

export default function RatingCardModal({ closeModal, closeParentModal, review, reviews, setReviews, deleteRatingToastRef }: any) {
  const { rate, comment, user } = review;
  const dropIn = {
    hidden: {
      y: "100%",
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
      y: "100%",
      opacity: 1,
    },
  };
  const handleDelete = async () => {
    const res = await fetch("/api/deleteRating", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ratingId: review.id,
      }),
    });
    if (res.ok) {
      // deleteRatingToastRef.current!.showToast();
      // setTimeout(() => {
      //   closeParentModal();
      //   closeModal();
      // }, 2500);
      // update reviews with setReviews
      const newReviews = reviews.filter((item: any) => item.id !== review.id);
      setReviews(newReviews);
    }
  };

  return (
    <motion.div
      className="fixed top-0 bg-black z-40 flex h-screen w-screen bg-opacity-50 max-w-[420px] mx-auto left-0 right-0 items-center justify-center"
      onClick={closeModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div onClick={(e) => e.stopPropagation()} className="w-3/4 bg-white h-1/5 rounded-3xl space-y-3 p-3 flex flex-col" initial="hidden" animate="visible" exit="exit" variants={dropIn}>
        <p className="font-medium">Apakah anda yakin untuk menghapus review?</p>
        <button className="bg-brandPrimary600 rounded-lg py-2 text-white" onClick={handleDelete}>
          Ya
        </button>
        <button className="bg-red-50 rounded-lg py-2 text-brandPrimary600" onClick={closeModal}>
          Tidak
        </button>
      </motion.div>
    </motion.div>
  );
}
