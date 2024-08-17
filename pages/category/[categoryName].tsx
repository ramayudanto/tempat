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
import { useRouter } from "next/router";

export const getServerSideProps = async (context: any) => {
  const { categoryName } = context.params;

  const category = await prisma.category.findUnique({
    where: {
      name: categoryName,
    },
    include: {
      restaurants: {
        where: {
          isPublic: true,
        },
        include: {
          categories: true,
          address_components: true,
          OpeningHoursV2: true,
        },
      },
    },
  });

  if (!category) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category,
    },
  };
};

export default function Category({ category }: any) {
  const { restaurants } = category;
  const router = useRouter();
  const routePath = router.asPath.split("/")[1];
  return (
    <>
      <Header title={category.name} />
      {/* <CategoryTopBar /> */}
      <div className="pb-32 overflow-hidden max-w-[420px] mx-auto bg-white">
        <CategoryHero category={category} />
        <div className="flex flex-col gap-y-4 rounded-t-xl px-4 pt-2">
          {restaurants.map((restaurant: any, i: any, row: any) => {
            if (i + 1 === row.length) {
              return <CategoryCard routePath={routePath} i={i} key={i} restaurant={restaurant} isLast={true} />;
            } else {
              return <CategoryCard routePath={routePath} i={i} key={i} restaurant={restaurant} isLast={false} />;
            }
          })}
        </div>
      </div>
      <Navbar />
    </>
  );
}
