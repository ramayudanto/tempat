import { featureLogic } from "../../lib/logic";

export default function RestaurantFeature({ information }: any) {
  //   console.log(information);
  return (
    <div className="mx-5 text-darkGray">
      <p className="font-semibold mb-3">More Info</p>
      <div className="grid grid-cols-2 gap-3">
        {Object.keys(information).map((val: any, i: number) => {
          return (
            val !== "id" &&
            val !== "restaurantId" && (
              <div className="flex items-center gap-x-1" key={i}>
                {information[val] ? (
                  <>
                    <svg viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                      <path
                        d="M7.8125 0C3.5 0 0 3.36 0 7.5C0 11.64 3.5 15 7.8125 15C12.125 15 15.625 11.64 15.625 7.5C15.625 3.36 12.125 0 7.8125 0ZM7.8125 13.5C4.36719 13.5 1.5625 10.8075 1.5625 7.5C1.5625 4.1925 4.36719 1.5 7.8125 1.5C11.2578 1.5 14.0625 4.1925 14.0625 7.5C14.0625 10.8075 11.2578 13.5 7.8125 13.5ZM11.3984 4.185L6.25 9.1275L4.22656 7.1925L3.125 8.25L6.25 11.25L12.5 5.25L11.3984 4.185Z"
                        fill="#22AF39"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 text-darkRed h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </>
                )}
                <p className="capitalize">{featureLogic(val)}</p>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
