import Header from "../../components/Head/Header";
import DetailedInformation from "../../components/RestaurantDetail/DetailedInformation";
import MenuSection from "../../components/RestaurantDetail/MenuSection";
import RestaurantFeature from "../../components/RestaurantDetail/RestaurantFeature";
import RestaurantHeader from "../../components/RestaurantDetail/RestaurantHeader";
import TopButtons from "../../components/RestaurantDetail/TopButtons";
import { prisma } from "../../lib/prisma";

export const getServerSideProps = async (context: any) => {
  const { routeName } = context.params;
  const restoranList = await prisma.restaurantV2.findMany();

  return { props: { restaurant: JSON.parse(JSON.stringify(restoranList)) } };
};

export default function Restaurant({ restaurant }: any) {
  const { name, information } = restaurant;
  // console.log(restaurant);
  return (
    <>
      {/* <Header title={name} />
      <div className="mx-5 text-darkGray">
        <TopButtons />
        <RestaurantHeader restaurant={restaurant} />
        <div className="flex justify-between">
          <button className="text-white border-darkRed border-2 bg-darkRed px-12 py-3 rounded">REVIEWS</button>
          <button className="text-darkGray border-darkRed border-2 px-12 py-3 rounded">Photos</button>
        </div>
      </div>
      <hr className="border-4 my-4" />
      <DetailedInformation restaurant={restaurant} />
      <hr className="border-4 my-4" />
      <MenuSection restaurant={restaurant} />
      <hr className="border-4 my-4" />
      <RestaurantFeature information={information} />
      <hr className="border-4 my-4" /> */}
    </>
  );
}
