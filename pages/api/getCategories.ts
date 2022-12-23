import type { NextApiRequest, NextApiResponse } from "next";
import { getMultipleRandom } from "../../lib/logic";
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
    // const data = await prisma.restaurant.findMany({
    //   where: {
    //     category: {
    //       some: {
    //         categoryName: category,
    //       },
    //     },
    //   },
    //   include: {
    //     category: true,
    //     featureImage: {
    //       select: { URL: true },
    //     },
    //     rating: true,
    //   },
    // });

    const restoran = await prisma.restaurant.findMany({
      where: {
        category: {
          some: {
            categoryName: category,
          },
        },
      },
      select: {
        name: true,
        locationBroad: true,
        priceRange: true,
        openTime: true,
        closeTime: true,
        featureImage: {
          select: {
            URL: true,
          },
        },
        routeName: true,
        rating: {
          select: {
            rate: true,
          },
        },
        category: {
          select: {
            categoryName: true,
          },
        },
        userBookmark: {
          select: {
            email: true,
          },
        },
      },
      // take: 10,
      // skip,
    });

    res.send(getMultipleRandom(restoran, 8));
    res.status(200);
    res.end();
  } catch (e) {
    console.log(e);
    res.status(404);
    res.end();
  }
}
