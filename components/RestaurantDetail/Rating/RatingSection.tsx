import { useContext, useState } from "react";
import { ReviewContext } from "../../../pages/restos/[routeName]";
import CreateRating from "./CreateRating";
import RatingCard from "./RatingCard";
import { useSession } from "next-auth/react";
import LoginPage from "../../login/LoginPage";
import Verify from "../../verify/Verify";

export default function RatingSection({ user, divRef, restaurant }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVerifyOpen, setVerifyIsOpen] = useState<boolean>(false);
  const { reviews } = useContext(ReviewContext);
  const { data: session } = useSession();
  return (
    <div className="mx-5 mb-96 text-darkGray" ref={divRef}>
      <div className="flex justify-between items-center">
        <p className="font-semibold">What people say</p>
        <p className="text-darkRed text-xs font-medium cursor-pointer">See all</p>
      </div>
      <p className="text-sm my-3">RECENT REVIEWS</p>
      <div className="flex space-x-4 overflow-x-scroll">
        {reviews.map((item: any, i: number) => {
          return <RatingCard key={i} item={item} />;
        })}
      </div>
      {isOpen && (
        <>
          <CreateRating
            cancel={() => {
              setIsOpen(false);
            }}
            restaurant={restaurant}
            session={session}
          />
        </>
      )}
      <p
        onClick={() => {
          if (user.name) {
            setIsOpen(true);
          } else {
            setVerifyIsOpen(true);
          }
        }}
        className={`text-darkRed cursor-pointer text-center border-t-2 mt-10 pt-2`}
      >
        Write a review
      </p>
      {isVerifyOpen && (
        <Verify
          close={() => {
            setVerifyIsOpen(false);
          }}
        />
      )}
    </div>
  );
}
