import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { openTimeLogic, priceLogic, ratingCounter, truncate } from "../../lib/logic";
import { BookmarkContext } from "../../pages/bookmark";
// import CategoryImage from "../CategoryPage/CategoryImage";

export default function BookmarkCard({ restaurant }: any) {
  const { name, category, closeTime, openTime, rating, featureImage, priceRange, routeName, locationBroad } = restaurant;
  // const [isBookmakred, setIsBookmarked] = useState<boolean>(true);
  const { userBookmark, setUserBookmark } = useContext(BookmarkContext);

  const bookmarkHandler = (e: any) => {
    e.preventDefault();

    const newBookmark = userBookmark.filter((item: any) => item.name !== name);
    setTimeout(() => {
      setUserBookmark(newBookmark);
    }, 500);

    fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/deleteBookmark`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        routeName,
      }),
    });
  };

  return (
    <Link href={`/restos/${routeName}`}>
      <a className="border-[1px] rounded-xl shadow-lg hover:bg-[#f6f6f6] transition h-48">
        <div className="bg-cover w-full h-2/3 relative rounded-t-xl" style={{ backgroundImage: `url(${featureImage[0]?.URL})` }}>
          {/* <Image src={featureImage[0]?.URL} alt={name} layout="fill" objectFit={"fill"} /> */}
          <button className="p-2 flex items-center justify-center bg-white rounded-full right-4 top-2 absolute z-20" onClick={bookmarkHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-darkRed">
              <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="px-4 py-2 space-y-1">
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-darkGray">{truncate(name, 16)}</p>
            {/* <div className="bg-green w-[47px] h-[26px] rounded flex font-semibold text-white items-center justify-evenly">
              <p className="text-sm">{ratingCounter(rating).includes("a") ? "0" : ratingCounter(rating)}</p>
              <Image src={"/starIcon.svg"} width={10} height={10} alt="star" />
            </div> */}
          </div>
          {/* <p className="text-darkRed text-xs">{openTimeLogic(openTime, closeTime)}</p> */}
        </div>
      </a>
    </Link>
  );
}
