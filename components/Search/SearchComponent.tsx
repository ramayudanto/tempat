import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import SearchBar from "../SearchBar";
import MostSearched from "./MostSearched";
import RecentSearchQuery from "./RecentSearchQuery";
import SearchResult from "./SearchResult";
import { decryptLocalStorage, encryptLocalStorage } from "../../lib/logic";
import RecentSearchCard from "./RecentSearchCard";
import RestaurantCard from "../MainPage/RestaurantCard";

export default function Search({ fourCategories }: any) {
  const [recentSearch, setRecentSearch] = useState<any[]>([]);
  const [recentSearchRestaurant, setRecentSearchRestaurant] = useState<any[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const query = JSON.parse(decryptLocalStorage("recentSearchQuery") || "[]");
    const restaurant = JSON.parse(decryptLocalStorage("recentSearchRestaurant") || "[]");
    setRecentSearch(query);
    setRecentSearchRestaurant(restaurant);
  }, []);

  const insertRecentQuery = () => {
    if (!recentSearch.some((item: string) => item === searchRef.current?.value!)) {
      const recent = [searchRef.current?.value!, ...recentSearch];
      setRecentSearch(recent);
      localStorage.setItem("recentSearchQuery", encryptLocalStorage(JSON.stringify(recent)));
    } else {
      const filtered = recentSearch.filter((item: string) => item !== searchRef.current?.value!);
      const recent = [searchRef.current?.value!, ...filtered];
      setRecentSearch(recent);
      localStorage.setItem("recentSearchQuery", encryptLocalStorage(JSON.stringify(recent)));
    }
  };

  const searchSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (searchRef.current?.value! === "") {
      router.push("/search");
      return;
    }

    insertRecentQuery();

    router.push(`/search?q=${searchRef.current?.value!}`, undefined, { shallow: true });
  };

  return (
    <div className="w-screen pt-10 px-4 pb-4 overflow-x-hidden overflow-y-scroll h-screen mx-auto bg-white max-w-[420px]">
      {!router.query.q && <p className="text-3xl font-semibold text-darkGray mb-6">Cari</p>}
      <div className="flex gap-x-2  items-center mb-4 ">
        {router.query.q && (
          <button
            onClick={() => {
              router.push("/search", undefined, { shallow: true });
              searchRef.current!.focus();
              searchRef.current!.value = "";
            }}
          >
            <svg viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[36px] h-[36px] p-2 bg-darkRed rounded-full shrink-0">
              <path
                d="M11.0114 0.997315C10.3599 0.334228 9.30752 0.334228 8.65604 0.997315L0.988609 8.80136C0.33713 9.46445 0.33713 10.5356 0.988609 11.1987L8.65604 19.0027C9.30752 19.6658 10.3599 19.6658 11.0114 19.0027C11.6629 18.3396 11.6629 17.2685 11.0114 16.6054L4.53001 9.99152L11.0114 3.39463C11.6629 2.73154 11.6462 1.6434 11.0114 0.997315Z"
                fill="white"
              />
            </svg>
          </button>
        )}
        <SearchBar q={router.query.q} handler={searchSubmitHandler} searchRef={searchRef} />
      </div>
      {!router.query.q ? (
        <>
          {recentSearch.length !== 0 && (
            <>
              <p className="font-semibold text-sm mb-2">Pencarian terakhir</p>
              <RecentSearchQuery insert={insertRecentQuery} searchRef={searchRef} data={recentSearch} />
            </>
          )}
          {recentSearchRestaurant.length !== 0 && (
            <>
              <p className="font-semibold text-sm mb-2">Terakhir kamu liat</p>
              <div className={`flex overflow-x-scroll gap-2`}>
                {recentSearchRestaurant.map((restaurant: any, i: number) => {
                  // return <RecentSearchCard key={i} restaurant={restaurant} />;
                  return <RestaurantCard key={i} restaurant={restaurant} />;
                })}
              </div>
            </>
          )}
          <MostSearched fourCategories={fourCategories} />
        </>
      ) : (
        <SearchResult query={router.query.q} />
      )}
    </div>
  );
}
