import Shimmer from "./Shimmer";

export default function SkeletonWrapper({ type }: any) {
  const getClass = (type: String) => {
    if (type === "card") {
      return "w-[274px] h-[190px]";
    }
    if (type === "header") {
      return "w-[60%] h-4";
    }
    if (type === "button") {
      return "w-[10%] h-4";
    }
  };
  return <div className={`bg-[#ddd] mx-4 shrink-0 rounded-lg my-2 relative ${getClass(type)}`}>{<Shimmer />}</div>;
}
