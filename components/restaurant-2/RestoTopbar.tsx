import React, { useContext } from "react";
import { ActiveSectionContext } from "../../pages/restos/[routeName]";

export default function RestoTopbar() {
  const { activeSection, menuDivRef, aboutDivRef, facilityDivRef, reviewDivRef, othersDivRef } = useContext(ActiveSectionContext);
  const sections = ["about", "menu", "facility", "review", "others"];
  return (
    <div className={`fixed top-0 max-w-[420px] mx-auto left-0 right-0 z-20 bg-white flex justify-around text-red-600 text-sm`}>
      {sections.map((section: string, i: number) => {
        return (
          <div
            className={`border-b-4 border-white capitalize py-3 px-2 ${section === activeSection && "border-red-600"}`}
            key={i}
            onClick={() => {
              if (section === "about") aboutDivRef.current.scrollIntoView({ behavior: "smooth" });
              if (section === "menu") menuDivRef.current.scrollIntoView({ behavior: "smooth" });
              if (section === "facility") facilityDivRef.current.scrollIntoView({ behavior: "smooth" });
              if (section === "review") reviewDivRef.current.scrollIntoView({ behavior: "smooth" });
              if (section === "others") othersDivRef.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <p>{section}</p>
          </div>
        );
      })}
    </div>
  );
}
