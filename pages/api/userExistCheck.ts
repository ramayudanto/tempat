import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: any, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405);
    res.end();
    return;
  }
  const { email } = req.body;

  if (!email) {
    res.status(400);
    res.end();
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    // await prisma.restaurant.create({
    //   data: {
    //     name: "test",
    //     locationBroad: "kuningan",
    //     location: "Kuningan",
    //     priceRange: "100000",
    //     openTime: "1970-01-01T03:00:00.000Z",
    //     closeTime: "1970-01-01T03:00:00.000Z",
    //     featureImage: {
    //       create: {
    //         URL: "test",
    //       },
    //     },
    //     category: {
    //       create: [{
    //         categoryName: "test",
    //       },]
    //     },
    //   },
    // });
    if (user) {
      res.status(200).json({ userExists: true });
    } else {
      res.status(200).json({ userExists: false });
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    res.end();
  }
}
