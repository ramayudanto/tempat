import { Category } from "@prisma/client";
import React from "react";

export default function CategoryHero({ category }: { category: Category }) {
  const containerStyle = {
    // backgroundImage: `url("/categoryHeader/${name}.png")`,
    backgroundImage: `url("${category.header}")`,
    backgroundSize: "cover",
  };
  return (
    <div className="h-[200px] mx-auto bg-right relative top-0 w-screen max-w-[420px]" style={containerStyle}>
      <div className="pt-3 absolute bg-white z-20 -bottom-[1px] w-full rounded-t-xl" />
      <div className="bg-black w-full h-full bg-opacity-[0.33] flex pl-3 flex-col justify-end pb-10 space-y-3 text-white">
        <p className="font-semibold text-lg">{category.name}</p>
        <p className="text-sm">{category.description ? category.description : "Most-loved & highly-reviewed restaurant, by and for Jakartans!"}</p>
      </div>
    </div>
  );
}
