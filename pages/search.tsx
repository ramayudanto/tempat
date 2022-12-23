import Header from "../components/Head/Header";
import Navbar from "../components/Navbar/Navbar";
import Search from "../components/Search/SearchComponent";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  return { props: { user: session?.user || null } };
};

export default function search({ user }: any) {
  return (
    <>
      <Header title={"Search"} />
      <Search />
      <Navbar user={user} />
    </>
  );
}
