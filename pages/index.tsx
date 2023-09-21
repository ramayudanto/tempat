import { FormEvent, useEffect, useState } from "react";
import Header from "../components/Head/Header";
import Navbar from "../components/Navbar/Navbar";
import RestaurantRow from "../components/MainPage/RestaurantRow";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import { prisma } from "../lib/prisma";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from "next/image";
import MainPageSearch from "../components/Search/MainPageSearch";
import { getMultipleRandom } from "../lib/logic";
// import { Restaurant } from "@prisma/client";
import { firestore } from "../lib/firebase";
import useInsert from "../lib/useInsert";
import Jumbotron from "../components/MainPage/Jumbotron";
import CategoryList from "../components/MainPage/CategoryList";
import { getSession, useSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  // console.log(session);

  const countResto = await prisma.restaurantV2.count();
  const countCategory = await prisma.category.count();
  const skipResto = Math.floor(Math.random() * countResto);
  const skipCategory = Math.floor(Math.random() * countCategory);
  const restoran = await prisma.restaurantV2.findMany({
    select: {
      gofood_name: true,
      address_components: true,
      rating: true,
      user_ratings_total: true,
      categories: true,
      price_level: true,
      thumbnail: true,
    },
    take: 10,
    skip: skipResto,
  });

  const restoRef = firestore.collection("resto1");
  const totalDocs = await restoRef.get().then((snapshot) => snapshot.size);

  const randomIndex = Math.floor(Math.random() * totalDocs);

  const resto = await restoRef.orderBy("__name__").startAt(randomIndex.toString()).limit(10).get();
  const restoData = resto.docs.map((doc) => doc.data());

  // const categoryRef = firestore.collection("category");
  // const categories = await categoryRef.get();
  // const categoryLists = categories.docs.map((doc: any) => doc.data());
  const category = await prisma.category.findMany({
    take: 8,
    skip: skipCategory,
  });

  return { props: { restaurant: JSON.parse(JSON.stringify(restoran)), category, user: session || null, restoran } };
};

export default function Home({ restaurant, category, user, restoran }: any) {
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const session = useSession();
  // console.log(restoData[0]);
  // const users = useInsert();

  useEffect(() => {
    if (search === "") {
      setSearchData([]);
      return;
    }
    const getData = setTimeout(async () => {
      setIsLoading(true);
      const data = await (await fetch(`/api/getSearch?q=${search}`)).json();
      setSearchData(getMultipleRandom(data, 3));
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(getData);
  }, [search]);

  return (
    <>
      <Header title="Home" />
      <div className="pb-20 overflow-hidden mx-auto bg-white max-w-[420px]">
        <Jumbotron search={search} setSearch={setSearch} />
        <CategoryList category={category} />

        {search.length !== 0 && <MainPageSearch data={searchData} isLoading={isLoading} />}
        <RestaurantRow restaurants={restaurant} title={"Popular restaurants around you!"} />
        {/* <RestaurantRow search="Japanese" title={"Oriental taste"} />
        <RestaurantRow search="Noodles" title={"For noodle fan"} /> */}
        {/* <RestaurantRow user={user} search="Japanese" title={"Japanese"} />
        <RestaurantRow user={user} search="Italian" title={"Italian"} /> */}
      </div>
      {/* <p>{JSON.stringify(restoran[0])}</p> */}
      <Navbar />
    </>
  );
}
