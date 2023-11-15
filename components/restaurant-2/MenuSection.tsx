import { useContext } from "react";
import { ActiveSectionContext } from "../../pages/restos/[routeName]";
import Image from "next/image";

export default function MenuSection({ restaurant }: any) {
  const { menuRef, menuDivRef } = useContext(ActiveSectionContext);

  return (
    <div className="h-full space-y-4 pb-4" ref={menuDivRef}>
      <p className="text-[#333] text-sm font-semibold">Menu</p>
      {/* <p className="text-[#333] text-xs text-opacity-60" ref={menuRef}>
        Full Menu
      </p> */}
      {!restaurant.menu ? (
        <>
          <div className="w-[200px] h-[200px] mx-auto">
            <div className="relative w-full h-full">
              <Image src={"https://tempatapp.sgp1.cdn.digitaloceanspaces.com/asset/empty%20state%20photo.svg"} alt={"menu"} layout="fill" objectFit="cover" className="rounded" />
            </div>
          </div>
          <p className="text-center text-sm">Menu masih belum tersedia</p>
        </>
      ) : (
        <></>
      )}
      {/* <button className="bg-red-50 flex text-red-600 py-2 px-4 font-semibold rounded-lg mx-auto">
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.1666 7.91663V5.66663C17.1666 4.26649 17.1666 3.56643 16.8942 3.03165C16.6545 2.56124 16.272 2.17879 15.8016 1.93911C15.2668 1.66663 14.5668 1.66663 13.1666 1.66663H7.83331C6.43318 1.66663 5.73312 1.66663 5.19834 1.93911C4.72793 2.17879 4.34548 2.56124 4.1058 3.03165C3.83331 3.56643 3.83331 4.26649 3.83331 5.66663V14.3333C3.83331 15.7334 3.83331 16.4335 4.1058 16.9683C4.34548 17.4387 4.72793 17.8211 5.19834 18.0608C5.73312 18.3333 6.43318 18.3333 7.83331 18.3333H12.1666M14.25 12.5018C14.3968 12.0844 14.6866 11.7325 15.0681 11.5083C15.4496 11.2841 15.8981 11.2021 16.3342 11.2769C16.7703 11.3517 17.1658 11.5785 17.4508 11.917C17.7357 12.2555 17.8917 12.6839 17.891 13.1264C17.891 14.3754 16.0174 15 16.0174 15M16.0417 17.5H16.05"
            stroke="#D12D2D"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p>Request Menu</p>
      </button> */}
    </div>
  );
}
