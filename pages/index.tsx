import { useState } from "react";
import Header from "../components/Head/Header";
import Navbar from "../components/Navbar/Navbar";
import RestaurantRow from "../components/RestaurantRow";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import { prisma } from "../lib/prisma";

export const getServerSideProps = async () => {
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
  });
  return { props: { restoran: JSON.parse(JSON.stringify(restoran)) } };
};

export default function Home({ restoran }: any) {
  const [search, setSearch] = useState(null);
  // const [coffeeShop, setCoffeeShop] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await (await fetch("http://localhost:3000/api/getRestaurant?category=Coffee")).json();
  //     setCoffeeShop(data.restaurant);
  //   };
  //   fetchData();
  // }, []);
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
