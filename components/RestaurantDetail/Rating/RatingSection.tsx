import { useState } from "react";
import CreateRating from "./CreateRating";
import RatingCard from "./RatingCard";

export default function RatingSection({ divRef, rating, restaurantId }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="mx-5 mb-96 text-darkGray" ref={divRef}>
      <div className="flex justify-between items-center">
        <p className="font-semibold">What people say</p>
        <p className="text-darkRed text-xs font-medium cursor-pointer">See all</p>
      </div>
      <p className="text-sm my-3">RECENT REVIEWS</p>
      <div className="flex space-x-4 overflow-x-scroll">
        {rating.map((item: any, i: number) => {
          return <RatingCard key={i} item={item} />;
        })}
      </div>
      {isOpen ? (
        <>
          <CreateRating
            cancel={() => {
              setIsOpen(false);
            }}
            restaurantId={restaurantId}
          />
        </>
      ) : (
        <>
          <p
            onClick={() => {
              setIsOpen(true);
            }}
            className={`text-darkRed cursor-pointer text-center border-t-2 mt-10 pt-2`}
          >
            Write a review
          </p>
        </>
      )}
    </div>
  );
}
