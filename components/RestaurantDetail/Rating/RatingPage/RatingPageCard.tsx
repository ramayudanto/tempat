import Image from "next/image";
import { truncate } from "../../../../lib/logic";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import RatingCardModal from "./RatingCardModal";
import { useState } from "react";

export default function RatingPageCard({ review, setReviews, reviews }: any) {
  //   console.log(rate);
  const { rate, comment, user, postDate } = review;
  function formatTimestamp(timestampStr: string): string {
    const date = new Date(timestampStr);
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  }
  const [isReviewModalOpened, setIsReviewModalOpened] = useState<boolean>(false);
  return (
    <>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isReviewModalOpened && (
          <RatingCardModal
            closeModal={() => {
              setIsReviewModalOpened(false);
            }}
            review={review}
            setReviews={setReviews}
            reviews={reviews}
          />
        )}
      </AnimatePresence>
      <div className="p-3 self-start w-full border-b-[6px] border-[#F4F7FE]">
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
          <div className="bg-slate-100 min-w-[24px] px-2 py-1 rounded flex font-semibold text-white text-sm items-center space-x-1">
            <p className="text-sm text-slate-500">{rate}</p>
            <svg width="10" height="10" viewBox="0 0 10 9" fill="" className="fill-slate-500" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.00004 7.53723L7.42498 8.91839C7.86906 9.17151 8.41242 8.79733 8.29556 8.3241L7.65286 5.72686L9.79727 3.97702C10.1888 3.65787 9.9784 3.05259 9.4642 3.01407L6.64199 2.78846L5.53762 0.334285C5.33895 -0.111428 4.66114 -0.111428 4.46247 0.334285L3.35807 2.78296L0.535798 3.00857C0.0215951 3.04708 -0.188761 3.65237 0.202735 3.97152L2.34719 5.72136L1.70444 8.3186C1.58758 8.79183 2.131 9.16601 2.57508 8.91289L5.00004 7.53723Z"
                fill="bg-slate-500"
              />
            </svg>
          </div>
        </div>
        <p className={`text-sm mb-2 ${!comment.length && "text-xs text-gray-300"}`}>{!comment.length ? "User tidak memberikan komentar" : truncate(comment, 80)}</p>
        {review?.imageUrl !== "null" && (
          <div className="w-full h-48 rounded overflow-hidden relative">
            <img src={review?.imageUrl} className="h-full w-[500px] object-cover" alt="" />
            {/* <Image src={item?.imageUrl} layout="fill" alt={"review photo"} objectFit="cover" /> */}
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          <p className="text-[color:var(--Gray-500,#667085)] text-xs not-italic font-normal leading-[18px]">Ditulis pada {formatTimestamp(postDate)}</p>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setIsReviewModalOpened(true);
            }}
            className="cursor-pointer"
          >
            <path
              d="M12 13.8711C12.5523 13.8711 13 13.4234 13 12.8711C13 12.3188 12.5523 11.8711 12 11.8711C11.4477 11.8711 11 12.3188 11 12.8711C11 13.4234 11.4477 13.8711 12 13.8711Z"
              stroke="#667085"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 6.87109C12.5523 6.87109 13 6.42338 13 5.87109C13 5.31881 12.5523 4.87109 12 4.87109C11.4477 4.87109 11 5.31881 11 5.87109C11 6.42338 11.4477 6.87109 12 6.87109Z"
              stroke="#667085"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 20.8711C12.5523 20.8711 13 20.4234 13 19.8711C13 19.3188 12.5523 18.8711 12 18.8711C11.4477 18.8711 11 19.3188 11 19.8711C11 20.4234 11.4477 20.8711 12 20.8711Z"
              stroke="#667085"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
