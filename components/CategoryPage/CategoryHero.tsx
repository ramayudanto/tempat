import React from "react";

export default function CategoryHero({ name }: any) {
  const containerStyle = {
    // backgroundImage: `url("/categoryHeader/${name}.png")`,
    backgroundImage: `url("/categoryHeader/Japanese.png")`,
    backgroundSize: "cover",
  };
  return (
    <div className="h-[200px] mx-auto bg-right relative top-0 w-screen max-w-[420px]" style={containerStyle}>
      <div className="pt-3 absolute bg-white z-20 -bottom-[1px] w-screen rounded-t-xl" />
      <div className="bg-black w-full h-full bg-opacity-[0.33] flex pl-3 flex-col justify-end pb-10 space-y-3 text-white">
        <p className="font-semibold text-lg">{name}</p>
        <p className="text-sm">Most-loved & highly-reviewed restaurant, by and for Jakartans!</p>
      </div>
    </div>
  );
}
