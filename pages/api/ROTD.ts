import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebase";
import { prisma } from "../../lib/prisma";

export default async function handler(req: any, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405);
    res.end();
    return;
  }
  const { q } = req.query;
  if (!q) {
    res.status(404);
    res.end();
    return;
  }
  try {
    const restaurantData = await prisma.restaurantV2.findUnique({
      where: {
        place_id: q,
        isPublic: true,
      },
      include: {
        categories: true,
        opening_hours: true,
        address_components: true,
      },
    });
    res.status(200).json(JSON.parse(JSON.stringify(restaurantData)));
  } catch (e) {
    console.log(e);
    res.status(404);
    res.end();
  }
}
