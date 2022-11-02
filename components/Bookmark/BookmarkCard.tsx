import Image from "next/image";
import Link from "next/link";
import React from "react";
import { openTimeLogic, priceLogic, ratingCounter, truncate } from "../../lib/logic";
import CategoryImage from "../CategoryPage/CategoryImage";

export default function BookmarkCard({ restaurant }: any) {
  const { name, category, closeTime, openTime, rating, featureImage, priceRange, routeName, locationBroad } = restaurant;
  return (
    <Link href={`/restos/${routeName}`}>
      <a className="border-[1px] rounded-xl shadow-lg hover:bg-[#f6f6f6] transition h-48">
        <div className="bg-cover w-full h-2/3 relative rounded-t-xl" style={{ backgroundImage: `url(${featureImage[0]?.URL})` }}>
          {/* <Image src={featureImage[0]?.URL} alt={name} layout="fill" objectFit={"fill"} /> */}
          <button className="w-7 h-7 flex items-center justify-center bg-white rounded-full right-4 top-2 absolute z-20">
            <Image src={"/bookmarkIcon.svg"} width={15} height={15} alt="bookmark" />
          </button>
        </div>
        <div className="px-4 py-2 space-y-1">
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-darkGray">{truncate(name, 17)}</p>
            {/* <div className="bg-green w-[47px] h-[26px] rounded flex font-semibold text-white items-center justify-evenly">
              <p className="text-sm">{ratingCounter(rating).includes("a") ? "0" : ratingCounter(rating)}</p>
              <Image src={"/starIcon.svg"} width={10} height={10} alt="star" />
            </div> */}
          </div>
          <p className="text-darkRed text-xs">{openTimeLogic(openTime, closeTime)}</p>
        </div>
      </a>
    </Link>
  );
}
