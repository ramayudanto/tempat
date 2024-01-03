import Link from "next/link";
import { recentRestaurantHandler, translatePriceRange, translateToK, truncate } from "../../lib/logic";
import { captureEvent } from "../../lib/posthog";
import RibbonCard from "../design-system/RibbonCard";
import { useEffect, useState } from "react";

export default function RestoOfTheDay() {
  const [restaurant, setRestaurant] = useState<any | null>();
  // const locationBroad = restaurant.address_components.find((component: any) =>
  //   component.types.includes("administrative_area_level_4" || "administrative_area_level_3" || "administrative_area_level_2" || "administrative_area_level_1" || "country")
  // ) || { short_name: "Unknown", long_name: "Unknown" };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/ROTD?q=ChIJo5eF4tHxaS4Ra8ku0fPH-4o");
      const data = await res.json();
      setRestaurant(data);
    };
    fetchData();
  }, []);

  if (!restaurant) return <></>;
  else {
    return (
      <Link href={`/restos/${restaurant.place_id}`}>
        <a
          className=""
          onClick={() => {
            recentRestaurantHandler(restaurant);
            captureEvent("view restaurant", {
              "restaurant name": restaurant.gofood_name || restaurant.name,
              category: restaurant.categories,
              origin: "home page",
            });
          }}
        >
          <div className="px-4 py-8 mt-6 bg-slate-100">
            <RibbonCard />
            <div className="space-y-1 bg-white overflow-hidden rounded-lg shadow-sm border-[1px] border-slate-200 relative z-10">
              <div className="bg-cover bg-center h-[175px] rounded-t-lg" style={{ backgroundImage: `url(${restaurant.thumbnail})` }}>
                {/* {session && <BookmarkButton isBookmarked={isBookmakred} bookmarkHandler={() => {}} />} */}
                {/* <div className="flex px-[0.5rem] py-1 font-semibold items-center justify-center text-xs bg-white opacity-75 absolute bottom-2 right-3 rounded-full">
              <p>2.0 Km</p>
            </div> */}
              </div>
              <div className="p-4 space-y-1">
                <div className="flex gap-x-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.5 5C1.5 2.51472 3.51472 0.5 6 0.5C8.48528 0.5 10.5 2.51472 10.5 5C10.5 6.26309 9.92658 7.37012 9.14614 8.38351C8.49398 9.23032 7.65917 10.0579 6.82532 10.8845L6.82473 10.8851C6.66723 11.0412 6.50976 11.1973 6.35355 11.3536C6.15829 11.5488 5.84171 11.5488 5.64645 11.3536C5.49013 11.1972 5.3322 11.0407 5.17458 10.8844C4.34073 10.0578 3.50602 9.23032 2.85386 8.38351C2.07342 7.37012 1.5 6.26309 1.5 5ZM7.5 5C7.5 5.82843 6.82843 6.5 6 6.5C5.17157 6.5 4.5 5.82843 4.5 5C4.5 4.17157 5.17157 3.5 6 3.5C6.82843 3.5 7.5 4.17157 7.5 5Z"
                      fill="#D12D2D"
                    />
                  </svg>
                  {/* <p className="text-xs text-lightGray">{truncate(locationBroad.short_name || locationBroad.long_name, 17)}</p> */}
                </div>
                <div className="flex justify-between">
                  <p className="font-bold text-darkGray text-base">{truncate(restaurant.gofood_name, 36)}</p>
                  <div className="flex items-center gap-x-1 bg-green py-1 px-2 rounded-md">
                    <p className="text-xs text-white font-bold">{(restaurant.ratingSum / restaurant.ratingCount).toFixed(1)}</p>
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-[1px]">
                      <path
                        d="M8.8682 3.44812L6.38871 3.08777L5.28031 0.840702C5.25003 0.779178 5.20023 0.729374 5.13871 0.6991C4.98441 0.622928 4.79691 0.686405 4.71976 0.840702L3.61136 3.08777L1.13187 3.44812C1.06351 3.45789 1.00101 3.49012 0.953159 3.53894C0.895309 3.5984 0.863431 3.6784 0.864529 3.76135C0.865628 3.8443 0.899614 3.92342 0.959018 3.98133L2.75296 5.73035L2.32914 8.20008C2.3192 8.25753 2.32555 8.31661 2.34749 8.37064C2.36942 8.42466 2.40605 8.47145 2.45323 8.50572C2.5004 8.53998 2.55623 8.56034 2.61439 8.56449C2.67255 8.56863 2.7307 8.5564 2.78226 8.52918L5.00003 7.36316L7.21781 8.52918C7.27835 8.5614 7.34867 8.57215 7.41605 8.56043C7.58597 8.53113 7.70023 8.37 7.67093 8.20008L7.2471 5.73035L9.04105 3.98133C9.08988 3.93348 9.1221 3.87098 9.13187 3.80262C9.15824 3.63172 9.0391 3.47351 8.8682 3.44812Z"
                        fill="#fff"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex gap-x-1">
                  <div className="">
                    {restaurant.categories.length !== 0 ? (
                      restaurant.categories.map((item: any, i: any, row: any) => {
                        if (i + 1 === row.length) {
                          return (
                            <p className="text-lightGray flex-none text-xs" key={i}>
                              {item.name}
                            </p>
                          );
                        } else {
                          return (
                            <p className="text-lightGray flex-none text-xs" key={i}>
                              {item.name},
                            </p>
                          );
                        }
                      })
                    ) : (
                      <p className="text-darkGray flex-none text-opacity-70 text-xs">Unknown</p>
                    )}
                  </div>
                  <p className="text-lightGray flex-none text-xs">|</p>
                  <p className=" text-lightGray text-xs">{translatePriceRange(restaurant.price_level)}</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    );
  }
}
