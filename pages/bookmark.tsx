import React from "react";
import Header from "../components/Head/Header";
import { prisma } from "../lib/prisma";
import Navbar from "../components/Navbar/Navbar";
import BookmarkCard from "../components/Bookmark/BookmarkCard";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const bookmarks = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
    select: {
      bookmark: {
        include: {
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
        },
      },
    },
  });
  return { props: { user: session.user!, bookmarks: JSON.parse(JSON.stringify(bookmarks?.bookmark)) } };
};

export default function bookmark({ bookmarks, user }: any) {
  return (
    <>
      <Header title="Bookmark" />
      {/* <CategoryHero name="bookmark" /> */}
      <div className="mx-4 mt-10 pb-20">
        <p className="font-semibold text-2xl mb-3">Restoran Favorit</p>
        <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
          {bookmarks.map((bookmark: any, i: any) => {
            return <BookmarkCard key={i} restaurant={bookmark} />;
          })}
        </div>
      </div>
      <Navbar user={user} />
    </>
  );
}
