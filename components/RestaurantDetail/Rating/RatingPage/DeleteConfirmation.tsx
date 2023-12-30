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
    <>
      <DeleteRatingToast ref={deleteRatingToastRef} />
      <motion.div
        className="fixed top-0 bg-black z-40 flex h-screen w-screen bg-opacity-50 max-w-[420px] mx-auto left-0 right-0 items-center justify-center"
        onClick={() => {
          closeModal();
          closeParentModal();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div onClick={(e) => e.stopPropagation()} className="rounded-t-3xl pb-6 px-4 pt-5 bg-white w-full max-w-[420px] absolute bottom-0 space-y-6" initial="hidden" animate="visible" exit="exit" variants={dropIn}>
          <p className="font-semibold leading-7 text-[#101828]">Apakah kamu yakin ingin menghapus review?</p>
          <div className="self-start w-full border-[#F4F7FE]">
            <div className="flex items-center space-x-7 mb-2 justify-between">
              <div className="flex items-center gap-x-2 justify-center min-w-max">
                <div className="w-8 h-8 relative rounded-full overflow-hidden self-start">
                  <Image src={user?.image || "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/asset/empty-state-svg.svg"} layout="fill" alt={user?.name} objectFit="cover" />
                </div>

                <div className="-space-y-1">
                  <p className="text-sm font-semibold text-darkGray">{user?.name}</p>
                  <p className="text-sm text-darkGray text-opacity-70">@{user?.username}</p>
                </div>
              </div>
              <div className="bg-green min-w-[24px] px-2 py-1 rounded flex font-semibold text-white text-sm items-center space-x-1">
                <p className="text-sm">{rate}</p>
                <svg width="10" height="10" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.00004 7.53723L7.42498 8.91839C7.86906 9.17151 8.41242 8.79733 8.29556 8.3241L7.65286 5.72686L9.79727 3.97702C10.1888 3.65787 9.9784 3.05259 9.4642 3.01407L6.64199 2.78846L5.53762 0.334285C5.33895 -0.111428 4.66114 -0.111428 4.46247 0.334285L3.35807 2.78296L0.535798 3.00857C0.0215951 3.04708 -0.188761 3.65237 0.202735 3.97152L2.34719 5.72136L1.70444 8.3186C1.58758 8.79183 2.131 9.16601 2.57508 8.91289L5.00004 7.53723Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <p className={`text-sm mb-2 ${!comment.length && "text-xs text-gray-300"}`}>{!comment.length ? "User tidak memberikan komentar" : comment}</p>
            {review?.imageUrl !== "null" && (
              <div className="w-full h-48 rounded overflow-hidden relative">
                <img src={review?.imageUrl} className="h-full w-[500px] object-cover" alt="" />
                {/* <Image src={item?.imageUrl} layout="fill" alt={"review photo"} objectFit="cover" /> */}
              </div>
            )}
          </div>
          <div className="font-semibold">
            <button onClick={handleDelete} className="w-full bg-red-600 text-white rounded-lg px-4 py-2 mt-4 block text-center">
              Hapus
            </button>
            <button className="w-full bg-white text-[#344054] border-[1px] border-[#D0D5DD] rounded-lg px-4 py-2 mt-4 block text-center">Batalkan</button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
