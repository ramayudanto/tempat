import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { FormEvent, useContext, useRef, useState } from "react";
import { getTodaysOpeningHours, openTimeLogic, priceLogic, translatePriceRange, translateToK, truncate } from "../../lib/logic";
import { BookmarkContext } from "../../pages/bookmark";
// import CategoryImage from "../CategoryPage/CategoryImage";
import DeleteBookmarkToast from "../Toasts/DeleteBookmarkToast";
import { captureEvent } from "../../lib/posthog";

export default function BookmarkCard({ restaurant }: any) {
  // const [isBookmakred, setIsBookmarked] = useState<boolean>(true);
  const { userBookmark, setUserBookmark } = useContext(BookmarkContext);
  const deleteToastRef = useRef<any>(null);

  const bookmarkHandler = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/deleteBookmark`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        place_id: restaurant?.place_id,
      }),
    });
    // if code 200 make a toast
    if (res.status === 200) {
      deleteToastRef.current!.show();
      captureEvent("remove bookmark", {
        "restaurant name": restaurant?.gofood_name || restaurant?.name,
        origin: "user's bookmark page",
      });
      const newBookmark = userBookmark.filter((item: any) => item.gofood_name !== restaurant?.gofood_name);
      setTimeout(() => {
        setUserBookmark(newBookmark);
      }, 150);
    }
  };

  const locationBroad = restaurant.address_components.find((component: any) =>
    component.types.includes("administrative_area_level_4" || "administrative_area_level_3" || "administrative_area_level_2" || "administrative_area_level_1" || "country")
  ) || { short_name: "Unknown", long_name: "Unknown" };
  return (
    <Link href={`/restos/${restaurant?.place_id}`}>
      <a className="border-[1px] rounded-xl hover:bg-[#f6f6f6] transition">
        <DeleteBookmarkToast ref={deleteToastRef} />
        <div className="bg-cover w-full h-[155px] relative rounded-t-xl" style={{ backgroundImage: `url(${restaurant?.thumbnail})` }}>
          <button className="p-2 flex items-center justify-center bg-white rounded-full right-4 top-2 absolute z-20 fill-brandPrimary600" onClick={bookmarkHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-darkRed">
              <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="px-4 py-2 space-y-1">
          <p className="font-medium text-sm text-darkGray mb-1">{truncate(restaurant?.gofood_name, 32)}</p>
          <div className="flex gap-x-2">
            <svg width="10" height="12" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 0C2.68286 0 0 2.504 0 5.6C0 9.8 6 16 6 16C6 16 12 9.8 12 5.6C12 2.504 9.31714 0 6 0ZM6 7.6C4.81714 7.6 3.85714 6.704 3.85714 5.6C3.85714 4.496 4.81714 3.6 6 3.6C7.18286 3.6 8.14286 4.496 8.14286 5.6C8.14286 6.704 7.18286 7.6 6 7.6Z"
                fill="#E63131"
                className="fill-slate-500"
              />
            </svg>
            <p className="text-xs text-lightGray">{truncate(locationBroad.short_name || locationBroad.long_name, 17)}</p>
          </div>
          {/* <div className="flex items-center gap-x-[2px]">
            <div className="flex items-center gap-x-[2px]">
              <svg width="15" height="15" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-[1px]">
                <path
                  d="M8.8682 3.44812L6.38871 3.08777L5.28031 0.840702C5.25003 0.779178 5.20023 0.729374 5.13871 0.6991C4.98441 0.622928 4.79691 0.686405 4.71976 0.840702L3.61136 3.08777L1.13187 3.44812C1.06351 3.45789 1.00101 3.49012 0.953159 3.53894C0.895309 3.5984 0.863431 3.6784 0.864529 3.76135C0.865628 3.8443 0.899614 3.92342 0.959018 3.98133L2.75296 5.73035L2.32914 8.20008C2.3192 8.25753 2.32555 8.31661 2.34749 8.37064C2.36942 8.42466 2.40605 8.47145 2.45323 8.50572C2.5004 8.53998 2.55623 8.56034 2.61439 8.56449C2.67255 8.56863 2.7307 8.5564 2.78226 8.52918L5.00003 7.36316L7.21781 8.52918C7.27835 8.5614 7.34867 8.57215 7.41605 8.56043C7.58597 8.53113 7.70023 8.37 7.67093 8.20008L7.2471 5.73035L9.04105 3.98133C9.08988 3.93348 9.1221 3.87098 9.13187 3.80262C9.15824 3.63172 9.0391 3.47351 8.8682 3.44812Z"
                  fill="#22AF39"
                />
              </svg>
              <p className="text-xs text-green">{restaurant?.rating}</p>
            </div>
            <p className="text-lightGray font-light">|</p>
            <p className="text-xs text-lightGray font-light">{translateToK(restaurant?.user_ratings_total)} Review</p>
          </div> */}
          <div className="flex gap-x-1 overflow-hidden">
            {restaurant?.categories.map((item: any, i: any, row: any) => {
              if (i + 1 === row.length) {
                return (
                  <p className="text-slate-500  flex-none text-xs" key={i}>
                    {item.name}
                  </p>
                );
              } else {
                return (
                  <p className="text-slate-500 flex-none text-xs" key={i}>
                    {item.name},
                  </p>
                );
              }
            })}
          </div>
          <p className="font-semibold text-opacity-70 text-xs">{restaurant?.priceRange}</p>
          {/* <p className="text-darkRed text-xs">{openTimeLogic(getTodaysOpeningHours(restaurant?.opening_hours))}</p> */}
        </div>
      </a>
    </Link>
  );
}
