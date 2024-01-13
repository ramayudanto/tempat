import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function RecentSearch({ data, setSearchQuery, insert }: any) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {data.map((item: any, i: any) => {
        return (
          <p
            key={i}
            onClick={() => {
              setSearchQuery(item);
              insert(item);
              router.push(`/search?q=${item}`, undefined, { shallow: true });
            }}
            className="rounded-full font-medium text-xs text-gray-700 border-gray-200 border-[1px]  px-4 py-2 cursor-pointer"
          >
            {item}
          </p>
        );
      })}
    </div>
  );
}
