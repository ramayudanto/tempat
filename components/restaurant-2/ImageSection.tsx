import Image from "next/image";
import { useRouter } from "next/router";
import { ActiveSectionContext } from "../../pages/restos/[routeName]";
import { useContext } from "react";

export default function ImageSection({ thumbnail }: any) {
  const containerStyle = {
    backgroundImage: 'url("/placeholder.png")',
    backgroundSize: "cover",
  };
  const router = useRouter();
  return (
    <div className="relative">
      <div className="flex justify-between absolute top-5 z-20 w-[90%] left-0 right-0 mx-auto">
        <button
          className="p-[10px] bg-white rounded-full"
          onClick={() => {
            router.back();
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 8H1M1 8L8 15M1 8L8 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="p-[10px] bg-white rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
        </button>
      </div>
      <div className="">
        <div className="relative h-[400px]">
          <Image src={thumbnail} alt="test" layout="fill" objectFit="cover" loading="eager" />
        </div>
        <div className="flex gap-x-1">
          {[1, 2, 3, 4].map((item: any, i: any, row: any) => {
            if (i + 1 === row.length) {
              // LAST ELEMENT
              return (
                <div
                  className="w-1/4 flex items-center justify-center h-[10vh] bg-center bg-black bg-opacity-30"
                  key={item}
                  style={containerStyle}
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  <p className="text-white text-xs font-semibold">See All</p>
                </div>
              );
            } else {
              return (
                <div className="relative w-1/4 h-[10vh]" key={item}>
                  <Image src={"https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"} alt="placeholder" layout="fill" objectFit="cover" />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
