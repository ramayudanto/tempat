import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import SkeletonCardRow from "../Skeleton/SkeletonCardRow";
import { RestaurantV2 } from "@prisma/client";

export default function RestaurantRow({ restaurants, title, searchCategory }: { restaurants: RestaurantV2[] | any[]; title: string; searchCategory: string | null }) {
  const [data, setData] = useState<any[]>(restaurants || []);
  const router = useRouter();
  const fetchData = async () => {
    const res = await (await fetch(`/api/getCategories?category=${searchCategory}`)).json();
    setData(res);
  };
  useEffect(() => {
    if (!searchCategory) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data.length == 0 ? (
    <SkeletonCardRow />
  ) : (
    <div className="text-darkGray px-4 space-y-4" >
      <div className="flex justify-between mb-2 items-center">
        <p className="font-semibold text-sm text-slate-700">{title}</p>
        {/* <p
          className="text-brandPrimary600 bg-red-50 px-2 py-1 rounded-full font-semibold text-[10px] cursor-pointer"
          onClick={() => {
            if (!searchCategory) return;
            router.push(`/category/${searchCategory}`, undefined, { shallow: true });
          }}
        >
          Lihat Semua
        </p> */}
      </div>
      <div className={`flex overflow-x-scroll gap-x-2 px-4 -mx-4`}>
        {data.map((restaurant: any, i: number) => {
          return <RestaurantCard key={i} restaurant={restaurant} />;
        })}
      </div>
    </div>
  );
}
