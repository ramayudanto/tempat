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
import CategoryList from "../components/MainPage/CategoryList";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const session = await unstable_getServerSession(req, res, authOptions);
  // const count = await prisma.restaurant.count();
  // const skip = Math.floor(Math.random() * count);
  // const restoran = await prisma.restaurant.findMany({
  //   select: {
  //     name: true,
  //     locationBroad: true,
  //     priceRange: true,
  //     openTime: true,
  //     closeTime: true,
  //     featureImage: {
  //       select: {
  //         URL: true,
  //       },
  //     },
  //     routeName: true,
  //     rating: {
  //       select: {
  //         rate: true,
  //       },
  //     },
  //     category: {
  //       select: {
  //         categoryName: true,
  //       },
  //     },
  //     userBookmark: {
  //       select: {
  //         email: true,
  //       },
  //     },
  //   },
  //   take: 10,
  //   skip,
  // });

  const restoRef = firestore.collection("resto1");
  const totalDocs = await restoRef.get().then((snapshot) => snapshot.size);

  const randomIndex = Math.floor(Math.random() * totalDocs);

  const resto = await restoRef.orderBy("__name__").startAt(randomIndex.toString()).limit(10).get();
  const restoData = resto.docs.map((doc) => doc.data());

  const categoryRef = firestore.collection("category");
  const categories = await categoryRef.get();
  const categoryLists = categories.docs.map((doc: any) => doc.data());

  return { props: { restaurant: JSON.parse(JSON.stringify(restoData)), category: categoryLists } };
};

export default function Home({ restaurant, category }: any) {
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // console.log(restoran[0]);
  // console.log(restoData[0]);
  // const users = useInsert();

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
      <div className="pb-20 overflow-hidden mx-auto bg-white max-w-[420px]">
        <Jumbotron />
        <CategoryList category={category} />

        {search.length !== 0 && <MainPageSearch data={searchData} isLoading={isLoading} />}
        <RestaurantRow restaurants={restaurant} title={"Popular restaurants around you"} />
        <RestaurantRow search="Japanese" title={"Oriental taste"} />
        <RestaurantRow search="Noodles" title={"For noodle fan"} />
        {/* <RestaurantRow user={user} search="Japanese" title={"Japanese"} />
        <RestaurantRow user={user} search="Italian" title={"Italian"} /> */}
      </div>
      {/* <p>{JSON.stringify(restoran[0])}</p> */}
      <Navbar />
    </>
  );
}
