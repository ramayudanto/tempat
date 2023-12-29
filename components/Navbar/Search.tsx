import Link from "next/link";

export default function Search({ route }: any) {
  return (
    <Link href={"/search"}>
      <a className={`flex flex-col items-center w-[20%] ${route === "/search" && "text-brandPrimary600 font-medium"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <p>Cari</p>
      </a>
    </Link>
  );
}
