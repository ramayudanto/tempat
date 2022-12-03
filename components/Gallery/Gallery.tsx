import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getRestaurantImage } from "../../lib/firebase";
import Header from "../Head/Header";
import HeaderSection from "./HeaderSection";

const categoryList: string[] = ["All", "Food", "Ambience", "Rating"];

export default function Gallery({ setIsGalleryOpen, restaurant }: any) {
  const [category, setCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRestaurantImage(restaurant.id);
      setPhotos([restaurant?.featureImage[0]?.URL, ...data]);
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <>
      <Header title={`${restaurant.name} Gallery`} />
      <HeaderSection restaurant={restaurant} setIsGalleryOpen={setIsGalleryOpen} />
      <div className="flex items-center gap-x-4 mt-5 mx-4">
        {categoryList.map((item: string, i: number) => {
          return (
            <div
              className={`py-1 border-b-2 rounded-sm ${item === category ? "border-lightRed" : "border-white"}`}
              key={i}
              onClick={() => {
                setCategory(item);
              }}
            >
              <p>{item}</p>
            </div>
          );
        })}
      </div>
      {isLoading ? (
        <p className="text-center mt-10">Loading</p>
      ) : (
        <div className="mx-4 mt-5 grid grid-cols-3 gap-3">
          {photos.map((item: any, i: any) => {
            return <Image className="rounded-lg" src={item} key={i} width={150} height={150} alt={"test"} objectFit={"cover"} />;
          })}
        </div>
      )}
    </>
  );
}
