import React from "react";

export default function RestoTopbar({ sections, currentSection }: any) {
  return (
    <div className={`fixed top-0 max-w-[420px] mx-auto left-0 right-0 z-20 bg-white flex justify-around text-red-600 text-sm`}>
      {sections.map((section: string, i: number) => {
        return (
          <div className={`border-b-2 border-white py-3 px-2 ${section === currentSection && "border-red-600"}`} key={i}>
            <p>{section}</p>
          </div>
        );
      })}
    </div>
  );
}
