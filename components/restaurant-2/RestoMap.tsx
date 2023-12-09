import React from 'react'

export default function RestoMap(
    {restaurant}:
    {restaurant: any}
) {
  return (
  <a href={`https://www.google.com/maps/place/?q=place_id:${restaurant.place_id}`} target='_blank'>
    <img
    src={`https://maps.googleapis.com/maps/api/staticmap?center=${restaurant?.geometry.lat},${restaurant?.geometry.lng}
    &zoom=16
    &size=400x200
    &scale=2
    &maptype=terrain
    &key=${process.env.NEXT_PUBLIC_GOOGLEMAPS_KEY!}
    &markers=color:orange%7Clabel:T%7C${restaurant?.geometry.lat},${restaurant?.geometry.lng}`}
    className="rounded-lg"
    alt="-6.238472,106.815903"
  />
  </a>
  )
}
