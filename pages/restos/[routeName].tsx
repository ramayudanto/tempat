/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { createContext, useEffect, useRef, useState } from "react";
import Header from "../../components/Head/Header";
import Navbar from "../../components/Navbar/Navbar";
import DetailedInformation from "../../components/restaurant-2/DetailedInformation";
import Gallery from "../../components/Gallery/Gallery";
import { firestore } from "../../lib/firebase";
import ImageSection from "../../components/restaurant-2/ImageSection";
import TopSection from "../../components/restaurant-2/TopSection";
import MenuSection from "../../components/restaurant-2/MenuSection";
import RestoFooter from "../../components/restaurant-2/RestoFooter";
import RestoTopbar from "../../components/restaurant-2/RestoTopbar";
import { useInView } from "react-intersection-observer";
import RestoFacility from "../../components/restaurant-2/RestoFacility";
import { authOptions } from "../api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session);
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
            <ImageSection thumbnail={restaurant.thumbnail} />
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
