import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { rate, restaurantId, email, comment } = req.body;
  try {
    await prisma.rating.create({
      data: {
        rate,
        restaurantId,
        comment,
      },
    });
    res.send("success");
    res.status(200);
  } catch (e) {
    console.log(e);
  }

  //   console.log(array);
}
