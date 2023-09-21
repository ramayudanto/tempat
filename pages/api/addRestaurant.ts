import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: any, res: NextApiResponse) {
  //   if (req.method !== "POST") {
  //     res.status(405);
  //     res.end();
  //     return;
  //   }
  const restaurantData: any[] = req.body;
  try {
    restaurantData.forEach(async (restaurant: any) => {
      await prisma.restaurantV2.create({
        data: {
          gofood_name: restaurant.gofood_name,
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
          thumbnail: restaurant.thumbnail,
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
    res.status(200).json({ success: true, data: "sukses" });
    res.end();
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, data: "gagal" });
    res.end();
  }
}
