import Image from "next/image";
import Header from "../../components/Head/Header";
import RestaurantHeader from "../../components/RestaurantDetail/RestaurantHeader";
import TopButtons from "../../components/RestaurantDetail/TopButtons";
import { ratingCounter } from "../../lib/logic";
import { prisma } from "../../lib/prisma";

export const getServerSideProps = async (context: any) => {
  const { routeName } = context.params;
  const restoran = await prisma.restaurant.findUnique({
    where: {
      routeName,
    },
    include: {
      rating: {},
      category: {},
      information: {},
      featureImage: {},
    },
  });
  if (!restoran) {
    return {
      notFound: true,
    };
  }
  return { props: { restaurant: JSON.parse(JSON.stringify(restoran)) } };
};

export default function Restaurant({ restaurant }: any) {
  console.log(restaurant);
  const { name, featureImage, location } = restaurant;
  return (
    <>
      <Header title={name} />
      <div className="mx-5">
        <TopButtons />
        <RestaurantHeader restaurant={restaurant} />
        <div className="flex justify-between">
          <button className="text-white border-darkRed border-2 bg-darkRed px-12 py-3 rounded">REVIEWS</button>
          <button className="text-darkGray border-darkRed border-2 px-12 py-3 rounded">Photos</button>
        </div>
      </div>
      <hr className="border-4 my-4" />
      <div className="mx-5">
        <p className="font-semibold">About the restaurant</p>
        <Image src={featureImage[0].URL} width={350} height={350} alt={name} className="rounded" />
        <div className="flex gap-x-8">
          <div className="space-y-3">
            <div className="flex gap-x-1 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 basis-[10%]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Closed</p>
            </div>
            <div className="flex gap-x-1 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 basis-[10%]">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>Rp</p>
            </div>
            <div className="flex gap-x-1 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 basis-[10%]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Serves</p>
            </div>
            <div className="flex gap-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 basis-[10%]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <p className="text-sm basis-[90%] text-justify">{location}</p>
            </div>
          </div>
          <div className="flex flex-col justify-evenly">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-darkRed">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-darkRed">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
