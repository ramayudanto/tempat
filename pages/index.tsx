import { FormEvent, useEffect, useState } from "react";
import Header from "../components/Head/Header";
import Navbar from "../components/Navbar/Navbar";
import RestaurantRow from "../components/MainPage/RestaurantRow";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import { prisma } from "../lib/prisma";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from "next/image";
import MainPageSearch from "../components/Search/MainPageSearch";
import { getMultipleRandom } from "../lib/logic";
import { Restaurant } from "@prisma/client";
import { firestore } from "../lib/firebase";
import useInsert from "../lib/useInsert";
import Jumbotron from "../components/MainPage/Jumbotron";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
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
    skip,
  });

  const restoRef = firestore.collection("resto1");
  const resto = await restoRef.limit(10).get();
  const restoData = resto.docs.map((doc: any) => doc.data());

  return { props: { user: session?.user || null, restoran: JSON.parse(JSON.stringify(restoran)), restoData: JSON.parse(JSON.stringify(restoData)) } };
  // return {
  //   props: {
  //     user: session?.user || null,
  //     restoran: [
  //       {
  //         name: "OPEN Restaurant - DoubleTree by Hilton Jakarta Diponegoro",
  //         locationBroad: "DoubleTree by Hilton Hotel, Cikini, Jakarta",
  //         priceRange: "700.000 ",
  //         openTime: "1970-01-01T03:00:00.000Z",
  //         closeTime: "1970-01-01T11:00:00.000Z",
  //         featureImage: [{ URL: "https://b.zmtcdn.com/data/pictures/1/7422631/61f7cd504f60c63d29dd07380b882ee4_featured_v2.jpg" }],
  //         routeName: "OPEN-Restaurant-DoubleTree-by-Hilton-Jakarta-Diponegoro",
  //         rating: [],
  //         category: [{ categoryName: "Western" }, { categoryName: "Asian" }, { categoryName: "French" }],
  //         userBookmark: [],
  //       },
  //     ],
  //   },
  // };
};

export default function Home({ restoran, user, restoData }: any) {
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // console.log(restoran[0]);
  console.log(restoData[0]);

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
      <div className="pb-20 overflow-hidden">
        <Jumbotron />

        {search.length !== 0 && <MainPageSearch data={searchData} isLoading={isLoading} />}
        <RestaurantRow user={user} restaurants={restoData} title={"Popular restaurants around you"} />
        {/* <RestaurantRow user={user} search="Coffee" title={"Coffee to brighten up your day"} />
        <RestaurantRow user={user} search="Japanese" title={"Japanese"} />
        <RestaurantRow user={user} search="Italian" title={"Italian"} /> */}
      </div>
      {/* <p>{JSON.stringify(restoran[0])}</p> */}
      <Navbar user={user} />
    </>
  );
}
