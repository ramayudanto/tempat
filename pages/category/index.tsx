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
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const categories = await prisma.category.findMany();
  if (!categories) {
    return {
      notFound: true,
    };
  }
  return { props: { user: session?.user || null, categories: JSON.parse(JSON.stringify(categories)) } };
};

export default function Categories({ categories, user }: any) {
  function replaceSpacesWithHyphens(inputString: string) {
    return inputString.replace(/ /g, "-");
  }

  return (
    <>
      <Header title={"Categories"} />
      {/* <Topbar /> */}

      <div className="mx-auto grid grid-cols-2 gap-3 px-4 pt-10 pb-32 bg-white max-w-[420px]">
        {/* {restaurants.map((restaurant: any, i: any, row: any) => {
          if (i + 1 === row.length) {
            return <CategoryCard key={i} restaurant={restaurant} isLast={true} />;
          } else {
            return <CategoryCard key={i} restaurant={restaurant} isLast={false} />;
          }
        })} */}
        {categories.map((category: any, i: any) => {
          const { name, icon } = category;
          return (
            <Link href={`/category/${name}`} key={i}>
              <a className="border-[1px] rounded-md p-1 flex items-center space-x-3 py-4">
                <Image src={category.icon! || "https://tempatapp.sgp1.cdn.digitaloceanspaces.com/category/Rice.svg"} width={30} height={30} alt={name} loading="eager" />
                <p>{name}</p>
              </a>
            </Link>
          );
        })}
      </div>
      <Navbar user={user} />
    </>
  );
}
