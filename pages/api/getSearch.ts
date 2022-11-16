import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

const removeDuplicate = (arr: any[]) => {
  const filtered = arr.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name));
  return filtered;
};

export default async function handler(req: any, res: NextApiResponse) {
  const { q } = req.query;
  try {
    const dataName = await prisma.restaurant.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
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
    const dataPlace = await prisma.restaurant.findMany({
      where: {
        OR: [
          {
            location: {
              in: q,
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        category: true,
        featureImage: {
          select: { URL: true },
        },
        rating: true,
      },
    });
    const dataCategory = await prisma.restaurant.findMany({
      where: {
        OR: [
          {
            category: {
              some: {
                categoryName: {
                  in: q,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            category: {
              some: {
                categoryName: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      include: {
        category: true,
        featureImage: {
          select: { URL: true },
        },
        rating: true,
      },
    });
    const data = [...dataName, ...dataCategory, ...dataPlace];
    res.send(removeDuplicate(shuffle(data)));
    res.status(200);
    res.end();
  } catch (e) {
    res.status(404);
    console.log(e);
  }
}
