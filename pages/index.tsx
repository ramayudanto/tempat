import { useState } from "react";
import PopularRestaurant from "../components/PopularRestaurant";
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
  });
  return { props: { restoran: JSON.parse(JSON.stringify(restoran)) } };
};

export default function Home({ restoran }: any) {
  const [search, setSearch] = useState(null);
  return (
    <>
      <Topbar />
      <SearchBar />
      <PopularRestaurant restaurants={restoran} reverse={false} />
      <PopularRestaurant restaurants={restoran} reverse={true} />
    </>
  );
}
