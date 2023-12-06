import Image from "next/image";
import React from "react";

export default function CategoryImage({ images }: any) {
  function combineImage(arr1: any[]) {
    const firstArrayElements = Math.min(arr1.length, 4);
    const arr2 = [
      "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/asset/empty-state-svg.svg",
      "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/asset/empty-state-svg.svg",
      "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/asset/empty-state-svg.svg",
      "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/asset/empty-state-svg.svg",
    ];
    // Use the spread operator to take elements from the first array
    // and concatenate with the appropriate number of elements from the second array
    const combinedArray: any[] = [...arr1.slice(0, firstArrayElements), ...arr2.slice(0, 4 - firstArrayElements)];

    return combinedArray;
  }

  return (
    <div className="flex overflow-x-scroll overflow-y-hidden gap-4 -mx-4 pl-4">
      {combineImage(images).map((image: any, i: any) => {
        return (
          <div className="w-[135px] h-[87px] relative" key={i}>
            <Image src={image} width={135} height={87} alt={i} layout="fixed" objectFit="cover" className="rounded" />
          </div>
        );
      })}
    </div>
  );
}
