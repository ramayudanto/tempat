import Image from "next/image";
import React, { useContext } from "react";
import { openTimeLogic } from "../../lib/logic";
import IconedInformation from "./IconedInformation";
import { ActiveSectionContext } from "../../pages/restos/[routeName]";

export default function DetailedInformation({ restaurant }: any) {
  const { aboutRef } = useContext(ActiveSectionContext);

  return (
    <div className="space-y-4">
      <p className="text-[#333] font-semibold text-sm">About the restaurant</p>
      <div className="w-full h-[25vh] relative overflow-hidden rounded">
        <Image src={restaurant.thumbnail} alt={restaurant.gofood_name} layout="fill" objectFit="cover" />
      </div>
      <IconedInformation restaurant={restaurant} />
      <p ref={aboutRef} className="text-customRed-600 text-xs ml-5">
        View all outlets of this restaurant
      </p>
    </div>
  );
}
