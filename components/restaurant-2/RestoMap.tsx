import React from "react";

export default function RestoMap({ restaurant }: { restaurant: any }) {
  return (
    <a href={`https://www.google.com/maps/place/?q=place_id:${restaurant.place_id}`}>
      <img
        src={`https://maps.googleapis.com/maps/api/staticmap?center=${restaurant?.GeometryV2.lat},${restaurant?.GeometryV2.lng}
    &zoom=16
    &size=400x200
    &scale=2
    &maptype=terrain
    &key=${process.env.NEXT_PUBLIC_GOOGLEMAPS_KEY!}
    &markers=color:orange%7Clabel:T%7C${restaurant?.GeometryV2.lat},${restaurant?.GeometryV2.lng}`}
        className="rounded-lg"
        alt="-6.238472,106.815903"
      />
    </a>
  );
}
