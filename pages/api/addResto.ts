import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405);
    res.end();
    return;
  }

  const { category, thumbnail, place_id, key }: { category: string; thumbnail: string; place_id: string; key: string } = req.body;

  if (key !== process.env.NEXT_PUBLIC_ADD_RESTO!) {
    res.status(401);
    res.send("Wrong key");
    res.end();
    return;
  }

  // fetch to google api
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.NEXT_PUBLIC_GOOGLEMAPS_KEY!}&place_id=${place_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  try {
    const restaurantDataCleaned = formatData(data, category);

    restaurantDataCleaned.forEach(async (restaurant: any) => {
      await prisma.restaurantV2.create({
        data: {
          gofood_name: restaurant.name,
          name: restaurant.name,
          formatted_address: restaurant.formatted_address,
          formatted_phone_number: restaurant.formatted_phone_number,
          international_phone_number: restaurant.international_phone_number,
          opening_hours: {
            create: {
              monday: restaurant.opening_hours.monday,
              tuesday: restaurant.opening_hours.tuesday,
              wednesday: restaurant.opening_hours.wednesday,
              thursday: restaurant.opening_hours.thursday,
              friday: restaurant.opening_hours.friday,
              saturday: restaurant.opening_hours.saturday,
              sunday: restaurant.opening_hours.sunday,
            },
          },
          place_id: restaurant.place_id,
          rating: restaurant.rating,
          user_ratings_total: restaurant.user_ratings_total,
          vicinity: restaurant.vicinity,
          website: restaurant.website,
          geometry: {
            create: {
              lat: restaurant.geometry.lat,
              lng: restaurant.geometry.lng,
            },
          },
          thumbnail: thumbnail || null,
          icon: restaurant.icon,
          icon_mask_base_uri: restaurant.icon_mask_base_uri,
          // connect or create category
          categories: {
            connectOrCreate: restaurant.category.map((category: any) => {
              return {
                where: { name: category },
                create: { name: category },
              };
            }),
          },
          address_components: {
            connectOrCreate: restaurant.address_components.map((address: any) => ({
              where: {
                long_name: address.long_name,
              },
              create: {
                long_name: address.long_name,
                short_name: address.short_name,
                types: address.types,
              },
            })),
          },
          // serves what
          serves_beer: restaurant.serves_beer,
          serves_breakfast: restaurant.serves_breakfast,
          serves_brunch: restaurant.serves_brunch,
          serves_dinner: restaurant.serves_dinner,
          serves_lunch: restaurant.serves_lunch,
          serves_vegetarian_food: restaurant.serves_vegetarian_food,
          serves_wine: restaurant.serves_wine,
          takeout: restaurant.takeout,
          dine_in: restaurant.dine_in,
          delivery: restaurant.delivery,
          curbside_pickup: restaurant.curbside_pickup,
          price_level: restaurant.price_level,
          reference: restaurant.reference,
          types: restaurant.types,
        },
      });
    });
    res.json({ success: true, data: "sukses" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, data: "gagal" });
    res.end();
  }
}

export function formatData(jsonArray: any[], category: string) {
  return jsonArray.map((item) => {
    const { opening_hours, geometry, address_components, ...rest } = item.result;
    const { location } = geometry;
    const { lat, lng } = location;

    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const transformedHours: any = {};

    const formattedAddressComponentsFilter = address_components
      .filter((component: any) => {
        return component.types[0] !== "premise" && component.types[0] !== "subpremise";
      })
      .map((component: any) => {
        return {
          long_name: component.long_name,
          short_name: component.short_name,
          types: component.types[0],
        };
      });

    opening_hours.weekday_text.forEach((text: string, index: number) => {
      const day = daysOfWeek[index];
      const hours = text.split(": ")[1];
      transformedHours[day] = hours === "Open 24 hours" ? "24" : hours;
    });

    const categories = transformStringToArray(category);

    return {
      ...rest,
      opening_hours: transformedHours,
      geometry: {
        lat,
        lng,
      },
      address_components: formattedAddressComponentsFilter,
      categories,
    };
  });
}

function transformStringToArray(inputString: string) {
  if (typeof inputString === "string") {
    if (inputString.includes(", ")) {
      return inputString.split(", ");
    } else {
      return [inputString];
    }
  } else {
    return [];
  }
}
