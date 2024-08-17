import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "../../../modal/Backdrop";
import DeleteConfirmation from "./DeleteConfirmation";
import { useSession } from "next-auth/react";

export default function RatingCardModal({ closeModal, review, setReviews, reviews }: any) {
  const [isConfirmationModalOpened, setIsConfirmationModalOpened] = useState<boolean>(false);
  const session = useSession();
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
  return (
    <>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isConfirmationModalOpened && (
          <DeleteConfirmation
            review={review}
            closeModal={() => {
              setIsConfirmationModalOpened(false);
            }}
            closeParentModal={closeModal}
            setReviews={setReviews}
            reviews={reviews}
          />
        )}
      </AnimatePresence>
      <Backdrop onClick={closeModal}>
        <motion.div onClick={(e) => e.stopPropagation()} className="rounded-t-3xl z-10 px-6 py-8 bg-white w-full max-w-[420px] absolute bottom-0 space-y-6" initial="hidden" animate="visible" exit="exit" variants={dropIn}>
          <div className="flex justify-between items-center">
            <p className="self-stretch text-[color:var(--Gray-900,#101828)] text-lg not-italic font-semibold leading-7">Ada masalah dengan ulasan ini?</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={closeModal}>
              <path d="M18 6L6 18M6 6L18 18" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {session?.data?.user?.email === review.user?.email ? (
            <div
              className="flex cursor-pointer items-center gap-x-2"
              onClick={() => {
                setIsConfirmationModalOpened(true);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.6667 4.00016V3.46683C10.6667 2.72009 10.6667 2.34672 10.5213 2.06151C10.3935 1.81063 10.1895 1.60665 9.93865 1.47882C9.65344 1.3335 9.28007 1.3335 8.53333 1.3335H7.46667C6.71993 1.3335 6.34656 1.3335 6.06135 1.47882C5.81046 1.60665 5.60649 1.81063 5.47866 2.06151C5.33333 2.34672 5.33333 2.72009 5.33333 3.46683V4.00016M2 4.00016H14M12.6667 4.00016V11.4668C12.6667 12.5869 12.6667 13.147 12.4487 13.5748C12.2569 13.9511 11.951 14.2571 11.5746 14.4488C11.1468 14.6668 10.5868 14.6668 9.46667 14.6668H6.53333C5.41323 14.6668 4.85318 14.6668 4.42535 14.4488C4.04903 14.2571 3.74307 13.9511 3.55132 13.5748C3.33333 13.147 3.33333 12.5869 3.33333 11.4668V4.00016"
                  stroke="#D12D2D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="flex-[1_0_0] text-[color:var(--Foundation-merah-merah-600,#D12D2D)] text-sm not-italic font-medium leading-5">Hapus</p>
            </div>
          ) : (
            <div className="flex cursor-pointer items-center gap-x-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.39423 4.48132H13.3634C13.6782 4.48132 13.8355 4.48132 13.9276 4.5475C14.0079 4.60524 14.0602 4.69411 14.0717 4.79235C14.0848 4.90495 14.0084 5.04253 13.8555 5.31768L12.9083 7.02273C12.8528 7.12252 12.8251 7.17241 12.8142 7.22525C12.8046 7.27202 12.8046 7.32025 12.8142 7.36701C12.8251 7.41985 12.8528 7.46975 12.9083 7.56953L13.8555 9.27459C14.0084 9.54974 14.0848 9.68732 14.0717 9.79991C14.0602 9.89816 14.0079 9.98703 13.9276 10.0448C13.8355 10.1109 13.6782 10.1109 13.3634 10.1109H8.40905C8.01494 10.1109 7.81788 10.1109 7.66735 10.0342C7.53494 9.96678 7.42729 9.85913 7.35982 9.72672C7.28312 9.57619 7.28312 9.37913 7.28312 8.98502V7.29613M4.82016 14.3332L2.00534 3.07391M3.06093 7.29613H8.2683C8.66242 7.29613 8.85947 7.29613 9.01 7.21943C9.14241 7.15197 9.25006 7.04431 9.31753 6.9119C9.39423 6.76137 9.39423 6.56432 9.39423 6.17021V2.79243C9.39423 2.39832 9.39423 2.20126 9.31753 2.05073C9.25006 1.91832 9.14241 1.81067 9.01 1.7432C8.85947 1.6665 8.66242 1.6665 8.2683 1.6665H3.09554C2.60399 1.6665 2.35821 1.6665 2.19011 1.76835C2.04277 1.85762 1.9333 1.99783 1.88244 2.16242C1.8244 2.35021 1.88401 2.58864 2.00323 3.06552L3.06093 7.29613Z"
                  stroke="#344054"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="flex-[1_0_0] text-[color:var(--Gray-700,#344054)] text-sm not-italic font-medium leading-5">Lapor</p>
            </div>
          )}
        </motion.div>
      </Backdrop>
    </>
  );
}
