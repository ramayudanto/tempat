import Image from "next/image";

export default function Jumbotron() {
  return (
    <div className="relative">
      <Image src={`/homepage-${1}.png`} objectFit="cover" alt="homepage-1" layout="responsive" width={4} height={2} />
      <div className="border-[1px] w-3/4 bg-white flex justify-between items-center overflow-hidden mx-auto left-0 right-0 my-4 rounded-lg px-2 py-1 absolute -bottom-[18%]">
        <button>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"
              stroke="#667085"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          placeholder="Restaurant name, cuisine, or a dish..."
          type="text"
          name=""
          className="w-[90%] outline-none p-1 text-sm placeholder:text-xs placeholder:font-normal"
          spellCheck={false}
          //   value={search}
          //   onChange={(e: any) => {
          //     setSearch(e.target.value);
          //   }}
        />
      </div>
    </div>
  );
}
