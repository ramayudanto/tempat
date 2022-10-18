import Image from "next/image";
import React from "react";
import { openTimeLogic, priceLogic, ratingCounter } from "../lib/logic";
import Link from "next/link";

export default function RestaurantCard({ restaurant }: any) {
  const { featureImage, name, priceRange, openTime, closeTime, category, rating, locationBroad, routeName } = restaurant;
  console.log(restaurant);

  const bookmarkHandler = (e: any) => {
    e.preventDefault();
    const currentBookmark = JSON.parse(localStorage.getItem("favouritePlace") || "[]");
    if (!currentBookmark) {
      const newBookmark = [{ routeName, name }];
      localStorage.setItem("favouritePlace", JSON.stringify(newBookmark));
    } else {
      if (!currentBookmark.some((item: any) => item.routeName === routeName)) {
        const newBookmark = [...currentBookmark, { routeName, name }];
        localStorage.setItem("favouritePlace", JSON.stringify(newBookmark));
      }
    }
  };

  return (
    <Link href={`/restos/${routeName}`}>
      <a className="border-[1px] rounded-xl shadow-lg">
        <div className="bg-cover w-[274px] h-[190px] relative rounded-t-xl" style={{ backgroundImage: `url(${featureImage[0]?.URL})` }}>
          {/* <Image src={featureImage[0]?.URL} alt={name} layout="fill" objectFit={"fill"} /> */}
          <button className="w-7 h-7 flex items-center justify-center bg-white rounded-full right-4 top-2 absolute z-20" onClick={bookmarkHandler}>
            <Image src={"/bookmarkIcon.svg"} width={15} height={15} alt="bookmark" />
          </button>
          <div className="flex px-[0.5rem] py-1 font-semibold items-center justify-center text-xs bg-white opacity-75 absolute bottom-2 right-3 rounded-full">
            <p>2.0 Km</p>
          </div>
        </div>
        <div className="px-4 py-2 space-y-1">
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-darkGray">{name}</p>
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
          <p className="text-darkGray text-opacity-70 text-xs">{locationBroad}</p>
          <div className="flex items-center justify-between">
            <p className="text-darkRed text-xs">{openTimeLogic(openTime, closeTime)}</p>
            <p className="text-darkGray text-opacity-70 text-xs">{priceLogic(priceRange)}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
