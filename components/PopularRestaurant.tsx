import Image from "next/image";
import React from "react";
import RestaurantCard from "./RestaurantCard";

export default function PopularRestaurant({ restaurants, reverse }: any) {
  return (
    <div className="mx-5 mb-5">
      <div className="flex justify-between mb-2">
        <p className="font-semibold text-darkGray text-sm">Popular restaurants around you</p>
        <p className="text-lightRed text-xs font-medium">See all</p>
      </div>
      <div className={`flex overflow-scroll gap-4 ${reverse ? "flex-row-reverse" : ""}`}>
        {restaurants.map((restaurant: any, i: number) => {
          return <RestaurantCard key={i} restaurant={restaurant} />;
        })}
      </div>
    </div>
  );
}
