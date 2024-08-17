import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getTodaysOpeningHours, isRestaurantOpen, openTimeLogic, priceLogic, recentRestaurantHandler, translatePriceRange, truncate } from "../../lib/logic";
import CategoryImage from "./CategoryImage";
import { RestaurantV2 } from "@prisma/client";
import { captureEvent } from "../../lib/posthog";

export default function CategoryCard({ restaurant, i, isLast, onclick, routePath }: { restaurant: any; i: any; isLast: any; onclick?: any; routePath?: any }) {
  const { gofood_name: name, categories: category, closeTime, OpeningHoursV2: opening_hours, rating, thumbnail, price_level, place_id, Image } = restaurant;
  const locationBroad = restaurant?.address_components.find((component: any) =>
    component.types.includes("administrative_area_level_4" || "administrative_area_level_3" || "administrative_area_level_2" || "administrative_area_level_1" || "country")
  ) || { short_name: "Unknown", long_name: "Unknown" };
  
  return (
    <Link href={`/restos/${place_id}`}>
      <a
        className={`w-full bg-white max-w-[420px] mx-auto ${i === 0 && "pb-6"} ${!isLast && "pb-6 border-b-[1px]"}`}
        onClick={() => {
          recentRestaurantHandler(restaurant);
          captureEvent("view restaurant", { "restaurant name": restaurant.gofood_name || restaurant.name, category: restaurant.categories, origin: `${routePath || "home"} page` });
        }}
      >
        <div className="w-full mb-3">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-sm text-darkGray">{truncate(name, 30)}</p>
            <div className="flex items-center gap-x-[2px] bg-slate-100 p-[6px] rounded">
              <p className="text-xs font-semibold text-slate-500">{restaurant.ratingCount === 0 ? rating : (restaurant.ratingSum / restaurant.ratingCount).toFixed(1)}</p>
              <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="-mt-[1px]">
                <path
                  d="M8.86826 3.44825L6.38877 3.08789L5.28037 0.840824C5.25009 0.7793 5.20029 0.729496 5.13877 0.699222C4.98447 0.62305 4.79697 0.686527 4.71982 0.840824L3.61142 3.08789L1.13193 3.44825C1.06357 3.45801 1.00107 3.49024 0.95322 3.53907C0.89537 3.59853 0.863492 3.67852 0.86459 3.76147C0.865689 3.84442 0.899675 3.92354 0.959079 3.98145L2.75302 5.73047L2.3292 8.2002C2.31926 8.25765 2.32561 8.31674 2.34755 8.37076C2.36948 8.42478 2.40611 8.47158 2.45329 8.50584C2.50046 8.5401 2.55629 8.56046 2.61445 8.56461C2.67261 8.56875 2.73076 8.55652 2.78232 8.5293L5.00009 7.36328L7.21787 8.5293C7.27842 8.56153 7.34873 8.57227 7.41611 8.56055C7.58603 8.53125 7.70029 8.37012 7.67099 8.2002L7.24717 5.73047L9.04111 3.98145C9.08994 3.9336 9.12217 3.8711 9.13193 3.80274C9.1583 3.63184 9.03916 3.47364 8.86826 3.44825Z"
                  className="fill-slate-500"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-x-1 items-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.5 5C1.5 2.51472 3.51472 0.5 6 0.5C8.48528 0.5 10.5 2.51472 10.5 5C10.5 6.26309 9.92658 7.37012 9.14614 8.38351C8.49398 9.23032 7.65917 10.0579 6.82532 10.8845L6.82473 10.8851C6.66723 11.0412 6.50976 11.1973 6.35355 11.3536C6.15829 11.5488 5.84171 11.5488 5.64645 11.3536C5.49013 11.1972 5.3322 11.0407 5.17458 10.8844C4.34073 10.0578 3.50602 9.23032 2.85386 8.38351C2.07342 7.37012 1.5 6.26309 1.5 5ZM7.5 5C7.5 5.82843 6.82843 6.5 6 6.5C5.17157 6.5 4.5 5.82843 4.5 5C4.5 4.17157 5.17157 3.5 6 3.5C6.82843 3.5 7.5 4.17157 7.5 5Z"
                  className="fill-slate-500"
                />
              </svg>
              <p className="text-xs text-lightGray">{truncate(locationBroad.short_name || locationBroad.long_name, 18)}</p>
            </div>
          <div className="flex justify-between mt-1">
          <div className="flex gap-x-1">
            {category.map((item: any, i: any, row: any) => {
              if (i + 1 === row.length) {
                return (
                  <p className="text-darkGray text-opacity-70 text-xs" key={i}>
                    {item.name}
                  </p>
                );
              } else {
                return (
                  <p className="text-darkGray text-opacity-70 text-xs" key={i}>
                    {item.name},
                  </p>
                );
              }
            })}
          </div>
            {/* <p className={`self-stretch text-xs not-italic font-normal leading-[normal] ${isRestaurantOpen(opening_hours).toLowerCase() === "buka" ? "text-green" : "text-[#952525]"}`}>{isRestaurantOpen(opening_hours)}</p> */}
            <p className="text-darkGray text-opacity-70 text-xs">{translatePriceRange(price_level)}</p>
          </div>
        </div>

        <CategoryImage images={[thumbnail, ...Image]} />
      </a>
    </Link>
  );
}
