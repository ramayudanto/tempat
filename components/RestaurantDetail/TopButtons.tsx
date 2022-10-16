import Image from "next/image";
import { useRouter } from "next/router";

export default function TopButtons() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center pt-10 mb-7">
      <button onClick={router.back}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <div className="flex gap-x-4">
        <Image src={"/cameraIcon.svg"} width={20} height={20} alt="camera" className="cursor-pointer" />
        <Image src={"/bookmarkIcon.svg"} width={13} height={13} alt="camera" className="cursor-pointer" />
        <Image src={"/shareIcon.svg"} width={20} height={20} alt="camera" className="cursor-pointer" />
      </div>
    </div>
  );
}
