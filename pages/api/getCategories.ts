import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

function getMultipleRandom(arr: any, num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

export default async function handler(req: any, res: NextApiResponse) {
  const { category } = req.query;
  try {
    const data = await prisma.restaurant.findMany({
      where: {
        category: {
          some: {
            categoryName: category,
          },
        },
      },
      include: {
        category: true,
        featureImage: {
          select: { URL: true },
        },
        rating: true,
      },
    });

    res.send(getMultipleRandom(data, 8));
    res.status(200);
    res.end();
  } catch (e) {
    console.log(e);
  }
}
