import React from "react";
import Header from "../components/Head/Header";
import { prisma } from "../lib/prisma";
import { getSession } from "next-auth/react";
import Navbar from "../components/Navbar/Navbar";
import CategoryHero from "../components/CategoryPage/CategoryHero";
import CategoryCard from "../components/CategoryPage/CategoryCard";
import BookmarkCard from "../components/Bookmark/BookmarkCard";

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
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
  return { props: { bookmarks: JSON.parse(JSON.stringify(bookmarks?.bookmark)), session } };
};

export default function bookmark({ bookmarks }: any) {
  return (
    <>
      <Header title="Bookmark" />
      {/* <CategoryHero name="bookmark" /> */}
      <div className="mx-4 mt-10 pb-20 grid grid-cols-2 gap-2">
        {bookmarks.map((bookmark: any, i: any) => {
          return <BookmarkCard key={i} restaurant={bookmark} />;
        })}
      </div>
      <Navbar />
    </>
  );
}
