import React from "react";

export default function HeaderSection({ setIsGalleryOpen, restaurant }: any) {
  const { name } = restaurant;
  return (
    <div className="flex justify-between mt-12 items-center mx-4">
      <button
        onClick={() => {
          setIsGalleryOpen(false);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <div className="text-center text-darkGray -space-y-1">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm">Photos</p>
      </div>
      <div className="text-lightRed font-medium">
        <p>Add</p>
      </div>
    </div>
  );
}
