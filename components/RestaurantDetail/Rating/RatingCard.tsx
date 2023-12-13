import Image from "next/image";
import { truncate } from "../../../lib/logic";

export default function RatingCard({ item }: any) {
  const { rate, comment, user } = item;
  return (
    <div className="border-[1px] p-3 rounded-lg self-start">
      <div className="flex items-center space-x-7 mb-2 justify-between">
        <div className="flex items-center gap-x-2 justify-center min-w-max">
          <div className="w-10 h-10 relative rounded-full overflow-hidden self-start">
            <Image src={user?.image} layout="fill" alt={user?.name} objectFit="cover" />
          </div>
          <div className="flex flex-col -space-y-1">
            <p className="font-semibold text-darkGray">{user?.name}</p>
            <p className="text-darkGray text-opacity-70">0 follower</p>
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
      <p className={`ml-2 mb-2 ${!comment.length && "italic text-sm"}`}>{!comment.length ? "User tidak memberikan komentar" : truncate(comment, 80)}</p>
      {item.imageUrl !== "null" && (
        <div className="w-full h-48 rounded overflow-hidden relative">
          <Image src={item?.imageUrl} layout="fill" alt={"review photo"} objectFit="cover" />
        </div>
      )}
    </div>
  );
}
