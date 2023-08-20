import Image from "next/image";
import Link from "next/link";
import React from "react";
import { openTimeLogic, priceLogic, recentRestaurantHandler, translatePriceRange, truncate } from "../../lib/logic";
import CategoryImage from "./CategoryImage";

export default function CategoryCard({ restaurant, i, isLast, onclick }: any) {
  const { gofood_name: name, category, closeTime, openTime, rating, thumbnail, priceRange, routeName } = restaurant;
  console.log(restaurant);

  return (
    <Link href={`/restos/${routeName}`}>
      <a
        className={` bg-white md:rounded-md ${i === 0 && "pt-1"} ${!isLast && "border-b-[3px] p-4"}`}
        onClick={() => {
          recentRestaurantHandler(restaurant);
        }}
      >
        <div className="w-full mb-3">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-darkGray">{truncate(name, 21)}</p>
            <div className="flex items-center gap-x-[2px] bg-green p-[6px] rounded">
              <p className="text-xs font-bold text-white">{rating}</p>
              <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="-mt-[1px]">
                <path
                  d="M8.86826 3.44825L6.38877 3.08789L5.28037 0.840824C5.25009 0.7793 5.20029 0.729496 5.13877 0.699222C4.98447 0.62305 4.79697 0.686527 4.71982 0.840824L3.61142 3.08789L1.13193 3.44825C1.06357 3.45801 1.00107 3.49024 0.95322 3.53907C0.89537 3.59853 0.863492 3.67852 0.86459 3.76147C0.865689 3.84442 0.899675 3.92354 0.959079 3.98145L2.75302 5.73047L2.3292 8.2002C2.31926 8.25765 2.32561 8.31674 2.34755 8.37076C2.36948 8.42478 2.40611 8.47158 2.45329 8.50584C2.50046 8.5401 2.55629 8.56046 2.61445 8.56461C2.67261 8.56875 2.73076 8.55652 2.78232 8.5293L5.00009 7.36328L7.21787 8.5293C7.27842 8.56153 7.34873 8.57227 7.41611 8.56055C7.58603 8.53125 7.70029 8.37012 7.67099 8.2002L7.24717 5.73047L9.04111 3.98145C9.08994 3.9336 9.12217 3.8711 9.13193 3.80274C9.1583 3.63184 9.03916 3.47364 8.86826 3.44825Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-x-1">
            {category.map((item: any, i: any, row: any) => {
              if (i + 1 === row.length) {
                return (
                  <p className="text-darkGray text-opacity-70 text-xs" key={i}>
                    {item}
                  </p>
                );
              } else {
                return (
                  <p className="text-darkGray text-opacity-70 text-xs" key={i}>
                    {item},
                  </p>
                );
              }
            })}
          </div>
          <div className="flex justify-between mt-1">
            <p className="text-darkRed text-xs">{openTimeLogic(restaurant.opening_hours)}</p>
            <p className="font-semibold text-opacity-70 text-xs">{translatePriceRange(priceRange)}</p>
          </div>
        </div>

        <CategoryImage images={[thumbnail]} />
      </a>
    </Link>
  );
}
