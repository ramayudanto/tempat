import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function RecentSearch({ data, searchRef }: any) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {data.map((item: any, i: any) => {
        return (
          <div
            key={i}
            onClick={() => {
              searchRef.current.value = item;
              router.push(`/search?q=${item}`, undefined, { shallow: true });
            }}
          >
            <p className="rounded-full font-medium bg-darkGray bg-opacity-10 px-4 py-2">{item}</p>
          </div>
        );
      })}
    </div>
  );
}
