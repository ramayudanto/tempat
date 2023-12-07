import React from "react";

export default function LoginPrompt() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex py-4 gap-x-4">
        <div className="h-[64px] min-w-[64px] flex justify-center align-middle items-center bg-slate-100 rounded-md">
          <svg
            width="36px"
            height="36px"
            stroke-width="1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M19 12H12M12 12L15 15M12 12L15 9"
              stroke="gray"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18"
              stroke="gray"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col justify-between">
          <h4 className="text-slate-700 text-lg font-semibold">
            Udah punya akun belum?
          </h4>
          <p className="text-sm text-slate-500">
            Buat akun atau log in yuk. Ada diskon dan benefit biar kamu makin
            cuan!
          </p>
        </div>
      </div>
      <button className="bg-red-50 p-3 font-bold text-red-700 text-sm rounded-lg">
        {" "}
        Gabung Sekarang
      </button>
    </div>
  );
}
