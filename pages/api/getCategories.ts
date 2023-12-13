import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebase";
import { prisma } from "../../lib/prisma";

export default async function handler(req: any, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405);
    res.end();
    return;
  }
  const { category } = req.query;
  if (!category) {
    res.status(404);
    res.end();
    return;
  }
  try {
    const restaurantData = await prisma.restaurantV2.findMany({
      where: {
        categories: {
          some: {
            name: category,
          },
        },
        isPublic: true,
      },
      select: {
        gofood_name: true,
        address_components: true,
        rating: true,
        user_ratings_total: true,
        categories: true,
        price_level: true,
        thumbnail: true,
        OpeningHoursV2: true,
        place_id: true,
        ratingCount: true,
        ratingSum: true,
      },
    });
    res.status(200).json(JSON.parse(JSON.stringify(shuffleArray(restaurantData))));
  } catch (e) {
    console.log(e);
    res.status(404);
    res.end();
  }
}

function shuffleArray(array: any[]) {
  if (!array) return array;
  if (array.length < 10) return array;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomizedTop10(array: any[]) {
  const shuffledArray = shuffleArray([...array]);
  const first10Elements = shuffledArray.slice(0, 10);

  return first10Elements;
}
