import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import SearchBar from "../SearchBar";
import MostSearched from "./MostSearched";
import RecentSearchQuery from "./RecentSearchQuery";
import SearchResult from "./SearchResult";
import { decryptLocalStorage, encryptAES } from "../../lib/logic";
import RecentSearchCard from "./RecentSearchCard";
import RestaurantCard from "../MainPage/RestaurantCard";
import { captureEvent } from "../../lib/posthog";
import useDebounce from "../../lib/useDebounce";

export default function Search({ fourCategories }: any) {
  const [recentSearch, setRecentSearch] = useState<any[]>([]);
  const [recentSearchRestaurant, setRecentSearchRestaurant] = useState<any[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const debouncedText = useDebounce(searchQuery, 600);
  useEffect(() => {
    const query = JSON.parse(decryptLocalStorage("recentSearchQuery") || "[]");
    const restaurant = JSON.parse(decryptLocalStorage("recentSearchRestaurant") || "[]");
    setRecentSearch(query);
    setRecentSearchRestaurant(restaurant);
  }, []);

  const insertRecentQuery = (query: string) => {
    const trimmedQuery = query.trim();
    let recent = recentSearch.filter((item: string) => item !== trimmedQuery);
    recent = [trimmedQuery, ...recent];
    if (recent.length > 6) {
      recent.pop();
    }
    setRecentSearch(recent);
    localStorage.setItem("recentSearchQuery", encryptAES(JSON.stringify(recent)));
  };
  useEffect(() => {
    if (debouncedText === "") {
      router.push("/search", undefined, { shallow: true });
      return;
    }
    insertRecentQuery(debouncedText);
    router.push(`/search?q=${debouncedText}`, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);

  return (
    <div className="w-screen transition-all pt-10 px-4 pb-24 overflow-x-hidden overflow-y-scroll min-h-screen mx-auto bg-white max-w-[420px]">
      {!searchQuery && <p className="text-3xl font-semibold text-darkGray mb-6">Cari</p>}
      <div className="flex gap-x-2  items-center mb-4">
        {searchQuery && (
          <button
            className="flex w-9 h-9 justify-center items-center gap-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-2 rounded-[1000px]"
            onClick={() => {
              setSearchQuery("");
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      </div>
      {!searchQuery ? (
        <>
          {recentSearch.length !== 0 && (
            <>
              <p className="font-semibold text-sm mb-2 text-slate-700">Pencarian terakhir</p>
              <RecentSearchQuery insert={insertRecentQuery} setSearchQuery={setSearchQuery} data={recentSearch} />
            </>
          )}
          {recentSearchRestaurant.length !== 0 && (
            <>
              <p className="font-semibold text-sm mb-2 text-slate-700">Yang sempet kamu lihat</p>
              <div className={`flex overflow-x-scroll gap-2`}>
                {recentSearchRestaurant.map((restaurant: any, i: number) => {
                  // return <RecentSearchCard key={i} restaurant={restaurant} />;
                  return <RestaurantCard key={i} restaurant={restaurant} />;
                })}
              </div>
            </>
          )}
          <MostSearched fourCategories={fourCategories} />
          {/* <div className="h-[80px]" ></div> */}
        </>
      ) : (
        <SearchResult query={router.query.q} />
      )}
    </div>
  );
}
