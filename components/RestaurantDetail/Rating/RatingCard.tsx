export default function RatingCard({ item }: any) {
  const { rate, comment, user } = item;
  return (
    <div className="border-[1px] p-3 rounded-lg">
      <div className="flex items-center space-x-7">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-lightGray">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div className="flex flex-col -space-y-1">
            <p className="font-semibold text-darkGray">{user}</p>
            <p>0 follower</p>
          </div>
        </div>
        <div className="bg-green px-3 py-2 rounded flex font-semibold text-white items-center space-x-1">
          <p className="text-sm">{rate}</p>
          <svg width="10" height="10" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.00004 7.53723L7.42498 8.91839C7.86906 9.17151 8.41242 8.79733 8.29556 8.3241L7.65286 5.72686L9.79727 3.97702C10.1888 3.65787 9.9784 3.05259 9.4642 3.01407L6.64199 2.78846L5.53762 0.334285C5.33895 -0.111428 4.66114 -0.111428 4.46247 0.334285L3.35807 2.78296L0.535798 3.00857C0.0215951 3.04708 -0.188761 3.65237 0.202735 3.97152L2.34719 5.72136L1.70444 8.3186C1.58758 8.79183 2.131 9.16601 2.57508 8.91289L5.00004 7.53723Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <p className="ml-2">{comment}</p>
    </div>
  );
}
