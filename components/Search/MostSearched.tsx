import Link from "next/link";

export default function MostSearched({ fourCategories }: any) {
  return (
    <div className="mt-6 w-full">
      <p className="font-semibold text-sm mb-2 text-slate-700">Kategori yang lagi banyak dicari</p>
      <div className="grid gap-2 grid-cols-2">
        {fourCategories.map((item: any, i: any) => {
          return (
            <Link href={`/category/${item.name}`} key={i} legacyBehavior>
              <a className="rounded-lg text-white tracking-wider text-xs font-medium relative h-[75px] bg-left bg-cover overflow-hidden" style={{ backgroundImage: `url(${item.header})` }}>
                <div className="absolute bg-black w-full h-full bg-opacity-40 flex">
                  <p className="m-auto font-semibold text-xs">{item.name}</p>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
