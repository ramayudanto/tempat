import { useContext } from "react";
import { ActiveSectionContext } from "../../pages/restos/[routeName]";

export default function MenuSection({ restaurant }: any) {
  const { menuRef, menuDivRef } = useContext(ActiveSectionContext);

  return (
    <div className="h-[30vh]" ref={menuDivRef}>
      <p className="text-[#333] text-sm font-semibold">Menu</p>
      <p className="text-[#333] text-xs text-opacity-60" ref={menuRef}>
        Full Menu
      </p>
    </div>
  );
}
