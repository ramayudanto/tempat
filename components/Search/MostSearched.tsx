const items = [
  { name: "Coffee", image: "https://images.unsplash.com/photo-1532713107108-dfb5d8d2fc42" },
  { name: "Ramen", image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d" },
  { name: "Noodle", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246" },
  { name: "Dumpling", image: "https://images.unsplash.com/photo-1626322751504-930506dd41ca" },
];

export default function MostSearched() {
  return (
    <div className="mt-8 w-full">
      <p className="font-semibold mb-2">Makanan yang lagi banyak dicari</p>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
        {items.map((item: any, i: any) => {
          return (
            <div className="rounded-lg text-white tracking-wider font-medium relative h-28 bg-left bg-cover" style={{ backgroundImage: `url(${item.image})` }} key={i}>
              <div className="absolute bg-black w-full h-full bg-opacity-40 flex">
                <p className="m-auto">{item.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
