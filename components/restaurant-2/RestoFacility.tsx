import React, { useContext } from "react";
import { ActiveSectionContext } from "../../pages/restos/[routeName]";

export default function RestoFacility({ restaurant }: any) {
  const { serves_beer, serves_dinner, serves_lunch, takeout, dine_in, delivery, curbside_pickup, serves_wine } = restaurant;

  const { facilityRef, facilityDivRef } = useContext(ActiveSectionContext);

  return (
    <div className="pb-2 space-y-4" ref={facilityDivRef}>
      <p className="text-[#333] text-sm font-semibold">Info Lainnya</p>
      <div className="grid grid-cols-2 gap-3">
        {serves_beer !== undefined && (
          <div className="flex gap-x-2 items-center">
            {serves_beer ? (
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                <path
                  d="M7.8125 0C3.5 0 0 3.36 0 7.5C0 11.64 3.5 15 7.8125 15C12.125 15 15.625 11.64 15.625 7.5C15.625 3.36 12.125 0 7.8125 0ZM7.8125 13.5C4.36719 13.5 1.5625 10.8075 1.5625 7.5C1.5625 4.1925 4.36719 1.5 7.8125 1.5C11.2578 1.5 14.0625 4.1925 14.0625 7.5C14.0625 10.8075 11.2578 13.5 7.8125 13.5ZM11.3984 4.185L6.25 9.1275L4.22656 7.1925L3.125 8.25L6.25 11.25L12.5 5.25L11.3984 4.185Z"
                  fill="#22AF39"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-red-600 -mr-1 text-brandPrimary600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <p className="text-xs">Beer</p>
          </div>
        )}

        {serves_dinner !== undefined && (
          <div className="flex gap-x-2 items-end">
            {serves_dinner ? (
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                <path
                  d="M7.8125 0C3.5 0 0 3.36 0 7.5C0 11.64 3.5 15 7.8125 15C12.125 15 15.625 11.64 15.625 7.5C15.625 3.36 12.125 0 7.8125 0ZM7.8125 13.5C4.36719 13.5 1.5625 10.8075 1.5625 7.5C1.5625 4.1925 4.36719 1.5 7.8125 1.5C11.2578 1.5 14.0625 4.1925 14.0625 7.5C14.0625 10.8075 11.2578 13.5 7.8125 13.5ZM11.3984 4.185L6.25 9.1275L4.22656 7.1925L3.125 8.25L6.25 11.25L12.5 5.25L11.3984 4.185Z"
                  fill="#22AF39"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-red-600 -mr-1 text-brandPrimary600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <p className="text-xs">Dinner</p>
          </div>
        )}

        {serves_lunch !== undefined && (
          <div className="flex gap-x-2 items-end">
            {serves_lunch ? (
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                <path
                  d="M7.8125 0C3.5 0 0 3.36 0 7.5C0 11.64 3.5 15 7.8125 15C12.125 15 15.625 11.64 15.625 7.5C15.625 3.36 12.125 0 7.8125 0ZM7.8125 13.5C4.36719 13.5 1.5625 10.8075 1.5625 7.5C1.5625 4.1925 4.36719 1.5 7.8125 1.5C11.2578 1.5 14.0625 4.1925 14.0625 7.5C14.0625 10.8075 11.2578 13.5 7.8125 13.5ZM11.3984 4.185L6.25 9.1275L4.22656 7.1925L3.125 8.25L6.25 11.25L12.5 5.25L11.3984 4.185Z"
                  fill="#22AF39"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-red-600 -mr-1 text-brandPrimary600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <p className="text-xs">Lunch</p>
          </div>
        )}

        {takeout !== undefined && (
          <div className="flex gap-x-2 items-end">
            {takeout ? (
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.8125 0C3.5 0 0 3.36 0 7.5C0 11.64 3.5 15 7.8125 15C12.125 15 15.625 11.64 15.625 7.5C15.625 3.36 12.125 0 7.8125 0ZM7.8125 13.5C4.36719 13.5 1.5625 10.8075 1.5625 7.5C1.5625 4.1925 4.36719 1.5 7.8125 1.5C11.2578 1.5 14.0625 4.1925 14.0625 7.5C14.0625 10.8075 11.2578 13.5 7.8125 13.5ZM11.3984 4.185L6.25 9.1275L4.22656 7.1925L3.125 8.25L6.25 11.25L12.5 5.25L11.3984 4.185Z"
                  fill="#22AF39"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-red-600 -mr-1 text-brandPrimary600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <p className="text-xs">Takeout</p>
          </div>
        )}

        {dine_in !== undefined && (
          <div ref={facilityRef} className="flex gap-x-2 items-end">
            {dine_in ? (
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.8125 0C3.5 0 0 3.36 0 7.5C0 11.64 3.5 15 7.8125 15C12.125 15 15.625 11.64 15.625 7.5C15.625 3.36 12.125 0 7.8125 0ZM7.8125 13.5C4.36719 13.5 1.5625 10.8075 1.5625 7.5C1.5625 4.1925 4.36719 1.5 7.8125 1.5C11.2578 1.5 14.0625 4.1925 14.0625 7.5C14.0625 10.8075 11.2578 13.5 7.8125 13.5ZM11.3984 4.185L6.25 9.1275L4.22656 7.1925L3.125 8.25L6.25 11.25L12.5 5.25L11.3984 4.185Z"
                  fill="#22AF39"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-red-600 -mr-1 text-brandPrimary600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <p className="text-xs">Makan di tempat</p>
          </div>
        )}

        {delivery !== undefined && (
          <div className="flex gap-x-2 items-end">
            {delivery ? (
              <svg width="16" height="16" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.8125 0C3.5 0 0 3.36 0 7.5C0 11.64 3.5 15 7.8125 15C12.125 15 15.625 11.64 15.625 7.5C15.625 3.36 12.125 0 7.8125 0ZM7.8125 13.5C4.36719 13.5 1.5625 10.8075 1.5625 7.5C1.5625 4.1925 4.36719 1.5 7.8125 1.5C11.2578 1.5 14.0625 4.1925 14.0625 7.5C14.0625 10.8075 11.2578 13.5 7.8125 13.5ZM11.3984 4.185L6.25 9.1275L4.22656 7.1925L3.125 8.25L6.25 11.25L12.5 5.25L11.3984 4.185Z"
                  fill="#22AF39"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-red-600 -mr-1 text-brandPrimary600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <p className="text-xs">Pesan Antar</p>
          </div>
        )}

        {/* {curbside_pickup !== undefined && (
          <div className="flex gap-x-4">
            {curbside_pickup ? (
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-[3px]">
                <path
                  d="M7.8125 0C3.5 0 0 3.36 0 7.5C0 11.64 3.5 15 7.8125 15C12.125 15 15.625 11.64 15.625 7.5C15.625 3.36 12.125 0 7.8125 0ZM7.8125 13.5C4.36719 13.5 1.5625 10.8075 1.5625 7.5C1.5625 4.1925 4.36719 1.5 7.8125 1.5C11.2578 1.5 14.0625 4.1925 14.0625 7.5C14.0625 10.8075 11.2578 13.5 7.8125 13.5ZM11.3984 4.185L6.25 9.1275L4.22656 7.1925L3.125 8.25L6.25 11.25L12.5 5.25L11.3984 4.185Z"
                  fill="#22AF39"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-red-600 -mr-1 text-brandPrimary600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <p className="text-xs">Curbside Pickup</p>
          </div>
        )} */}
        {serves_wine !== undefined && (
          <div className="flex gap-x-2 items-end">
            {serves_wine ? (
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-[3px]">
                <path
                  d="M7.8125 0C3.5 0 0 3.36 0 7.5C0 11.64 3.5 15 7.8125 15C12.125 15 15.625 11.64 15.625 7.5C15.625 3.36 12.125 0 7.8125 0ZM7.8125 13.5C4.36719 13.5 1.5625 10.8075 1.5625 7.5C1.5625 4.1925 4.36719 1.5 7.8125 1.5C11.2578 1.5 14.0625 4.1925 14.0625 7.5C14.0625 10.8075 11.2578 13.5 7.8125 13.5ZM11.3984 4.185L6.25 9.1275L4.22656 7.1925L3.125 8.25L6.25 11.25L12.5 5.25L11.3984 4.185Z"
                  fill="#22AF39"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-red-600 -mr-1 text-brandPrimary600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <p className="text-xs">Wine</p>
          </div>
        )}
      </div>
    </div>
  );
}
