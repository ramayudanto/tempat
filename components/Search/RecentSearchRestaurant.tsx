import React from "react";
import RecentSearchCard from "./RecentSearchCard";

export default function RecentSearhRestaurant({ data }: any) {
  return (
    <div className={`flex overflow-x-scroll gap-4`}>
      {data.map((restaurant: any, i: number) => {
        return <RecentSearchCard key={i} restaurant={restaurant} />;
      })}
    </div>
  );
}
