import Header from "../components/Head/Header";
import Navbar from "../components/Navbar/Navbar";
import Search from "../components/Search/SearchComponent";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { prisma } from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  const fourCategories = await prisma.category.findMany({
    take: 4,
    orderBy: {
      restaurants: {
        _count: "desc",
      },
    },
  });

  return { props: { user: session?.user || null, fourCategories } };
};

export default function search({ user, fourCategories }: any) {
  return (
    <>
      <Header title={"Search"} />
      <Search fourCategories={fourCategories} />
      <Navbar user={user} />
    </>
  );
}
