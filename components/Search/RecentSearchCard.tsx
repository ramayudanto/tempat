import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { openTimeLogic, priceLogic, recentRestaurantHandler, truncate } from "../../lib/logic";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function RecentSearchCard({ restaurant }: any) {
  return (
    <Link href={`/restos/${restaurant?.place_id}`}>
      <a
        className="border-[1px] rounded-xl shadow-lg hover:bg-[#f6f6f6] transition"
        onClick={() => {
          recentRestaurantHandler(restaurant);
        }}
      >
        <div className="bg-cover w-[274px] h-[190px] rounded-t-xl" style={{ backgroundImage: `url(${restaurant?.thumbnail})` }}>
          {/* <Image src={featureImage[0]?.URL} alt={name} layout="fill" objectFit={"fill"} /> */}
        </div>
        <div className="px-4 py-2 space-y-1">
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-darkGray">{truncate(restaurant?.gofood_name, 21)}</p>
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
          {/* <p className="text-darkGray text-opacity-70 text-xs">{truncate(locationBroad, 40)}</p> */}
          <div className="flex items-center justify-between">
            {/* <p className="text-darkRed text-xs">{openTimeLogic(openTime, closeTime)}</p> */}
            {/* <p className="text-darkGray text-opacity-70 text-xs">{priceLogic(priceRange)}</p> */}
          </div>
        </div>
      </a>
    </Link>
  );
}
