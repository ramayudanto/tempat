import Link from "next/link";
import {
  isRestaurantOpen,
  recentRestaurantHandler,
  translatePriceRange,
  translateToK,
  truncate,
} from "../../lib/logic";
import { captureEvent } from "../../lib/posthog";
import RibbonCard from "../design-system/RibbonCard";

const demie = {
  id: 378,
  delivery: true,
  dine_in: true,
  formatted_address:
    "1, Como Park, Jl. Kemang Timur No.998, RT.4/RW.3, Bangka, Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730, Indonesia",
  formatted_phone_number: "0811-1833-643",
  gofood_name: "DEMIE, Kemang - Como Park",
  icon: null,
  icon_mask_base_uri: null,
  international_phone_number: "+62 811-1833-643",
  name: "DEMIE, Kemang - Como Park",
  permanently_closed: null,
  place_id: "ChIJo5eF4tHxaS4Ra8ku0fPH-4o",
  price_level: 1,
  rating: 4.6,
  reference: "ChIJo5eF4tHxaS4Ra8ku0fPH-4o",
  serves_breakfast: null,
  serves_brunch: null,
  serves_dinner: null,
  serves_lunch: null,
  serves_vegetarian_food: null,
  takeout: true,
  thumbnail:
    "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/Menu/Demie-Kemang/demie-kemang4.jpg",
  types: ["restaurant", "point_of_interest", "food", "establishment"],
  url: null,
  user_ratings_total: 787,
  vicinity: "Como Park, Jalan Kemang Timur No.998, RT.4/RW.3, Bangka",
  website: "https://www.instagram.com/demiebakmie/?hl=en",
  reservable: null,
  serves_beer: null,
  serves_wine: null,
  wheelchair_accessible_entrance: null,
  curbside_pickup: null,
  Image: [
    "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/thumbnail-asset/DEMIE%20Kemang.jpg",
    "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/Menu/Demie-Kemang/demie-kemang5.jpg",
    "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/resto/Demie-Tebet/demie-tebet6.jpg",
    "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/Menu/Demie-Kemang/demie-kemang7.jpg",
  ],
  categories: [
    {
      id: 7,
      name: "Mie",
      icon: "https://tempatapp.sgp1.digitaloceanspaces.com/category/Noodles.svg",
      header:
        "https://tempatapp.sgp1.digitaloceanspaces.com/category/Noodles-highres.jpg",
      description:
        "Mie favorit ada di sini! Pilih variasi mie favoritmu dan nikmati sensasi kelezatan yang tak terlupakan.",
    },
  ],
  opening_hours: {
    id: 213,
    monday: "8:00 AM – 9:00 PM",
    tuesday: "8:00 AM – 9:00 PM",
    wednesday: "8:00 AM – 9:00 PM",
    thursday: "8:00 AM – 9:00 PM",
    friday: "8:00 – 11:45 AM, 1:00 – 9:00 PM",
    saturday: "8:00 AM – 9:00 PM",
    sunday: "8:00 AM – 9:00 PM",
    restaurantId: 378,
  },
  address_components: [
    {
      id: 39,
      long_name: "Daerah Khusus Ibukota Jakarta",
      short_name: "Daerah Khusus Ibukota Jakarta",
      types: "administrative_area_level_1",
    },
    {
      id: 40,
      long_name: "Indonesia",
      short_name: "ID",
      types: "country",
    },
    {
      id: 49,
      long_name: "Kota Jakarta Selatan",
      short_name: "Kota Jakarta Selatan",
      types: "administrative_area_level_2",
    },
    {
      id: 89,
      long_name: "3",
      short_name: "3",
      types: "administrative_area_level_7",
    },
    {
      id: 117,
      long_name: "Bangka",
      short_name: "Bangka",
      types: "administrative_area_level_4",
    },
    {
      id: 128,
      long_name: "Kecamatan Mampang Prapatan",
      short_name: "Kec. Mampang Prpt.",
      types: "administrative_area_level_3",
    },
    {
      id: 164,
      long_name: "4",
      short_name: "4",
      types: "",
    },
    {
      id: 760,
      long_name: "Como Park",
      short_name: "Como Park",
      types: "point_of_interest",
    },
    {
      id: 769,
      long_name: "998",
      short_name: "998",
      types: "street_number",
    },
    {
      id: 779,
      long_name: "Jalan Kemang Timur",
      short_name: "Jl. Kemang Timur",
      types: "route",
    },
    {
      id: 139,
      long_name: "12730",
      short_name: "12730",
      types: "postal_code",
    },
  ],
};

export default function RestoOfTheDay() {
  const locationBroad = demie.address_components.find((component: any) =>
    component.types.includes(
      "administrative_area_level_4" ||
        "administrative_area_level_3" ||
        "administrative_area_level_2" ||
        "administrative_area_level_1" ||
        "country"
    )
  ) || { short_name: "Unknown", long_name: "Unknown" };

  return (
    <Link href={`/restos/${demie.place_id}`}>
      <a
        className=""
        onClick={() => {
          recentRestaurantHandler(demie);
          captureEvent("view restaurant", {
            "restaurant name": demie.gofood_name || demie.name,
            category: demie.categories,
            origin: "home page",
          });
        }}
      >
        <div className="px-4 py-8 mt-6 bg-slate-100">
          <RibbonCard />
          <div className="space-y-1 bg-white overflow-hidden rounded-lg shadow-sm border-[1px] border-slate-200 relative z-10">
            <div
              className="bg-cover bg-center h-[175px] rounded-t-lg"
              style={{ backgroundImage: `url(${demie.thumbnail})` }}
            >
              {/* {session && <BookmarkButton isBookmarked={isBookmakred} bookmarkHandler={() => {}} />} */}
              {/* <div className="flex px-[0.5rem] py-1 font-semibold items-center justify-center text-xs bg-white opacity-75 absolute bottom-2 right-3 rounded-full">
            <p>2.0 Km</p>
          </div> */}
            </div>
            <div className="p-4 space-y-1">
              <div className="flex gap-x-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 0C2.68286 0 0 2.504 0 5.6C0 9.8 6 16 6 16C6 16 12 9.8 12 5.6C12 2.504 9.31714 0 6 0ZM6 7.6C4.81714 7.6 3.85714 6.704 3.85714 5.6C3.85714 4.496 4.81714 3.6 6 3.6C7.18286 3.6 8.14286 4.496 8.14286 5.6C8.14286 6.704 7.18286 7.6 6 7.6Z"
                    fill="#E63131"
                  />
                </svg>
                <p className="text-xs text-lightGray">
                  {truncate(
                    locationBroad.short_name || locationBroad.long_name,
                    17
                  )}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold text-darkGray text-base">
                  {truncate(demie.gofood_name, 36)}
                </p>
                <div className="flex items-center gap-x-1 bg-green py-1 px-2 rounded-md">
                  <p className="text-xs text-white font-bold">{demie.rating}</p>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-[1px]"
                  >
                    <path
                      d="M8.8682 3.44812L6.38871 3.08777L5.28031 0.840702C5.25003 0.779178 5.20023 0.729374 5.13871 0.6991C4.98441 0.622928 4.79691 0.686405 4.71976 0.840702L3.61136 3.08777L1.13187 3.44812C1.06351 3.45789 1.00101 3.49012 0.953159 3.53894C0.895309 3.5984 0.863431 3.6784 0.864529 3.76135C0.865628 3.8443 0.899614 3.92342 0.959018 3.98133L2.75296 5.73035L2.32914 8.20008C2.3192 8.25753 2.32555 8.31661 2.34749 8.37064C2.36942 8.42466 2.40605 8.47145 2.45323 8.50572C2.5004 8.53998 2.55623 8.56034 2.61439 8.56449C2.67255 8.56863 2.7307 8.5564 2.78226 8.52918L5.00003 7.36316L7.21781 8.52918C7.27835 8.5614 7.34867 8.57215 7.41605 8.56043C7.58597 8.53113 7.70023 8.37 7.67093 8.20008L7.2471 5.73035L9.04105 3.98133C9.08988 3.93348 9.1221 3.87098 9.13187 3.80262C9.15824 3.63172 9.0391 3.47351 8.8682 3.44812Z"
                      fill="#fff"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex gap-x-1">
                <div className="">
                  {demie.categories.length !== 0 ? (
                    demie.categories.map((item: any, i: any, row: any) => {
                      if (i + 1 === row.length) {
                        return (
                          <p
                            className="text-lightGray flex-none text-xs"
                            key={i}
                          >
                            {item.name}
                          </p>
                        );
                      } else {
                        return (
                          <p
                            className="text-lightGray flex-none text-xs"
                            key={i}
                          >
                            {item.name},
                          </p>
                        );
                      }
                    })
                  ) : (
                    <p className="text-darkGray flex-none text-opacity-70 text-xs">
                      Unknown
                    </p>
                  )}
                </div>
                <p className="text-lightGray flex-none text-xs">|</p>
                <p className=" text-lightGray text-xs">
                  {translatePriceRange(demie.price_level)}
                </p>
              </div>
              {/* <p className={`self-stretch text-xs not-italic font-normal leading-[normal] ${isRestaurantOpen().toLowerCase() === "buka" ? "text-green" : "text-[#952525]"}`}>{isRestaurantOpen(demie.opening_hours)}</p> */}
              {/* <p className="text-darkGray text-opacity-70 text-xs">{priceLogic(priceRange)}</p> */}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
