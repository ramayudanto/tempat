import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { prisma } from "../../lib/prisma";
import Header from "../../components/Head/Header";
import AccountSection from "../../components/Account/AccountSection";
import Navbar from "../../components/Navbar/Navbar";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  // const { routeName } = context.params;
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
    select: {
      username: true,
      name: true,
      email: true,
      image: true,
    },
  });
  return { props: { user } };
};
export default function account({ user }: any) {
  return (
    <>
      <Header title="Account" />
      <AccountSection user={user} />
      <Navbar user={user} />
    </>
  );
}
