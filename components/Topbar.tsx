import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getCoordinate } from "../lib/location";
export default function Topbar() {
  const { data: session } = useSession();
  // const getLocation = async (coordinate: any) => {
  //   const res = await fetch(`https://eu1.locationiq.com/v1/reverse?key=${process.env.NEXT_PUBLIC_IQ_KEY}&lat${"-7.0051453"}=&lon=${"110.4381254"}&format=json`);
  //   const data = await res.json();
  //   console.log(data);
  // };
  // useEffect(() => {
  //   console.log(getCoordinate());
  //   getLocation(getCoordinate());
  // }, []);
  return (
    <div className="flex justify-between items-center pt-4">
      <div className="flex gap-x-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[#E63131]">
          <path
            fillRule="evenodd"
            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-black font-medium">Jakarta</p>
      </div>
      {session ? (
        <Image src={session?.user?.image!} width="30" height={"30"} alt="logo putih" objectFit="cover" className="rounded-full" />
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      )}
    </div>
  );
}
