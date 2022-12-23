import { useRouter } from "next/router";

export default function CategoryTopBar() {
  const router = useRouter();
  return (
    <div className="bg-darkRed text-center relative py-8">
      <button onClick={router.back} className="absolute left-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <p className="text-white text-2xl font-medium italic select-none cursor-default">Nomato</p>
    </div>
  );
}
