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
  if (req.method !== "GET") {
    res.status(405);
    res.end();
    return;
  }
  const { q } = req.query;
  // if (!q) {
  //   res.status(404);
  //   res.end();
  //   return;
  // }
  try {
    const dataName = await prisma.restaurantV2.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      include: {
        categories: true,
        opening_hours: true,
        address_components: true,
      },
    });
    // get all restaurant with a certain category based on the query
    // so for example if the query is "burger" then we will get all restaurant that has "burger" category
    const dataCategory = await prisma.restaurantV2.findMany({
      where: {
        categories: {
          some: {
            name: {
              contains: q,
              mode: "insensitive",
            },
          },
        },
      },
      include: {
        categories: true,
        opening_hours: true,
        address_components: true,
      },
    });
    // get all restaurant with a certain place based on the query
    // so for example if the query is "jakarta" then we will get all restaurant that has "jakarta" in their address
    const dataPlace = await prisma.restaurantV2.findMany({
      where: {
        OR: [
          {
            address_components: {
              every: {
                long_name: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            address_components: {
              every: {
                short_name: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      include: {
        categories: true,
        opening_hours: true,
        address_components: true,
      },
    });

    // const dataPlace = await prisma.restaurantV2.findMany({
    //   where: {
    //     OR: [
    //       {
    //         address_components: {
    //           every: {
    //             long_name: {
    //               contains: q,
    //               mode: "insensitive",
    //             },
    //           },
    //         },
    //       },
    //       {
    //         address_components: {
    //           every: {
    //             short_name: {
    //               contains: q,
    //               mode: "insensitive",
    //             },
    //           },
    //         },
    //       },
    //     ],
    //   },
    //   include: {
    //     categories: true,
    //   },
    // });
    // const dataCategory = await prisma.restaurantV2.findMany({
    //   where: {
    //     OR: [
    //       {
    //         categories: {
    //           some: {
    //             name: {
    //               in: q,
    //               mode: "insensitive",
    //             },
    //           },
    //         },
    //       },
    //       {
    //         categories: {
    //           some: {
    //             name: {
    //               contains: q,
    //               mode: "insensitive",
    //             },
    //           },
    //         },
    //       },
    //     ],
    //   },
    //   include: {
    //     categories: true,
    //   },
    // });
    // const data = [...dataName, ...dataCategory, ...dataPlace];
    const data = [...dataName, ...dataCategory, ...dataPlace];
    res.send(removeDuplicate(shuffle(data)));
    res.status(200);
    res.end();
  } catch (e) {
    console.log(e);
    res.status(400);
    res.end();
  }
}
