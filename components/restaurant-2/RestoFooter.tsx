import React from "react";
import { getCloseTimeForToday, getTodaysOpeningHours, isRestaurantOpen, openTimeLogic, translateOpeningHours } from "../../lib/logic";
import { captureEvent } from "../../lib/posthog";
import { useRouter } from "next/router";

export default function RestoFooter({ restaurant }: any) {
  // get today's opening hours with getTodaysOpeningHours()
  const open = translateOpeningHours(restaurant.OpeningHoursV2);
  const router = useRouter();
  return (
    <div className="fixed max-w-[420px] z-20 bg-white bottom-0 w-screen flex px-5 py-4 justify-between text-sm left-0 right-0 mx-auto border-t-[1.5px] drop-shadow-xl items-end">
      <div className="space-y-1">
        <p className={`self-stretch not-italic font-bold leading-[normal] ${isRestaurantOpen(restaurant.OpeningHoursV2).toLowerCase() === "buka" ? "text-green font-bold" : "text-slate-500"}`}>
          {isRestaurantOpen(restaurant.OpeningHoursV2)}
        </p>
        <p className="text-sm text-slate-500 font-medium">
          {getTodaysOpeningHours(open)[0].open_time}
          {getTodaysOpeningHours(open)[0].close_time && ` - ${getTodaysOpeningHours(open)[0].close_time}`}
        </p>
      </div>
      <button
        onClick={() => {
          captureEvent("See Full Menu button");
          const path = router.asPath;
          router.push(`${path}?view=menu`, undefined, { shallow: true });
        }}
        className="bg-customRed-600 text-white font-semibold px-16 rounded-full min-h-[44px]"
      >
        Lihat Menu
      </button>
    </div>
  );
}
