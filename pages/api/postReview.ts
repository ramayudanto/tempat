import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { rate, restaurantId, user, comment } = req.body;
  if (comment.length !== 0) {
    try {
      await prisma.rating.create({
        data: {
          rate,
          restaurantId,
          user,
          comment,
        },
      });
      res.send("success");
      res.status(200);
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      await prisma.rating.create({
        data: {
          rate,
          restaurantId,
          user,
        },
      });
      res.send("success");
      res.status(200);
    } catch (e) {
      console.log(e);
    }
  }
  //   console.log(array);
}
