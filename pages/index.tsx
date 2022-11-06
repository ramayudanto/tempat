import { useState } from "react";
import Header from "../components/Head/Header";
import Navbar from "../components/Navbar/Navbar";
import RestaurantRow from "../components/RestaurantRow";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import { prisma } from "../lib/prisma";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
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
    },
    take: 10,
    skip,
  });
  return { props: { restoran: JSON.parse(JSON.stringify(restoran)) } };
};

export default function Home({ restoran }: any) {
  const [search, setSearch] = useState(null);

  return (
    <>
      <Header title="Home" />
      <Topbar />
      <SearchBar />
      <RestaurantRow restaurants={restoran} title={"Popular restaurants around you"} />
      <RestaurantRow search="Coffee" title={"Coffee to brighten up your day"} />
      <RestaurantRow search="Japanese" title={"Japanese"} />
      <RestaurantRow search="Italian" title={"Italian"} />
      <Navbar />
    </>
  );
}
