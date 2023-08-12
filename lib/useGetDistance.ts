import { useContext, useEffect, useState } from "react";
import { CoordinateContext } from "../pages/_app";

export default function useGetDistance(destination: string) {
  const { latitude, longitude } = useContext(CoordinateContext);
  const [distance, setDistance] = useState<string | null>(null);

  useEffect(() => {
    if (!latitude && !longitude) return;
    const getData = async () => {
      const res = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=place_id:${destination}&origins=${latitude + "%2C" + longitude}&key=${process.env.NEXT_PUBLIC_MAPS_API!}`);
      const data = await res.json();
      setDistance(data?.rows[0]?.elements[0]?.distance.text);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude, destination]);

  return distance;
}
