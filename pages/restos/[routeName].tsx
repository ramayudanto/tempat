import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { createContext, useRef, useState } from "react";
import Header from "../../components/Head/Header";
import Navbar from "../../components/Navbar/Navbar";
import DetailedInformation from "../../components/restaurant-2/DetailedInformation";
import MenuSection from "../../components/RestaurantDetail/MenuSection";
import RatingSection from "../../components/RestaurantDetail/Rating/RatingSection";
import RestaurantFeature from "../../components/RestaurantDetail/RestaurantFeature";
import RestaurantHeader from "../../components/RestaurantDetail/RestaurantHeader";
import TopButtons from "../../components/RestaurantDetail/TopButtons";
import { prisma } from "../../lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]";
import { Rating } from "@prisma/client";
import Gallery from "../../components/Gallery/Gallery";
import { firestore } from "../../lib/firebase";
import ImageSection from "../../components/restaurant-2/ImageSection";
import TopSection from "../../components/restaurant-2/TopSection";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // const session = await unstable_getServerSession(context.req, context.res, authOptions);
  const template = {
    id: 2,
    name: "Cold Moo",
    description: null,
    locationBroad: "Darmawangsa",
    location: "Ruko Dharmawangsa Square, Jl. Darmawangsa VI No.20, RT.5/RW.1, Pulo, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12160",
    priceRange: "100.000",
    openTime: "1970-01-01T03:00:00.000Z",
    closeTime: "1970-01-01T11:00:00.000Z",
    routeName: "cold-moo",
    rating: [],
    category: [{ categoryName: "Ice cream" }, { categoryName: "Dessert" }],
    information: { id: 2, restaurantId: 2, smoking: false, takeOut: true, wifi: false, indoorSeating: true, prayingRoom: false },
    featureImage: [{ URL: "https://dev.ramayudanto.com/wp-content/uploads/2022/09/picture-1630330942.jpg" }],
    userBookmark: [],
  };
  const { routeName } = context.params;

  try {
    const querySnapshot = await firestore.collection("resto1").where("place_id", "==", routeName).limit(1).get();

    if (querySnapshot.empty)
      return {
        notFound: true,
      };

    const document = querySnapshot.docs[0];
    const data = document.data();
    return {
      props: {
        restaurant: data,
      },
    };
  } catch (error) {
    console.error("Error getting document:", error);
    return {
      props: {
        restaurant: null,
      },
    };
  }
};

export const ReviewContext = createContext(null as any);

export default function Restaurant({ restaurant }: any) {
  console.log(restaurant);
  const { gofood_name: name, rating } = restaurant;
  // const [reviews, setReviews] = useState<Rating[]>(rating);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const ratingDivRef = useRef<HTMLDivElement>(null);
  if (!isGalleryOpen) {
    return (
      <>
        <Header title={name} />
        <div className="max-w-[420px] mx-auto bg-slate-500">
          <ImageSection thumbnail={restaurant.thumbnail} />
          <div className=" bg-white rounded-t-2xl pt-5 px-4">
            <TopSection restaurant={restaurant} />
            <hr className="border-y-2 my-4" />
            <DetailedInformation restaurant={restaurant} />
          </div>
        </div>
        {/* <div className="mx-5 text-darkGray">
          <TopButtons
            onClick={() => {
              setIsGalleryOpen(true);
            }}
            user={user}
            restaurant={restaurant}
          />
          <RestaurantHeader restaurant={restaurant} />
          <div className="flex justify-between">
            <button
              className="text-white border-darkRed border-2 bg-darkRed px-12 py-3 rounded"
              onClick={() => {
                ratingDivRef?.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "start",
                });
              }}
            >
              REVIEWS
            </button>
            <button
              onClick={() => {
                setIsGalleryOpen(true);
              }}
              className="text-darkGray border-darkRed border-2 px-12 py-3 rounded"
            >
              Photos
            </button>
          </div>
        </div>
        <hr className="border-4 my-4" />
        <DetailedInformation restaurant={restaurant} />
        <hr className="border-4 my-4" />
        <MenuSection restaurant={restaurant} />
        {information && (
          <>
            <hr className="border-4 my-4" />
            <RestaurantFeature information={information} />
          </>
        )}
        <hr className="border-4 my-4" />
        <ReviewContext.Provider value={{ reviews, setReviews }}>
          <RatingSection user={user} divRef={ratingDivRef} restaurant={restaurant} />
        </ReviewContext.Provider> */}
        <Navbar />
      </>
    );
  } else {
    return <Gallery setIsGalleryOpen={setIsGalleryOpen} restaurant={restaurant} />;
  }
}
