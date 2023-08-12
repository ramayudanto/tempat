import Image from "next/image";

export default function Jumbotron() {
  return (
    <div className="">
      <Image src={`/homepage-${1}.png`} objectFit="cover" alt="homepage-1" layout="responsive" width={4} height={2} />
      <div className="border-[1px] w-screen flex justify-between items-center overflow-hidden my-4 rounded-2xl px-2 py-1 relative">
        <input
          placeholder="Restaurant name, cuisine, or a dish..."
          type="text"
          name=""
          className="w-[90%] outline-none p-1 text-sm"
          spellCheck={false}
          //   value={search}
          //   onChange={(e: any) => {
          //     setSearch(e.target.value);
          //   }}
        />
        <button className="pr-2">
          <Image src={"/searchIcon.svg"} width={15} height={15} alt="search" />
        </button>
      </div>
    </div>
  );
}
