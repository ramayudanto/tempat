/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { createContext, useEffect, useRef, useState } from "react";
import Header from "../../components/Head/Header";
import DetailedInformation from "../../components/restaurant-2/DetailedInformation";
import Gallery from "../../components/Gallery/Gallery";
import ImageSection from "../../components/restaurant-2/ImageSection";
import TopSection from "../../components/restaurant-2/TopSection";
import MenuSection from "../../components/restaurant-2/MenuSection";
import RestoFooter from "../../components/restaurant-2/RestoFooter";
import RestoTopbar from "../../components/restaurant-2/RestoTopbar";
import { useInView } from "react-intersection-observer";
import RestoFacility from "../../components/restaurant-2/RestoFacility";
import { authOptions } from "../api/auth/[...nextauth]";
import { prisma } from "../../lib/prisma";
import Menu from "../../components/MenuSection/Menu";
import { useRouter } from "next/router";
import LoginPrompt from "../../components/restaurant-2/LoginPrompt";
import Divider from "../../components/design-system/Divider";
import { Rating } from "@prisma/client";
import RatingSection from "../../components/RestaurantDetail/Rating/RatingSection";
import FullReviewPage from "../../components/RestaurantDetail/Rating/RatingPage/FullReviewPage";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { routeName } = context.params;
  const restaurant = await prisma.restaurantV2.findUnique({
    where: {
      place_id: routeName,
      isPublic: true,
    },
    include: {
      address_components: true,
      categories: true,
      OpeningHoursV2: true,
      bookmarkedBy: true,
      Menu: true,
      GeometryV2: true,
      Rating: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
              id: true,
              email: true,
              username: true,
            },
          },
        },
        orderBy: {
          postDate: "desc",
        },
      },
    },
  });

  return { props: { restaurant: JSON.parse(JSON.stringify(restaurant)), user: session || null } };
};

export const ReviewContext = createContext(null as any);
export const ActiveSectionContext = createContext(null as any);

export default function Restaurant({ restaurant, user }: any) {
  const [reviews, setReviews] = useState<Rating[] | null>(restaurant.Rating || null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [rating, setRating] = useState<any>({ ratingCount: restaurant.ratingCount, ratingSum: restaurant.ratingSum });

  const [activeSection, setActiveSection] = useState<string>("");
  const [aboutRef, aboutInView] = useInView();
  const [menuRef, menuInView] = useInView();
  const [facilityRef, facilityInView] = useInView();
  const [reviewRef, reviewInView] = useInView();
  const [othersRef, othersInView] = useInView();

  const aboutDivRef = useRef<any>(null);
  const menuDivRef = useRef<any>(null);
  const facilityDivRef = useRef<any>(null);
  const reviewDivRef = useRef<any>(null);
  const othersDivRef = useRef<any>(null);
  const router = useRouter();
  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    setIsActive(scrollY > 150);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (aboutInView) setActiveSection("about");
    if (menuInView) setActiveSection("menu");
    if (facilityInView) setActiveSection("facility");
    if (reviewInView) setActiveSection("review");
    if (othersInView) setActiveSection("others");
  }, [aboutInView, menuInView, facilityInView, reviewInView, othersInView]);

  if (router.query.view === undefined) {
    return (
      <>
        <Header title={restaurant?.gofood_name} />
        <ActiveSectionContext.Provider value={{ menuRef, aboutRef, facilityRef, reviewRef, othersRef, activeSection, menuDivRef, aboutDivRef, facilityDivRef, reviewDivRef, othersDivRef }}>
          {isActive && <RestoTopbar />}
          <div className="max-w-[420px] mx-auto bg-slate-200">
            <ImageSection restaurant={restaurant} thumbnail={restaurant?.thumbnail} />
            <div className=" bg-white pt-5 px-4 flex flex-col gap-y-6">
              <TopSection restaurant={restaurant} rating={rating} setRating={setRating} />
              {!user && (
                <>
                  <Divider />
                  <LoginPrompt />{" "}
                </>
              )}
              <Divider />
              {/* <ClaimResto />
              <Divider /> */}
              {/* <RestoUSP />
              <Divider /> */}
              <DetailedInformation restaurant={restaurant} />
              <Divider />
              <MenuSection restaurant={restaurant} />
              <Divider />
              <RestoFacility restaurant={restaurant} />
              <Divider />
              <ReviewContext.Provider value={{ reviews, setReviews, restaurant, user, rating, setRating }}>
                <RatingSection />
              </ReviewContext.Provider>
            </div>
          </div>
        </ActiveSectionContext.Provider>
        {!isActive && <RestoFooter restaurant={restaurant} />}
      </>
    );
  } else if (router.query.view === "gallery") {
    return <Gallery restaurant={restaurant} />;
  } else if (router.query.view === "menu") {
    return <Menu restaurant={restaurant} />;
  } else if (router.query.view === "review") {
    return <FullReviewPage restaurant={restaurant} reviews={reviews} setReviews={setReviews} />;
  } else {
    <></>;
  }
}
