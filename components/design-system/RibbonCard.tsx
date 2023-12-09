import React from "react";

export default function RibbonCard() {
  return (
    <div className="min-w-[120px] max-h-[24px] flex-col justify-start items-start gap-2 flex relative inset-x-[-4px] top-4">
      <div className="flex-col justify-start items-center flex">
        <div className="flex-col justify-start items-center flex">
          <div className="px-2 py-1 bg-red-600 rounded-tl rounded-tr rounded-bl-[1px] rounded-br shadow justify-center items-start gap-1 flex">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66667 10.5599V15.1663L7.80192 13.9122C7.8751 13.883 7.91169 13.8683 7.94946 13.8625C7.98296 13.8574 8.01704 13.8574 8.05054 13.8625C8.08831 13.8683 8.1249 13.883 8.19808 13.9122L11.3333 15.1663V10.5599M13 6.83301C13 9.59443 10.7614 11.833 8 11.833C5.23858 11.833 3 9.59443 3 6.83301C3 4.07158 5.23858 1.83301 8 1.83301C10.7614 1.83301 13 4.07158 13 6.83301Z"
                stroke="white"
                stroke-width="1px"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-center text-white text-[10px] font-semibold">
              Resto Pilihan 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
