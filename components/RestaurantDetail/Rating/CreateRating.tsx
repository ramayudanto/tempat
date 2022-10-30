import { FormEvent, useRef, useState } from "react";
import Toast from "../../Toast";
import RatingForm from "./RatingForm";

const stars = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export default function CreateRating({ cancel, restaurantId }: any) {
  const [currentRate, setCurrentRate] = useState(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const toastRef = useRef<any>(null);

  const submitRating = (e: FormEvent) => {
    e.preventDefault();
    if (!currentRate) return;
    toastRef.current!.show();
    fetch("https://dummyjson.com/products/1").then(() => {
      setCurrentRate(null);
      commentRef.current!.value = "";
      userNameRef.current!.value = "";
      // cancel();
    });
    // fetch(`${window.location.origin}/api/postReview`, {
    //   body: JSON.stringify({
    //     restaurantId,
    //     rate: Number(currentRate),
    //     user: userNameRef.current!.value,
    //     comment: commentRef.current!.value,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // }).then(() => {
    //   toastRef.current!.show();
    //   setCurrentRate(null);
    //   commentRef.current!.value = "";
    //   userNameRef.current!.value = "";
    //   cancel();
    // });
  };
  return (
    <div className="mt-10 animate-fade">
      <div className="flex space-x-1 mb-2">
        {stars.map((item: any, i: number) => {
          return (
            <div
              key={i}
              onClick={() => {
                if (currentRate === 1 && currentRate === item.id) setCurrentRate(null);
                if (currentRate === item.id) return;
                setCurrentRate(item.id);
              }}
            >
              {
                // @ts-ignore: Object is possibly 'null'.
                currentRate >= item.id ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-darkRed">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-darkRed">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                )
              }
            </div>
          );
        })}
      </div>
      <RatingForm userNameRef={userNameRef} commentRef={commentRef} submitRating={submitRating} />
      <p onClick={cancel} className={`text-darkRed cursor-pointer text-center border-t-2 mt-10 pt-2`}>
        Cancel
      </p>
      <Toast message={"Review posted!"} ref={toastRef} />
    </div>
  );
}
