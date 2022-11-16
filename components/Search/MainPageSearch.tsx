import React from "react";
import CategoryCard from "../CategoryPage/CategoryCard";

export default function MainPageSearch({ data, isLoading }: any) {
  if (!isLoading) {
    return (
      <div className="border-[1px] p-3 absolute mx-auto right-0 w-[90%] bg-white rounded-md left-0 z-[100] top-[105px]">
        <div className="flex flex-col gap-y-3">
          {data.map((restaurant: any, i: any, row: any) => {
            if (i + 1 === row.length) {
              return <CategoryCard key={i} restaurant={restaurant} isLast={true} />;
            } else {
              return <CategoryCard key={i} restaurant={restaurant} isLast={false} />;
            }
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="border-[1px] p-3 absolute mx-auto right-0 w-[90%] bg-white rounded-md left-0 z-[100] top-[105px]">
        <p className="text-center">Loading</p>
      </div>
    );
  }
}
