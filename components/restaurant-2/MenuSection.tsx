import React from "react";

export default function MenuSection({ restaurant, divRef }: any) {
  return (
    <div className="pb-[100vh]" ref={divRef}>
      <p className="text-[#333] text-sm font-semibold">Menu</p>
      <p className="text-[#333] text-xs text-opacity-60">Full Menu</p>
    </div>
  );
}
