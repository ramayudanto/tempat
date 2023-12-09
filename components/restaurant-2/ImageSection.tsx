import Image from "next/image";
import { useRouter } from "next/router";
import { ActiveSectionContext } from "../../pages/restos/[routeName]";
import { useContext, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import AddBookmarkToast from "../../components/Toasts/AddBookmarkToast";
import DeleteBookmarkToast from "../../components/Toasts/DeleteBookmarkToast";
import BookmarkModal from "../modal/BookmarkModal";
import { AnimatePresence } from "framer-motion";
import { captureEvent } from "../../lib/posthog";

export default function ImageSection({ thumbnail, restaurant }: any) {
  const session = useSession();
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState<boolean>(false);
  const containerStyle = {
    backgroundImage: 'url("/placeholder.png")',
    backgroundSize: "cover",
  };
  const router = useRouter();
  const { aboutDivRef } = useContext(ActiveSectionContext);
  const [isBookmakred, setIsBookmarked] = useState<boolean>(
    restaurant?.bookmarkedBy.map((item: any) => {
      if (item.email === session?.data?.user?.email) {
        return true;
      } else {
        return false;
      }
    })[0]
  );

  function combineImage(arr1: any[]) {
    const firstArrayElements = Math.min(arr1.length, 4);
    const arr2 = [
      "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/asset/empty-state-svg.svg",
      "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/asset/empty-state-svg.svg",
      "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/asset/empty-state-svg.svg",
      "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/asset/empty-state-svg.svg",
    ];
    // Use the spread operator to take elements from the first array
    // and concatenate with the appropriate number of elements from the second array
    const combinedArray: any[] = [...arr1.slice(0, firstArrayElements), ...arr2.slice(0, 4 - firstArrayElements)];

    return combinedArray;
  }

  const bookmarkHandler = async () => {
    if (!session?.data?.user?.email) {
      setIsBookmarkModalOpen(true);
      return;
    }
    if (isBookmakred) {
      try {
        await fetch(`/api/deleteBookmark`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            place_id: restaurant?.place_id,
          }),
        });
        captureEvent("add bookmark", {
          "restaurant name": restaurant?.gofood_name || restaurant?.name,
        });
        deleteToastRef.current!.show();
        setIsBookmarked(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await fetch(`/api/setBookmark`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            place_id: restaurant?.place_id,
          }),
        });
        captureEvent("remove bookmark", {
          "restaurant name": restaurant?.gofood_name || restaurant?.name,
          origin: "restaurant page",
        });
        addToastRef.current!.show();
        setIsBookmarked(true);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const addToastRef = useRef<any>(null);
  const deleteToastRef = useRef<any>(null);

  return (
    <div ref={aboutDivRef} className="relative">
      <AddBookmarkToast ref={addToastRef} />
      <DeleteBookmarkToast ref={deleteToastRef} />

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isBookmarkModalOpen && (
          <BookmarkModal
            closeModal={() => {
              setIsBookmarkModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <div className="flex justify-between absolute top-5 z-20 w-[90%] left-0 right-0 mx-auto">
        <button
          className="p-[12px] bg-white rounded-full drop-shadow-xl"
          onClick={() => {
            router.back();
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 8H1M1 8L8 15M1 8L8 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="p-[10px] bg-white rounded-full drop-shadow-xl" onClick={bookmarkHandler}>
          {isBookmakred ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-darkRed">
              <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          )}
        </button>
      </div>
      <div className="">
        <div className="relative h-[400px] border-b-[1px]">
          <Image src={thumbnail} alt="test" layout="fill" objectFit="cover" loading="eager" />
        </div>
        <div className="flex">
          {combineImage(restaurant.Image).map((item: any, i: any, row: any) => {
            if (i + 1 === row.length) {
              // LAST ELEMENT
              return (
                <div
                  className="w-1/4 cursor-pointer flex items-center justify-center h-[10vh] bg-center relative border"
                  key={i}
                  style={{
                    backgroundImage: `url(${item})`,
                    backgroundSize: "cover",
                  }}
                  onClick={() => {
                    captureEvent("View Gallery See All button");
                    const path = router.asPath;
                    router.push(`${path}?view=gallery`, undefined, { shallow: true });
                  }}
                >
                  <div className="bg-black bg-opacity-40 flex items-center justify-center absolute w-full h-full">
                    <p className="text-white text-xs font-semibold">Lihat Semua</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="relative w-1/4 h-[10vh] border"
                  key={i}
                  onClick={() => {
                    const path = router.asPath;
                    router.push(`${path}?view=gallery`, undefined, { shallow: true });
                  }}
                >
                  <Image src={item} alt="placeholder" layout="fill" objectFit="cover" />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
