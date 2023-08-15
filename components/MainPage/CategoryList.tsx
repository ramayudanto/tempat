/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getRandomElementsFromArray } from "../../lib/logic";

export default function CategoryList({ category: categories }: any) {
  const [randomized, setRandomized] = useState<any[]>([]);
  useEffect(() => {
    const randomizedCategories = getRandomElementsFromArray(categories, 8);
    setRandomized(randomizedCategories);
  }, []);
  return (
    <div className="pt-10 px-4 flex flex-wrap justify-around">
      {randomized &&
        randomized.map((category: any, i: number) => {
          return (
            <Link href={`/`} key={i}>
              <a className="p-2 flex space-y-2 flex-col items-center justify-around">
                {/* <Image src={`/category/${category.categoryName}.svg`} width={10} height={20} alt={category.categoryName} /> */}
                <Image src={`/category/Japanese.svg`} width={30} height={30} alt={category.categoryName} />
                <p className="font-medium text-center text-xs text-[#364152]">{category.categoryName}</p>
              </a>
            </Link>
          );
        })}
    </div>
  );
}
