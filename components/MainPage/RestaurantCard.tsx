import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { isRestaurantOpen, recentRestaurantHandler, translatePriceRange, translateToK, truncate } from "../../lib/logic";
import Link from "next/link";
import { useSession } from "next-auth/react";
import BookmarkButton from "./BookmarkButton";
import { captureEvent } from "../../lib/posthog";

export default function RestaurantCard({ restaurant }: any) {
  const { featureImage, gofood_name, price_level: priceRange, opening_hours, categories: category, thumbnail, rating, routeName, userBookmark, user_ratings_total: totalRate } = restaurant;
  const session = false;

  const [isBookmakred, setIsBookmarked] = useState<boolean>(false);
  const locationBroad = restaurant?.address_components.find((component: any) =>
    component.types.includes("administrative_area_level_4" || "administrative_area_level_3" || "administrative_area_level_2" || "administrative_area_level_1" || "country")
  ) || { short_name: "Unknown", long_name: "Unknown" };

  return (
    <Link href={`/restos/${restaurant.place_id}`}>
      <a
        className="rounded-lg border-[1px] flex-none max-w-[140px] "
        onClick={() => {
          recentRestaurantHandler(restaurant);
          captureEvent("view restaurant", { "restaurant name": restaurant.gofood_name || restaurant.name, category: restaurant.categories, origin: "home page" });
        }}
      >

        <div className="bg-cover bg-center h-[135px] relative rounded-t-lg" style={{ backgroundImage: `url(${thumbnail})` }}>
          {session && <BookmarkButton isBookmarked={isBookmakred} bookmarkHandler={() => {}} />}
          {/* <div className="flex px-[0.5rem] py-1 font-semibold items-center justify-center text-xs bg-white opacity-75 absolute bottom-2 right-3 rounded-full">
            <p>2.0 Km</p>
          </div> */}
        </div>

        <div className="p-2 space-y-2">
          <p className="font-semibold text-darkGray text-xs">{truncate(gofood_name, 36)}</p>
          <div className="flex gap-x-2">
            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 0C2.68286 0 0 2.504 0 5.6C0 9.8 6 16 6 16C6 16 12 9.8 12 5.6C12 2.504 9.31714 0 6 0ZM6 7.6C4.81714 7.6 3.85714 6.704 3.85714 5.6C3.85714 4.496 4.81714 3.6 6 3.6C7.18286 3.6 8.14286 4.496 8.14286 5.6C8.14286 6.704 7.18286 7.6 6 7.6Z"
                fill="#E63131"
              />
            </svg>
            <p className="text-xs text-lightGray">{truncate(locationBroad.short_name || locationBroad.long_name, 17)}</p>
          </div>
          <div className="flex items-center gap-x-[2px]">
            <div className="flex items-center gap-x-[2px]">
              <svg width="15" height="15" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-[1px]">
                <path
                  d="M8.8682 3.44812L6.38871 3.08777L5.28031 0.840702C5.25003 0.779178 5.20023 0.729374 5.13871 0.6991C4.98441 0.622928 4.79691 0.686405 4.71976 0.840702L3.61136 3.08777L1.13187 3.44812C1.06351 3.45789 1.00101 3.49012 0.953159 3.53894C0.895309 3.5984 0.863431 3.6784 0.864529 3.76135C0.865628 3.8443 0.899614 3.92342 0.959018 3.98133L2.75296 5.73035L2.32914 8.20008C2.3192 8.25753 2.32555 8.31661 2.34749 8.37064C2.36942 8.42466 2.40605 8.47145 2.45323 8.50572C2.5004 8.53998 2.55623 8.56034 2.61439 8.56449C2.67255 8.56863 2.7307 8.5564 2.78226 8.52918L5.00003 7.36316L7.21781 8.52918C7.27835 8.5614 7.34867 8.57215 7.41605 8.56043C7.58597 8.53113 7.70023 8.37 7.67093 8.20008L7.2471 5.73035L9.04105 3.98133C9.08988 3.93348 9.1221 3.87098 9.13187 3.80262C9.15824 3.63172 9.0391 3.47351 8.8682 3.44812Z"
                  fill="#22AF39"
                />
              </svg>
              <p className="text-xs text-green">{rating}</p>
            </div>
            <p className="text-lightGray text-opacity-70 text-xs font-light">|</p>
            <p className="text-xs text-lightGray font-light">{translateToK(totalRate)} Review</p>
          </div>
          <div className="flex gap-x-1 overflow-hidden">
            {category.length !== 0 ? (
              category.map((item: any, i: any, row: any) => {
                if (i + 1 === row.length) {
                  return (
                    <p className="text-darkGray flex-none text-opacity-70 text-xs" key={i}>
                      {item.name}
                    </p>
                  );
                } else {
                  return (
                    <p className="text-darkGray flex-none text-opacity-70 text-xs" key={i}>
                      {item.name},
                    </p>
                  );
                }
              })
            ) : (
              <p className="text-darkGray flex-none text-opacity-70 text-xs">Unknown</p>
            )}
          </div>

          <p className=" text-darkGray text-opacity-70 text-xs">{translatePriceRange(priceRange)}</p>
          <p className={`self-stretch text-xs not-italic font-normal leading-[normal] ${isRestaurantOpen(opening_hours).toLowerCase() === "buka" ? "text-green" : "text-[#952525]"}`}>{isRestaurantOpen(opening_hours)}</p>
          {/* <p className="text-darkGray text-opacity-70 text-xs">{priceLogic(priceRange)}</p> */}
        </div>
      </a>
    </Link>
  );
}
