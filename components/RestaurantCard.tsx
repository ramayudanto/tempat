import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { openTimeLogic, priceLogic, ratingCounter, recentRestaurantHandler, truncate } from "../lib/logic";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function RestaurantCard({ restaurant }: any) {
  const { featureImage, name, priceRange, openTime, closeTime, category, rating, locationBroad, routeName, userBookmark } = restaurant;
  const [isBookmakred, setIsBookmarked] = useState<boolean>(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading" || !userBookmark) return;
    userBookmark.map((item: any) => {
      if (item.email === session?.user?.email) {
        setIsBookmarked(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

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
        <div className="bg-cover w-[274px] h-[190px] relative rounded-t-xl" style={{ backgroundImage: `url(${featureImage[0]?.URL})` }}>
          {/* <Image src={featureImage[0]?.URL} alt={name} layout="fill" objectFit={"fill"} /> */}
          <button className="p-2 flex items-center justify-center bg-white rounded-full right-4 top-2 absolute z-20" onClick={bookmarkHandler}>
            {isBookmakred ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-darkRed">
                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            )}
          </button>
          <div className="flex px-[0.5rem] py-1 font-semibold items-center justify-center text-xs bg-white opacity-75 absolute bottom-2 right-3 rounded-full">
            <p>2.0 Km</p>
          </div>
        </div>
        <div className="px-4 py-2 space-y-1">
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-darkGray">{truncate(name, 21)}</p>
            <div className="bg-green w-[47px] h-[26px] rounded flex font-semibold text-white items-center justify-evenly">
              <p className="text-sm">{ratingCounter(rating).includes("a") ? "0" : ratingCounter(rating)}</p>
              <Image src={"/starIcon.svg"} width={10} height={10} alt="star" />
            </div>
          </div>
          <div className="flex gap-x-1">
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
          </div>
          <p className="text-darkGray text-opacity-70 text-xs">{truncate(locationBroad, 40)}</p>
          <div className="flex items-center justify-between">
            <p className="text-darkRed text-xs">{openTimeLogic(openTime, closeTime)}</p>
            <p className="text-darkGray text-opacity-70 text-xs">{priceLogic(priceRange)}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
