import React, { createContext, useEffect, useState } from "react";
import CategoryCard from "../CategoryPage/CategoryCard";
import FilterPage from "./Filter/FilterPage";
import { useRouter } from "next/router";
import { captureEvent } from "../../lib/posthog";

export const FilterContext = createContext(null as any);

export default function SearchResult({ query }: any) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<any>({});
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [highestPrice, setHighestPrice] = useState<Number>(0);
  const router = useRouter();
  const routePath = router.asPath.split("/")[1];

  const fetchData = async () => {
    const res = await (await fetch(`/api/getSearch?q=${query}`)).json();
    setData(res);
    captureEvent("search", { origin: "search page", "search query": query });
    setIsLoading(false);
  };

  useEffect(() => {
    if (Object.keys(filter).length === 0) return;

    const filtered = data.filter((item: any) => Number(item.priceRange) <= filter.price);
    setData(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (!query) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // useEffect(() => {
  //   if (data.length === 0) return;
  //   setHighestPrice(
  //     Math.max(
  //       ...data.map((item) => {
  //         return Number(item.priceRange.match(/\d/g).join(""));
  //       })
  //     )
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);

  if (!isLoading) {
    if (data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center text-2xl">Tidak ada hasil</p>
        </div>
      );
    } else {
      return (
        <>
          {/* <div className="flex items-center gap-x-2 overflow-x-scroll mb-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="bg-darkGray bg-opacity-10 rounded-md p-1 shrink-0 cursor-pointer"
              onClick={() => {
                setIsFilterOpen(true);
              }}
            >
              <path
                opacity="0.4"
                d="M6.72217 8.46387H2.33849C1.78368 8.46387 1.33331 8.90634 1.33331 9.45142C1.33331 9.99577 1.78368 10.439 2.33849 10.439H6.72217C7.27698 10.439 7.72735 9.99577 7.72735 9.45142C7.72735 8.90634 7.27698 8.46387 6.72217 8.46387Z"
                fill="#200E32"
              />
              <path
                opacity="0.4"
                d="M14.6667 4.25245C14.6667 3.70809 14.2163 3.26562 13.6622 3.26562H9.27856C8.72374 3.26562 8.27338 3.70809 8.27338 4.25245C8.27338 4.79753 8.72374 5.24 9.27856 5.24H13.6622C14.2163 5.24 14.6667 4.79753 14.6667 4.25245Z"
                fill="#200E32"
              />
              <path d="M5.22946 4.25291C5.22946 5.12941 4.50687 5.83984 3.61473 5.83984C2.72311 5.83984 2 5.12941 2 4.25291C2 3.37693 2.72311 2.6665 3.61473 2.6665C4.50687 2.6665 5.22946 3.37693 5.22946 4.25291Z" fill="#200E32" />
              <path d="M13.311 9.4253C13.311 10.3013 12.5884 11.0117 11.6963 11.0117C10.8046 11.0117 10.0815 10.3013 10.0815 9.4253C10.0815 8.5488 10.8046 7.83838 11.6963 7.83838C12.5884 7.83838 13.311 8.5488 13.311 9.4253Z" fill="#200E32" />
            </svg>
  
            <p className="bg-darkGray bg-opacity-10 rounded-md py-1 px-2 font-medium w-max shrink-0 cursor-pointer text-sm">Rating 4+</p>
            <p className="bg-darkGray bg-opacity-10 rounded-md py-1 px-2 font-medium w-max shrink-0 cursor-pointer text-sm">Outdoor</p>
            <p className="bg-darkGray bg-opacity-10 rounded-md py-1 px-2 font-medium w-max shrink-0 cursor-pointer text-sm">Halal</p>
          </div> */}
          <div className="flex flex-col gap-y-4 pb-20">
            {data.map((restaurant: any, i: any, row: any) => {
              if (i + 1 === row.length) {
                return <CategoryCard routePath={routePath} i={i} key={i} restaurant={restaurant} isLast={true} />;
              } else {
                return <CategoryCard routePath={routePath} i={i} key={i} restaurant={restaurant} isLast={false} />;
              }
            })}
          </div>
          {isFilterOpen && (
            <FilterContext.Provider value={{ filter, setFilter, highestPrice, setIsFilterOpen }}>
              <FilterPage />
            </FilterContext.Provider>
          )}
        </>
      );
    }
  } else {
    return (
      <>
        <p className="text-center">sedang mencari...</p>
      </>
    );
  }
}
