import Image from "next/image";

export default function Jumbotron({ search, setSearch }: { search: string; setSearch: any }) {
  return (
    <div
      className="relative h-[171px] bg-center flex items-center"
      style={{
        backgroundImage: `url("homepage-1.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <div className="text-white font-bold backdrop-brightness-50 w-full h-full px-10 flex flex-col items-start justify-center">
        <p>Cari restoran paling enak di</p>
        <button className="flex items-center mt-1 gap-x-1 bg-red-50 text-red-500 px-2 p-1 rounded-full">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.5 5C0.5 2.51472 2.51472 0.5 5 0.5C7.48528 0.5 9.5 2.51472 9.5 5C9.5 6.83924 8.46966 7.84308 7.50882 8.64901C7.40726 8.7342 7.30765 8.81665 7.21042 8.89713C6.35026 9.60911 5.67655 10.1668 5.49029 11.0981C5.44355 11.3318 5.23834 11.5 5 11.5C4.76166 11.5 4.55645 11.3318 4.50971 11.0981C4.32345 10.1668 3.64974 9.60911 2.78958 8.89713C2.69235 8.81665 2.59274 8.7342 2.49118 8.64901C1.53034 7.84308 0.5 6.83924 0.5 5ZM6.5 5C6.5 5.82843 5.82843 6.5 5 6.5C4.17157 6.5 3.5 5.82843 3.5 5C3.5 4.17157 4.17157 3.5 5 3.5C5.82843 3.5 6.5 4.17157 6.5 5Z"
              fill="#E63131"
            />
          </svg>
          <p className="text-sm font-semibold">Jakarta</p>
        </button>
      </div>
      <div className="border-[1px] mx-[16px] bg-white flex gap-x-[8px] items-center overflow-hidden left-0 right-0 my-4 rounded-lg px-2 py-1 absolute -bottom-[18%]">
        <button>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"
              stroke="#667085"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          placeholder="Bakmie? Ayam? Kopi? Ada Semua!"
          type="text"
          name=""
          className="w-[90%] outline-none p-1 text-sm placeholder:text-xs placeholder:font-normal"
          spellCheck={false}
          value={search}
          onChange={(e: any) => {
            setSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
