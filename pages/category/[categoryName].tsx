import { getServerSession } from "next-auth";
import { useRef } from "react";
import CategoryCard from "../../components/CategoryPage/CategoryCard";
import CategoryHero from "../../components/CategoryPage/CategoryHero";
import CategoryTopBar from "../../components/CategoryPage/CategoryTopBar";
import Header from "../../components/Head/Header";
import Navbar from "../../components/Navbar/Navbar";
import { prisma } from "../../lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]";
import { firestore } from "../../lib/firebase";

export const getServerSideProps = async (context: any) => {
  const { categoryName } = context.params;

  const restaurantsRef = firestore.collection("resto1");
  const snapshot = await restaurantsRef.where("category", "array-contains", categoryName).get();

  if (snapshot.empty) {
    return {
      notFound: true,
    };
  }

  const restaurants = snapshot.docs.map((doc) => doc.data());

  return {
    props: {
      restaurants,
      categoryName,
    },
  };
};

export default function Category({ restaurants, categoryName }: any) {
  console.log(restaurants);
  return (
    <>
      <Header title={categoryName} />
      {/* <CategoryTopBar /> */}
      <div className="overflow-hidden bg-slate-600">
        <CategoryHero name={categoryName} />
        <div className="flex flex-col gap-y-0 rounded-t-xl">
          {restaurants.map((restaurant: any, i: any, row: any) => {
            if (i + 1 === row.length) {
              return <CategoryCard key={i} restaurant={restaurant} isLast={true} />;
            } else {
              return <CategoryCard i={i} key={i} restaurant={restaurant} isLast={false} />;
            }
          })}
        </div>
      </div>
      <Navbar />
    </>
  );
}
