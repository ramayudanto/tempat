import Image from "next/image";
import React, { useContext } from "react";
import { ImageContext } from "../../pages/account/edit";

const images = [
  "https://ramayudanto.com/wp-content/uploads/2022/11/Profile-picture.png",
  "https://ramayudanto.com/wp-content/uploads/2022/11/Profile-picture-1.png",
  "https://ramayudanto.com/wp-content/uploads/2022/11/Profile-picture-2.png",
  "https://ramayudanto.com/wp-content/uploads/2022/11/Profile-picture-3.png",
  "https://ramayudanto.com/wp-content/uploads/2022/11/Profile-picture-4.png",
  "https://ramayudanto.com/wp-content/uploads/2022/11/Profile-picture-5.png",
  "https://ramayudanto.com/wp-content/uploads/2022/11/Profile-picture-6.png",
  "https://ramayudanto.com/wp-content/uploads/2022/11/Profile-picture-7.png",
  "https://ramayudanto.com/wp-content/uploads/2022/11/Profile-picture-8.png",
  "https://ramayudanto.com/wp-content/uploads/2022/11/Profile-picture-9.png",
  "https://ramayudanto.com/wp-content/uploads/2022/11/Profile-picture-10.png",
  "https://ramayudanto.com/wp-content/uploads/2022/11/Profile-picture-11.png",
  "https://ramayudanto.com/wp-content/uploads/2022/11/Profile-picture-12.png",
  "https://ramayudanto.com/wp-content/uploads/2022/11/Profile-picture-13.png",
];

export default function SelectImage({ close }: any) {
  const { image, setImage } = useContext(ImageContext);
  return (
    <div className="w-screen h-screen fixed z-20 top-0 bg-white pt-20">
      <div className="grid grid-cols-4 gap-5 my-10 mx-1">
        {images.map((item: string, i: any) => {
          return (
            <div
              key={i}
              className={`w-[68px] h-[68px] relative rounded-full ${image === item && "border-4 border-black"}`}
              onClick={() => {
                setImage(item);
                close();
              }}
            >
              <Image src={item} layout="fill" alt={"Image " + (i + 1)} />
            </div>
          );
        })}
      </div>
      <p className="text-darkGray text-center text-opacity-70 hover:underline" onClick={close}>
        cancel
      </p>
    </div>
  );
}
