import Image from "next/image";
import Link from "next/link";
import React from "react";
import { openTimeLogic, priceLogic, ratingCounter, truncate } from "../../lib/logic";
import CategoryImage from "./CategoryImage";

export default function CategoryCard({ restaurant, isLast }: any) {
  const { name, category, closeTime, openTime, rating, featureImage, priceRange, routeName } = restaurant;
  return (
    <Link href={`/restos/${routeName}`}>
      <a className={`p-4 pb-3 md:border-[1px] md:rounded-md md:m-5 ${!isLast && "border-b-[3px]"}`}>
        <div className="flex justify-between mb-2">
          <div>
            <p className="font-semibold text-darkGray">{truncate(name, 21)}</p>
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
            <p className="text-darkRed text-xs">{openTimeLogic(openTime, closeTime)}</p>
          </div>
          <div className="flex flex-col items-end justify-between">
            <div className="bg-green p-1 px-2 rounded flex font-semibold text-white items-center gap-x-1">
              <p className="text-sm">{ratingCounter(rating).includes("a") ? "0" : ratingCounter(rating)}</p>
              <Image src={"/starIcon.svg"} width={10} height={10} alt="star" />
            </div>
            <p className="text-darkGray text-opacity-70 text-xs">{priceLogic(priceRange)}</p>
          </div>
        </div>
        <CategoryImage images={featureImage} />
      </a>
    </Link>
  );
}
