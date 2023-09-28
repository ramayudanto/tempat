/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { createContext, useEffect, useRef, useState } from "react";
import Header from "../../components/Head/Header";
import Navbar from "../../components/Navbar/Navbar";
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

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { routeName } = context.params;
  const restaurant = await prisma.restaurantV2.findUnique({
    where: {
      place_id: routeName,
    },
    include: {
      address_components: true,
      categories: true,
      opening_hours: true,
      bookmarkedBy: true,
    },
  });

  return { props: { restaurant: JSON.parse(JSON.stringify(restaurant)), user: session || null } };
};

export const ReviewContext = createContext(null as any);
export const ActiveSectionContext = createContext(null as any);

export default function Restaurant({ restaurant }: any) {
  const { gofood_name: name, rating } = restaurant;
  // const [reviews, setReviews] = useState<Rating[]>(rating);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

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

  if (!isGalleryOpen) {
    return (
      <>
        <Header title={name} />
        <ActiveSectionContext.Provider value={{ menuRef, aboutRef, facilityRef, reviewRef, othersRef, activeSection, menuDivRef, aboutDivRef, facilityDivRef, reviewDivRef, othersDivRef }}>
          {isActive && <RestoTopbar />}
          <div className="max-w-[420px] mx-auto bg-slate-500">
            <ImageSection restaurant={restaurant} thumbnail={restaurant.thumbnail} />
            <div className=" bg-white rounded-t-2xl pt-5 px-4">
              <TopSection restaurant={restaurant} />
              <hr className="border-y-2 my-4" />
              <DetailedInformation restaurant={restaurant} />
              <hr className="border-y-2 my-4" />
              <MenuSection restaurant={restaurant} />
              <hr className="border-y-2 my-4" />
              <RestoFacility restaurant={restaurant} />
            </div>
          </div>
        </ActiveSectionContext.Provider>
        {!isActive && <RestoFooter restaurant={restaurant} />}
      </>
    );
  } else {
    return <Gallery setIsGalleryOpen={setIsGalleryOpen} restaurant={restaurant} />;
  }
}
