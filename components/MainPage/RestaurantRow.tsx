import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import SkeletonCardRow from "../Skeleton/SkeletonCardRow";
import { RestaurantV2 } from "@prisma/client";

export default function RestaurantRow({ restaurants, title, search }: { restaurants: RestaurantV2[] | any[]; title: string; search: string | null }) {
  const [data, setData] = useState<any[]>(restaurants || []);
  const router = useRouter();
  const fetchData = async () => {
    const res = await (await fetch(`/api/getCategories?q=${search}`)).json();
    setData(res);
  };
  useEffect(() => {
    if (!search) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data.length == 0 ? (
    <SkeletonCardRow />
  ) : (
    <div className="text-darkGray px-4 space-y-4 pt-[36px]">
      <div className="flex justify-between mb-2 items-center">
        <p className="font-semibold text-sm">{title}</p>
        <p
          className="text-customRed-500 font-semibold text-xs cursor-pointer"
          onClick={() => {
            if (!search) return;
            router.push(`/category/${search}`, undefined, { shallow: true });
          }}
        >
          {/* Lihat Semua */}
        </p>
      </div>
      <div className={`flex overflow-x-scroll gap-x-2 pl-4 -mx-4`}>
        {data.map((restaurant: any, i: number) => {
          return <RestaurantCard key={i} restaurant={restaurant} />;
        })}
      </div>
    </div>
  );
}
