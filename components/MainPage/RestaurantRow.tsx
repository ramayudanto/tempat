import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import SkeletonCardRow from "../Skeleton/SkeletonCardRow";

export default function RestaurantRow({ restaurants, title, search }: any) {
  const [data, setData] = useState<any[]>(restaurants || []);
  const router = useRouter();
  // const fetchData = async () => {
  //   const res = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/getCategories?category=${search}`)).json();
  //   setData(res);
  // };

  // useEffect(() => {
  //   if (!search) return;
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return data.length == 0 ? (
    <SkeletonCardRow />
  ) : (
    <div className="text-darkGray px-4 space-y-4 my-10">
      <div className="flex justify-between mb-2 items-center">
        <p className="font-semibold text-base">{title}</p>
        <p
          className="text-customRed-500 font-semibold text-xs cursor-pointer"
          onClick={() => {
            if (!search) return;
            router.push(`/category/${search}`, undefined, { shallow: true });
          }}
        >
          See all
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
