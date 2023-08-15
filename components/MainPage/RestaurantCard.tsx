import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { openTimeLogic, priceLogic, ratingCounter, recentRestaurantHandler, truncate } from "../../lib/logic";
import Link from "next/link";
import { useSession } from "next-auth/react";
import BookmarkButton from "./BookmarkButton";

export default function RestaurantCard({ restaurant }: any) {
  const { featureImage, name, price_level: priceRange, openTime, closeTime, category, thumbnail, rating, locationBroad, routeName, userBookmark } = restaurant;
  const session = false;
  const [isBookmakred, setIsBookmarked] = useState<boolean>(false);
  // const [isBookmakred, setIsBookmarked] = useState<boolean>(
  //   userBookmark.map((item: any) => {
  //     if (item.email === session?.email) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   })[0]
  // );

  const bookmarkHandler = (e: FormEvent) => {
    e.preventDefault();
    if (isBookmakred) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/deleteBookmark`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          routeName,
        }),
      });
      setIsBookmarked(false);
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/setBookmark`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          routeName,
        }),
      });
      setIsBookmarked(true);
    }
  };

  return (
    <Link href={`/restos/${routeName}`}>
      <a
        className="rounded-lg flex-none shadow-xl w-[33vw] hover:bg-[#f6f6f6] transition"
        onClick={() => {
          recentRestaurantHandler(restaurant);
        }}
      >
        <div className="bg-cover h-[190px] relative rounded-t-xl" style={{ backgroundImage: `url(${thumbnail})` }}>
          {session && <BookmarkButton isBookmarked={isBookmakred} bookmarkHandler={bookmarkHandler} />}
          {/* <div className="flex px-[0.5rem] py-1 font-semibold items-center justify-center text-xs bg-white opacity-75 absolute bottom-2 right-3 rounded-full">
            <p>2.0 Km</p>
          </div> */}
        </div>

        <div className="p-2 space-y-2">
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-sm">{truncate(name, 21)}</p>
            {/* <div className="bg-green w-[47px] h-[26px] rounded flex font-semibold text-white items-center justify-evenly">
              <p className="text-sm">{ratingCounter(rating).includes("a") ? "0" : ratingCounter(rating)}</p>
              <Image src={"/starIcon.svg"} width={10} height={10} alt="star" />
            </div> */}
          </div>
          <div className="flex gap-x-2">
            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 0C2.68286 0 0 2.504 0 5.6C0 9.8 6 16 6 16C6 16 12 9.8 12 5.6C12 2.504 9.31714 0 6 0ZM6 7.6C4.81714 7.6 3.85714 6.704 3.85714 5.6C3.85714 4.496 4.81714 3.6 6 3.6C7.18286 3.6 8.14286 4.496 8.14286 5.6C8.14286 6.704 7.18286 7.6 6 7.6Z"
                fill="#E63131"
              />
            </svg>
            <p className="text-xs text-[#697586]">Place</p>
          </div>
          <div>
            <div className="flex items-center">
              <svg width="15" height="15" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                <path
                  d="M8.8682 3.44812L6.38871 3.08777L5.28031 0.840702C5.25003 0.779178 5.20023 0.729374 5.13871 0.6991C4.98441 0.622928 4.79691 0.686405 4.71976 0.840702L3.61136 3.08777L1.13187 3.44812C1.06351 3.45789 1.00101 3.49012 0.953159 3.53894C0.895309 3.5984 0.863431 3.6784 0.864529 3.76135C0.865628 3.8443 0.899614 3.92342 0.959018 3.98133L2.75296 5.73035L2.32914 8.20008C2.3192 8.25753 2.32555 8.31661 2.34749 8.37064C2.36942 8.42466 2.40605 8.47145 2.45323 8.50572C2.5004 8.53998 2.55623 8.56034 2.61439 8.56449C2.67255 8.56863 2.7307 8.5564 2.78226 8.52918L5.00003 7.36316L7.21781 8.52918C7.27835 8.5614 7.34867 8.57215 7.41605 8.56043C7.58597 8.53113 7.70023 8.37 7.67093 8.20008L7.2471 5.73035L9.04105 3.98133C9.08988 3.93348 9.1221 3.87098 9.13187 3.80262C9.15824 3.63172 9.0391 3.47351 8.8682 3.44812Z"
                  fill="#22AF39"
                />
              </svg>
              <p className="text-xs">{rating}</p>
            </div>
          </div>
          {/* <div className="flex gap-x-1">
            {category.map((item: any, i: any, row: any) => {
              if (i + 1 === row.length) {
                return (
                  <p className="text-darkGray text-opacity-70 text-xs" key={i}>
                    {item.categoryName}
                  </p>
                );
              } else {
                return (
                  <p className="text-darkGray text-opacity-70 text-xs" key={i}>
                    {item.categoryName},
                  </p>
                );
              }
            })}
          </div> */}
          <div className="flex items-center justify-between">
            <p className="text-darkRed text-xs">{openTimeLogic(openTime, closeTime)}</p>
            {/* <p className="text-darkGray text-opacity-70 text-xs">{priceLogic(priceRange)}</p> */}
            <p className="text-darkGray text-opacity-70 text-xs">price range: {priceRange}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
