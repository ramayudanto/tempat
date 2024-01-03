import React from "react";

export default function RibbonCard() {
  return (
    <div className="absolute">
      {/* ribbon text */}
      <div className="min-w-[120px] max-h-[24px] flex-col justify-start items-start gap-2 flex relative inset-x-[-4px] top-4">
        <div className="flex-col justify-center items-center flex z-20 shadow-xl">
          <div className="flex-col justify-center items-center flex">
            <div className="px-2 py-1 bg-brandPrimary600 rounded-tl rounded-tr rounded-bl-[1px] rounded-br shadow justify-center items-center gap-1 flex">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.91667 6.28759V9.16665L4.8762 8.38283C4.92194 8.36454 4.9448 8.35539 4.96841 8.35177C4.98935 8.34856 5.01065 8.34856 5.03159 8.35177C5.0552 8.35539 5.07806 8.36454 5.1238 8.38283L7.08333 9.16665V6.28759M8.125 3.95831C8.125 5.6842 6.72589 7.08331 5 7.08331C3.27411 7.08331 1.875 5.6842 1.875 3.95831C1.875 2.23242 3.27411 0.833313 5 0.833313C6.72589 0.833313 8.125 2.23242 8.125 3.95831Z"
                  stroke="white"
                  stroke-width="1"
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
        {/* ribbon bottom wrap */}
        <div className="absolute inset-x-0 top-[14px] z-[1]">
          <svg
            width="9"
            height="24"
            viewBox="0 0 9 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.436995 1.7433L6.83103 7.49793C7.47456 8.0771 8.5 7.62041 8.5 6.75464V1C8.5 0.447715 8.05228 0 7.5 0L1.10596 0C0.189474 0 -0.244223 1.1302 0.436995 1.7433Z"
              fill="#D12D2D"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
