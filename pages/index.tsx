import { FormEvent, useEffect, useState } from "react";
import Header from "../components/Head/Header";
import Navbar from "../components/Navbar/Navbar";
import RestaurantRow from "../components/RestaurantRow";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import { prisma } from "../lib/prisma";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from "next/image";
import MainPageSearch from "../components/Search/MainPageSearch";
import { getMultipleRandom } from "../lib/logic";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  // console.log(session);
  const count = await prisma.restaurant.count();
  const skip = Math.floor(Math.random() * count);
  const restoran = await prisma.restaurant.findMany({
    select: {
      name: true,
      locationBroad: true,
      priceRange: true,
      openTime: true,
      closeTime: true,
      featureImage: {
        select: {
          URL: true,
        },
      },
      routeName: true,
      rating: {
        select: {
          rate: true,
        },
      },
      category: {
        select: {
          categoryName: true,
        },
      },
      userBookmark: {
        select: {
          email: true,
        },
      },
    },
    take: 10,
    // skip,
  });
  return { props: { user: session?.user || null, restoran: JSON.parse(JSON.stringify(restoran)) } };
};

export default function Home({ restoran, user }: any) {
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<any[]>([]);
  // console.log(searchData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // console.log(restoran[0]);

  useEffect(() => {
    if (search === "") {
      setSearchData([]);
      return;
    }
    const getData = setTimeout(async () => {
      setIsLoading(true);
      const data = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/getSearch?q=${search}`)).json();
      setSearchData(getMultipleRandom(data, 3));
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(getData);
  }, [search]);

  return (
    <>
      <Header title="Home" />
      <div className="mx-4 pb-20">
        <Topbar />
        <div className="border-[1px] flex justify-between items-center overflow-hidden my-4 rounded-2xl px-2 py-1 relative">
          <input
            placeholder="Restaurant name, cuisine, or a dish..."
            type="text"
            name=""
            className="w-[90%] outline-none p-1 text-sm"
            spellCheck={false}
            value={search}
            onChange={(e: any) => {
              setSearch(e.target.value);
            }}
          />
          <button className="pr-2">
            <Image src={"/searchIcon.svg"} width={15} height={15} alt="search" />
          </button>
        </div>
        {search.length !== 0 && <MainPageSearch data={searchData} isLoading={isLoading} />}
        <RestaurantRow restaurants={restoran} title={"Popular restaurants around you"} />
        <RestaurantRow search="Coffee" title={"Coffee to brighten up your day"} />
        <RestaurantRow search="Japanese" title={"Japanese"} />
        <RestaurantRow search="Italian" title={"Italian"} />
      </div>
      <Navbar user={user} />
    </>
  );
}
