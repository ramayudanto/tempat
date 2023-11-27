import React from "react";
import { getCloseTimeForToday, getTodaysOpeningHours, openTimeLogic, translateOpeningHours } from "../../lib/logic";

export default function RestoFooter({ restaurant }: any) {
  // const open = translateOpeningHours(restaurant.opening_hours);
  // get today's opening hours with getTodaysOpeningHours()

  return (
    <div className="fixed max-w-[420px] z-20 bg-white bottom-0 w-screen flex px-5 py-4 justify-between text-sm left-0 right-0 mx-auto">
      <div className="space-y-1">
        {/* {openTimeLogic(restaurant.opening_hours).includes("Open") ? <p>{restaurant.opening_hours}</p> : <p>openTimeLogic(restaurant.opening_hours)</p>} */}
        {/* <p className={`${openTimeLogic(getTodaysOpeningHours(restaurant.opening_hours)).includes("Open") ? "text-[#326212]" : "text-customRed-500"} font-semibold`}>{openTimeLogic(getTodaysOpeningHours(restaurant.opening_hours))}</p> */}
        <p className="text-xs text-lightGray font-medium">{getTodaysOpeningHours(restaurant.opening_hours)}</p>
      </div>
      <button className="bg-customRed-600 text-white font-semibold px-16 rounded-lg">Lihat Menu</button>
    </div>
  );
}
