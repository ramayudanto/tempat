import { useContext, useEffect, useState } from "react";
import { ReviewContext } from "../../../pages/restos/[routeName]";
import CreateRating from "./CreateRating";
import RatingCard from "./RatingCard";
import Verify from "../../verify/Verify";
import { useRouter } from "next/router";
import { Rating } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import ReviewModal from "../../modal/ReviewModal";
import Divider from "../../design-system/Divider";
import { captureEvent } from "../../../lib/posthog";

export default function RatingSection() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { reviews, user, restaurant } = useContext(ReviewContext);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);
  const router = useRouter();
  return (
    <>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isModalOpen && (
          <ReviewModal
            closeModal={() => {
              setIsModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      <div className="mb-24 text-darkGray">
        <div className="flex justify-between items-center mb-6">
          <p className="font-semibold">Apa kata orang</p>
          <p
            className="text-brandPrimary600 text-xs font-medium cursor-pointer"
            onClick={() => {
              captureEvent("See Full Review button");
              const path = router.asPath;
              router.push(`${path}?view=review`, undefined, { shallow: true });
            }}
          >
            Lihat semua Review
          </p>
        </div>
        <div className="flex space-x-4 overflow-x-scroll">
          {reviews
            .sort((a: any, b: any) => {
              return new Date(a.postDate).valueOf() - new Date(b.postDate).valueOf();
            })
            .map((item: any, i: number) => {
              return <RatingCard key={i} item={item} />;
            })}
        </div>
        <p
          onClick={() => {
            if (!user) {
              setIsModalOpen(true);
            } else {
              setIsOpen(true);
            }
          }}
          className={`text-gray-700 cursor-pointer text-center text-sm font-medium leading-[18px] border-t-2 mt-10 pt-2`}
        >
          Tulis review yuk!
        </p>
      </div>
      {/* {isModalOpen && setIsModalOpen
        <Verify
          close={() => {
            setVerifyIsOpen(false);
          }}
        />
      )} */}
      {isOpen && (
        <>
          <CreateRating
            cancel={() => {
              setIsOpen(false);
            }}
            restaurant={restaurant}
            user={user}
          />
        </>
      )}
    </>
  );
}
