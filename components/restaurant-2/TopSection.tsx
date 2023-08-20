import React from "react";

export default function TopSection({ restaurant }: any) {
  const locationBroad = restaurant.address_components.find((component: any) =>
    component.types.includes("administrative_area_level_4" || "administrative_area_level_3" || "administrative_area_level_2" || "administrative_area_level_1" || "country")
  ) || { short_name: "Unknown", long_name: "Unknown" };
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-darkGray text-xl">{restaurant.gofood_name}</p>
        <div className="bg-green flex items-center px-3 py-2 rounded gap-x-1">
          <p className="text-white font-semibold text-sm">{restaurant.rating}</p>
          <svg viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 -mt-[2px]">
            <path
              d="M8.36824 3.44812L5.88874 3.08777L4.78035 0.840702C4.75007 0.779178 4.70027 0.729374 4.63874 0.6991C4.48445 0.622928 4.29695 0.686405 4.2198 0.840702L3.1114 3.08777L0.631908 3.44812C0.563549 3.45789 0.501049 3.49012 0.453197 3.53894C0.395347 3.5984 0.363469 3.6784 0.364568 3.76135C0.365667 3.8443 0.399652 3.92342 0.459057 3.98133L2.253 5.73035L1.82917 8.20008C1.81923 8.25753 1.82559 8.31661 1.84753 8.37064C1.86946 8.42466 1.90609 8.47145 1.95326 8.50572C2.00044 8.53998 2.05627 8.56034 2.11443 8.56449C2.17258 8.56863 2.23074 8.5564 2.2823 8.52918L4.50007 7.36316L6.71785 8.52918C6.77839 8.5614 6.84871 8.57215 6.91609 8.56043C7.08601 8.53113 7.20027 8.37 7.17097 8.20008L6.74714 5.73035L8.54109 3.98133C8.58992 3.93348 8.62214 3.87098 8.63191 3.80262C8.65828 3.63172 8.53914 3.47351 8.36824 3.44812Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className="flex gap-x-2">
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-[2px]">
          <path
            d="M6 0C2.68286 0 0 2.504 0 5.6C0 9.8 6 16 6 16C6 16 12 9.8 12 5.6C12 2.504 9.31714 0 6 0ZM6 7.6C4.81714 7.6 3.85714 6.704 3.85714 5.6C3.85714 4.496 4.81714 3.6 6 3.6C7.18286 3.6 8.14286 4.496 8.14286 5.6C8.14286 6.704 7.18286 7.6 6 7.6Z"
            fill="#E63131"
          />
        </svg>
        <p className="font-medium text-sm text-lightGray">{locationBroad.short_name || locationBroad.long_name || "Unknown"}</p>
      </div>
      <div className="flex gap-x-1 overflow-hidden">
        {restaurant?.category.map((item: any, i: any, row: any) => {
          if (i + 1 === row.length) {
            return (
              <p className="text-lightGray font-medium flex-none text-opacity-70 text-xs" key={i}>
                {item}
              </p>
            );
          } else {
            return (
              <p className="text-lightGray font-medium flex-none text-opacity-70 text-xs" key={i}>
                {item},
              </p>
            );
          }
        })}
      </div>
      <div className="flex font-semibold gap-x-6">
        <button className="bg-customRed-600 flex justify-center gap-x-2 text-white w-1/2 py-2 rounded-lg text-sm">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-[2px]">
            <path
              d="M9.91668 9.16669H4.91668M6.58334 12.5H4.91668M11.5833 5.83335H4.91668M14.9167 5.66669V14.3334C14.9167 15.7335 14.9167 16.4336 14.6442 16.9683C14.4045 17.4387 14.0221 17.8212 13.5517 18.0609C13.0169 18.3334 12.3168 18.3334 10.9167 18.3334H5.58334C4.18321 18.3334 3.48315 18.3334 2.94837 18.0609C2.47796 17.8212 2.09551 17.4387 1.85583 16.9683C1.58334 16.4336 1.58334 15.7335 1.58334 14.3334V5.66669C1.58334 4.26656 1.58334 3.56649 1.85583 3.03171C2.09551 2.56131 2.47796 2.17885 2.94837 1.93917C3.48315 1.66669 4.18321 1.66669 5.58334 1.66669H10.9167C12.3168 1.66669 13.0169 1.66669 13.5517 1.93917C14.0221 2.17885 14.4045 2.56131 14.6442 3.03171C14.9167 3.56649 14.9167 4.26656 14.9167 5.66669Z"
              stroke="white"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Menu
        </button>
        <button className="bg-customRed-50 flex justify-center gap-x-2 text-customRed-700 w-1/2 py-2 rounded-lg text-sm">
          <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-[2px]">
            <path
              d="M17.2497 8.58333C17.2497 12.4953 14.0784 15.6667 10.1664 15.6667C9.26904 15.6667 8.4107 15.4998 7.62065 15.1954C7.47621 15.1398 7.40398 15.112 7.34655 15.0987C7.29006 15.0857 7.24917 15.0803 7.19124 15.0781C7.13234 15.0758 7.06773 15.0825 6.93849 15.0958L2.67097 15.537C2.26411 15.579 2.06067 15.6001 1.94067 15.5269C1.83615 15.4631 1.76496 15.3566 1.746 15.2356C1.72425 15.0968 1.82146 14.9168 2.01589 14.557L3.37893 12.034C3.49119 11.8262 3.54731 11.7223 3.57273 11.6225C3.59784 11.5238 3.60391 11.4527 3.59588 11.3512C3.58775 11.2484 3.54266 11.1147 3.4525 10.8472C3.2129 10.1363 3.08302 9.375 3.08302 8.58333C3.08302 4.67132 6.25434 1.5 10.1664 1.5C14.0784 1.5 17.2497 4.67132 17.2497 8.58333Z"
              stroke="#A32323"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Review
        </button>
      </div>
    </div>
  );
}
