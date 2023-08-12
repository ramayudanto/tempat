import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { openTimeLogic, priceLogic, ratingCounter, recentRestaurantHandler, truncate } from "../../lib/logic";
import Link from "next/link";
import { useSession } from "next-auth/react";
import BookmarkButton from "./BookmarkButton";

export default function RestaurantCard({ user: session, restaurant }: any) {
  const { featureImage, name, price_level: priceRange, openTime, closeTime, category, thumbnail, rating, locationBroad, routeName, userBookmark } = restaurant;
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
        className="border-[1px] rounded-xl shadow-lg hover:bg-[#f6f6f6] transition"
        onClick={() => {
          recentRestaurantHandler(restaurant);
        }}
      >
        <div className="bg-cover w-[274px] h-[190px] relative rounded-t-xl" style={{ backgroundImage: `url(${thumbnail})` }}>
          {session && <BookmarkButton isBookmarked={isBookmakred} bookmarkHandler={bookmarkHandler} />}
          {/* <div className="flex px-[0.5rem] py-1 font-semibold items-center justify-center text-xs bg-white opacity-75 absolute bottom-2 right-3 rounded-full">
            <p>2.0 Km</p>
          </div> */}
        </div>
        <div className="px-4 py-2 space-y-1">
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-darkGray">{truncate(name, 21)}</p>
            {/* <div className="bg-green w-[47px] h-[26px] rounded flex font-semibold text-white items-center justify-evenly">
              <p className="text-sm">{ratingCounter(rating).includes("a") ? "0" : ratingCounter(rating)}</p>
              <Image src={"/starIcon.svg"} width={10} height={10} alt="star" />
            </div> */}
            <div className="bg-green w-[47px] h-[26px] rounded flex font-semibold text-white items-center justify-evenly">
              <p className="text-sm">{rating}</p>
              <Image src={"/starIcon.svg"} width={10} height={10} alt="star" />
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
          <p className="text-darkGray text-opacity-70 text-xs">{truncate(locationBroad, 40)}</p>
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
