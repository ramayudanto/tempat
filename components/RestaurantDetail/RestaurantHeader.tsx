import Image from "next/image";
import React from "react";
// import { ratingCounter } from "../../lib/logic";

export default function RestaurantHeader({ restaurant }: any) {
  const { name, category, rating, locationBroad } = restaurant;
  return (
    <div className="flex justify-between items-center mb-5">
      <div>
        <p className="font-semibold text-xl text-darkGray">{name}</p>
        <div className="flex gap-x-1">
          {category.map((item: any, i: any, row: any) => {
            if (i + 1 === row.length) {
              return (
                <p className="text-darkGray text-opacity-70 text-base" key={i}>
                  {item.categoryName}
                </p>
              );
            } else {
              return (
                <p className="text-darkGray text-opacity-70 text-base" key={i}>
                  {item.categoryName},
                </p>
              );
            }
          })}
        </div>
        <p className="text-darkGray text-opacity-70">{locationBroad}</p>
      </div>
      <div className="bg-green w-[55px] h-[55px] rounded flex flex-col font-semibold text-white items-center justify-center">
        <div className="flex gap-x-1">
          {/* <p className="text-sm">{ratingCounter(rating).includes("a") ? "0" : ratingCounter(rating)}</p> */}
          <Image src={"/starIcon.svg"} width={10} height={10} alt="star" />
        </div>
        <p className="font-normal">RATED</p>
      </div>
    </div>
  );
}
