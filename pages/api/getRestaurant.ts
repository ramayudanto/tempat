import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

export default async function handler(req: any, res: NextApiResponse) {
  const { category } = req.query;
  try {
    const data = await prisma.category.findUnique({
      where: {
        categoryName: category,
      },
      include: {
        restaurant: {
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
          },
          take: 10,
        },
      },
    });

    res.send(data);
    res.status(200);
    res.end();
  } catch (e) {
    console.log(e);
  }
  //   console.log(array);
}
