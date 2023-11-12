import Image from "next/image";
import React from "react";

export default function CategoryImage({ images }: any) {
  return (
    <div className="flex overflow-x-scroll overflow-y-hidden gap-4 -mx-4 pl-4">
      {images.map((image: any, i: any) => {
        return (
          <div className="w-[135px] h-[87px] relative" key={i}>
            <Image src={image} width={135} height={87} alt={i} layout="fixed" objectFit="cover" className="rounded" />
          </div>
        );
      })}
      {[1, 2, 3, 4, 5, 6].map((i: any) => {
        return (
          <div className="w-[135px] h-[87px] relative" key={i}>
            <Image src={"https://tempatapp.sgp1.cdn.digitaloceanspaces.com/asset/empty%20state%20photo.svg"} width={135} height={87} alt={i} key={i} layout="fixed" objectFit="cover" className="rounded" />
          </div>
        );
      })}
    </div>
  );
}
