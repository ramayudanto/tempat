import Header from "../../../Head/Header";
import { useRouter } from "next/router";
import RatingPageCard from "./RatingPageCard";

export default function FullReviewPage({ restaurant, reviews, setReviews }: any) {
  const router = useRouter();
  return (
    <>
      <Header title={`${restaurant.name} Review`} />
      <div className="pt-4 px-4 max-w-[420px] mx-auto min-h-screen bg-white">
        <div className="flex gap-x-4 items-center border-b-[1px] px-4 pb-4 mx-[-16px]">
          <button
            className="flex w-9 h-9 justify-center items-center gap-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-2 rounded-[1000px]"
            onClick={() => {
              router.back();
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-darkGray">Review</p>
            <p className="text-sm text-gray-500">{restaurant.name}</p>
          </div>
        </div>
        <div className="flex flex-col -mx-4">
          {reviews.map((review: any, i: number) => {
            return <RatingPageCard key={i} review={review} reviews={reviews} setReviews={setReviews} />;
          })}
        </div>
      </div>
    </>
  );
}
