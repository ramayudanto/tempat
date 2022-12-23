import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Backdrop from "../../login/Backdrop";
import { FilterContext } from "../SearchResult";

export default function FilterPage() {
  const { setIsFilterOpen, setFilter, filter, highestPrice } = useContext(FilterContext);
  const [price, setPrice] = useState<any>(filter.price || highestPrice / 2);

  useEffect(() => {
    const getData = setTimeout(() => {
      if (price === highestPrice / 2) return;
      setFilter({ price: Number(price) });
    }, 1000);

    return () => clearTimeout(getData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  return (
    <Backdrop
      onClick={() => {
        setIsFilterOpen(false);
      }}
    >
      <div
        className="animate-loginFade bg-white h-[75vh] w-screen rounded-t-2xl pt-10 fixed bottom-0 px-4"
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full">
          <p className="font-bold mb-2">Harga</p>
          <input
            type="range"
            min="0"
            onChange={(e: any) => {
              setPrice(e.target.value);
            }}
            value={price}
            max={highestPrice}
            className="w-full filter-input"
            name="harga"
          />
          {/* <output htmlFor="harga" /> */}
          <div className="flex justify-between items-center">
            <p>Rp0</p>
            <p>Rp{highestPrice.toLocaleString("de-DE")}</p>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}
