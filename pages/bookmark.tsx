import React, { createContext, useState } from "react";
import Header from "../components/Head/Header";
import { prisma } from "../lib/prisma";
import Navbar from "../components/Navbar/Navbar";
import BookmarkCard from "../components/Bookmark/BookmarkCard";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import NoBookmark from "../public/NoBookmark.svg";

// export const getServerSideProps: GetServerSideProps = async (context: any) => {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   if (!session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//     };
//   }
//   const bookmarks = await prisma.user.findUnique({
//     where: {
//       email: session.user?.email!,
//     },
//     select: {
//       bookmark: {
//         include: {
//           featureImage: {
//             select: {
//               URL: true,
//             },
//           },
//           rating: {
//             select: {
//               rate: true,
//             },
//           },
//         },
//       },
//     },
//   });
//   return { props: { user: session.user!, bookmarks: JSON.parse(JSON.stringify(bookmarks?.bookmark)) } };
// };

export const BookmarkContext = createContext(null as any);

export default function Bookmark({ bookmarks, user }: any) {
  const [userBookmark, setUserBookmark] = useState<any[]>([]);
  return (
    <>
      <Header title="Bookmark" />
      {/* <CategoryHero name="bookmark" /> */}
      <div className="pt-10 overflow-hidden relative mx-auto bg-white max-w-[420px] h-screen flex flex-col just">
        <p className="font-semibold text-2xl mb-3 px-4">Restoran Favorit</p>
        {userBookmark.length !== 0 ? (
          // <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
          //   {userBookmark.map((bookmark: any, i: any) => {
          //     return (
          //       <BookmarkContext.Provider value={{ userBookmark, setUserBookmark }} key={i}>
          //         <BookmarkCard restaurant={bookmark} />
          //       </BookmarkContext.Provider>
          //     );
          //   })}
          // </div>
          <></>
        ) : (
          <div className="min-h-max absolute top-1/3 bottom-1/3 mx-auto flex flex-col justify-center items-center">
            <NoBookmark />
            <p className="text-center text-darkGray">Kamu belum punya restauran favorit. Yuk tambahkan sekarang!</p>
          </div>
        )}
      </div>
      <Navbar user={user} />
    </>
  );
}
