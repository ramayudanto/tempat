import Image from "next/image";
import { useRouter } from "next/router";
import CameraIcon from "../../public/cameraIcon.svg";
import BookmarkIcon from "../../public/bookmarkIcon.svg";
import ShareIcon from "../../public/shareIcon.svg";
import { useState } from "react";

export default function TopButtons({ user, restaurant }: any) {
  const { routeName, userBookmark } = restaurant;
  // console.log(user);
  const [isBookmakred, setIsBookmarked] = useState<boolean>(
    userBookmark.map((item: any) => {
      if (item.email === user?.email) {
        return true;
      } else {
        return false;
      }
    })
  );

  const router = useRouter();

  const bookmarkHandler = (e: any) => {
    if (isBookmakred) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/deleteBookmark`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          routeName,
        }),
      });
      setIsBookmarked(false);
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/setBookmark`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          routeName,
        }),
      });
      setIsBookmarked(true);
    }
  };

  return (
    <div className="flex justify-between items-center pt-10 mb-7">
      <button onClick={router.back}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <div className="flex gap-x-4 items-center">
        <button>
          <CameraIcon />
        </button>
        {user && (
          <button className="p-2 flex items-center justify-center bg-white rounded-full right-4 top-2 absolute z-20" onClick={bookmarkHandler}>
            {isBookmakred ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-darkRed">
                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            )}
          </button>
        )}
        <ShareIcon />
      </div>
    </div>
  );
}
