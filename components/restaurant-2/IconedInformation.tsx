import React, { useContext, useState } from "react";
import { getTodaysOpeningHours, isRestaurantOpen, openTimeLogic, translateOpeningHours, translatePriceRange } from "../../lib/logic";
import Image from "next/image";
import Link from "next/link";
import { ActiveSectionContext } from "../../pages/restos/[routeName]";
import Divider from "../design-system/Divider";
import RestoMap from "./RestoMap";

export default function IconedInformation({ restaurant }: any) {
  const { opening_hours, price_level, categories } = restaurant;
  const open = translateOpeningHours(restaurant.opening_hours);
  const [isOpenHourOpen, setIsOpenHourOpen] = useState<boolean>(false);
  const { aboutRef } = useContext(ActiveSectionContext);
  return (
    <div className="space-y-4">
      <div className="flex gap-x-2 text-lightGray text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="CurrentColor" viewBox="0 0 256 256" className="fill-lightGray mt-[1px]">
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
        </svg>
        <p ref={aboutRef}>
          {getTodaysOpeningHours(open)[0].open_time}
          {getTodaysOpeningHours(open)[0].close_time && ` - ${getTodaysOpeningHours(open)[0].close_time}`}
        </p>
        {getTodaysOpeningHours(open)[0].open_time !== "24" && (
          <>
            {isRestaurantOpen(opening_hours) === "Tutup" && <p>|</p>}
            <div
              className="my-auto relative"
              onClick={() => {
                setIsOpenHourOpen(!isOpenHourOpen);
              }}
            >
              <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.678 0.6875H0.987864C0.667225 0.6875 0.488189 1.0125 0.686757 1.23438L6.03181 7.18437C6.1848 7.35469 6.4794 7.35469 6.63402 7.18437L11.9791 1.23438C12.1776 1.0125 11.9986 0.6875 11.678 0.6875Z"
                  fill="#333333"
                  fillOpacity="0.66"
                />
              </svg>
              {isOpenHourOpen && (
                <div className="absolute top-5 border-[1px] w-max p-2 -left-[50px] rounded space-y-1 bg-white shadow-xl">
                  {open.map((item: any, i: number) => {
                    return (
                      <div className="flex gap-x-1" key={i}>
                        <p className="capitalize">{item.day}</p>
                        <p>|</p>
                        {item.times.map((hours: any, i: number) => {
                          return (
                            <p key={i}>
                              {hours.open_time} - {hours.close_time}
                            </p>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex gap-x-2 text-lightGray text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="CurrentColor" viewBox="0 0 256 256" className="fill-lightGray">
          <path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path>
        </svg>
        <p className="">{translatePriceRange(price_level)}</p>
      </div>
      <div className="flex gap-x-2 text-lightGray text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="CurrentColor" viewBox="0 0 256 256" className="fill-lightGray">
          <path d="M72,88V40a8,8,0,0,1,16,0V88a8,8,0,0,1-16,0ZM216,40V224a8,8,0,0,1-16,0V176H152a8,8,0,0,1-8-8,268.75,268.75,0,0,1,7.22-56.88c9.78-40.49,28.32-67.63,53.63-78.47A8,8,0,0,1,216,40ZM200,53.9c-32.17,24.57-38.47,84.42-39.7,106.1H200ZM119.89,38.69a8,8,0,1,0-15.78,2.63L112,88.63a32,32,0,0,1-64,0l7.88-47.31a8,8,0,1,0-15.78-2.63l-8,48A8.17,8.17,0,0,0,32,88a48.07,48.07,0,0,0,40,47.32V224a8,8,0,0,0,16,0V135.32A48.07,48.07,0,0,0,128,88a8.17,8.17,0,0,0-.11-1.31Z"></path>
        </svg>
        <div className="flex gap-x-1 mt-[1px] overflow-hidden">
          {categories.map((item: any, i: any, row: any) => {
            if (i + 1 === row.length) {
              return <p key={i}>{item.name}</p>;
            } else {
              return <p key={i}>{item.name},</p>;
            }
          })}
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-y-4">
      <p className="text-[#333] font-semibold text-lg">Alamat Restoran</p>
      <RestoMap restaurant={restaurant} />
      </div>
      <div className="flex text-lightGray justify-between items-center text-sm">
        <div className="flex gap-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="CurrentColor" viewBox="0 0 256 256" className="fill-lightGray">
            <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
          </svg>
          <p>{restaurant?.vicinity}</p>
        </div>
        <Link href={`https://www.google.com/maps/place/?q=place_id:${restaurant.place_id}`} legacyBehavior>
          <a className="w-6 h-6 relative" target="_blank">
            <Image src={"https://uploads-ssl.webflow.com/6475bb633d8dca4b13c9f1d5/64a18c8c709a48bfa6f175d1_google-maps-old.svg"} alt="maps" layout="fill" />
          </a>
        </Link>
      </div>
    </div>
  );
}
