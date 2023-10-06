import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function RecentSearch({ data, searchRef, insert }: any) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {data.map((item: any, i: any) => {
        return (
          <p
            key={i}
            onClick={() => {
              searchRef.current.value = item;
              insert();
              router.push(`/search?q=${item}`, undefined, { shallow: true });
            }}
            className="rounded-full font-regular text-xs bg-darkGray bg-opacity-10 px-4 py-2 cursor-pointer"
          >
            {item}
          </p>
        );
      })}
    </div>
  );
}
