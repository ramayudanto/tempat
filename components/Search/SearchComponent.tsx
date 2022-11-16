import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import SearchBar from "../SearchBar";
import MostSearched from "./MostSearched";
import RecentSearchQuery from "./RecentSearchQuery";
import RecentSearchRestaurant from "./RecentSearchRestaurant";
import SearchResult from "./SearchResult";
import { decryptLocalStorage, encryptLocalStorage } from "../../lib/logic";

export default function Search() {
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

  const searchSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (searchRef.current?.value! === "") {
      router.push("/search");
      return;
    }

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

    router.push(`/search?q=${searchRef.current?.value!}`, undefined, { shallow: true });
  };

  return (
    <div className="mx-4 pt-8 pb-20">
      {!router.query.q && <p className="font-semibold text-2xl">Cari</p>}
      <SearchBar handler={searchSubmitHandler} searchRef={searchRef} />
      {!router.query.q ? (
        <>
          {recentSearch.length !== 0 && (
            <>
              <p className="font-semibold mb-2">Pencarian terakhir</p>
              <RecentSearchQuery searchRef={searchRef} data={recentSearch} />
            </>
          )}
          {recentSearchRestaurant.length !== 0 && (
            <>
              <p className="font-semibold mb-2">Terakhir kamu liat</p>
              <RecentSearchRestaurant data={recentSearchRestaurant} />
            </>
          )}
          <MostSearched />
        </>
      ) : (
        <SearchResult query={router.query.q} />
      )}
    </div>
  );
}
