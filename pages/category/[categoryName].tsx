import { unstable_getServerSession } from "next-auth";
import { useRef } from "react";
import CategoryCard from "../../components/CategoryPage/CategoryCard";
import CategoryHero from "../../components/CategoryPage/CategoryHero";
import CategoryTopBar from "../../components/CategoryPage/CategoryTopBar";
import Header from "../../components/Head/Header";
import Navbar from "../../components/Navbar/Navbar";
import { prisma } from "../../lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]";

export const getServerSideProps = async (context: any) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  const { categoryName } = context.params;
  const category = await prisma.category.findUnique({
    where: {
      categoryName,
    },
    include: {
      restaurant: {
        include: {
          category: true,
          rating: {
            select: {
              rate: true,
            },
          },
          featureImage: true,
        },
      },
    },
  });
  if (!category) {
    return {
      notFound: true,
    };
  }
  return { props: { user: session?.user || null, category: JSON.parse(JSON.stringify(category)) } };
};

export default function Category({ category, user }: any) {
  const { categoryName, restaurant: restaurants } = category;
  return (
    <>
      <Header title={categoryName} />
      <CategoryTopBar />
      <CategoryHero name={categoryName} />
      <div className="flex flex-col lg:grid lg:grid-cols-5 lg:gap-2 gap-y-3 m-4">
        {restaurants.map((restaurant: any, i: any, row: any) => {
          if (i + 1 === row.length) {
            return <CategoryCard key={i} restaurant={restaurant} isLast={true} />;
          } else {
            return <CategoryCard key={i} restaurant={restaurant} isLast={false} />;
          }
        })}
      </div>
      <Navbar user={user} />
    </>
  );
}
