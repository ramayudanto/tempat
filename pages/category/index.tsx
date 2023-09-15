import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { useRef } from "react";
import CategoryCard from "../../components/CategoryPage/CategoryCard";
import CategoryHero from "../../components/CategoryPage/CategoryHero";
import CategoryTopBar from "../../components/CategoryPage/CategoryTopBar";
import Header from "../../components/Head/Header";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar";
import { prisma } from "../../lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const categories = await prisma.category.findMany({
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
  if (!categories) {
    return {
      notFound: true,
    };
  }
  return { props: { user: session?.user, categories: JSON.parse(JSON.stringify(categories)) } };
};

export default function Categories({ categories, user }: any) {
  const { categoryName, restaurant: restaurants } = categories;
  // console.log(categories);
  return (
    <>
      <Header title={"Categories"} />
      <Topbar />

      <div className="grid grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-5 mx-3 my-5 gap-3">
        {/* {restaurants.map((restaurant: any, i: any, row: any) => {
          if (i + 1 === row.length) {
            return <CategoryCard key={i} restaurant={restaurant} isLast={true} />;
          } else {
            return <CategoryCard key={i} restaurant={restaurant} isLast={false} />;
          }
        })} */}
        {categories.map((category: any, i: any) => {
          const { categoryName } = category;
          return (
            <Link href={`/category/${categoryName}`} key={i}>
              <a className="border-[1px] rounded-md p-2">{categoryName}</a>
            </Link>
          );
        })}
      </div>
      <Navbar user={user} />
    </>
  );
}
