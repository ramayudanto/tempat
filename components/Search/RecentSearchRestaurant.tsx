import React from "react";
import RestaurantCard from "../RestaurantCard";

export default function RecentSearhRestaurant({ data }: any) {
  return (
    <div className={`flex overflow-x-scroll gap-4`}>
      {data.map((restaurant: any, i: number) => {
        return <RestaurantCard key={i} restaurant={restaurant} />;
      })}
    </div>
  );
}
