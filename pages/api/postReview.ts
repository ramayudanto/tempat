import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { rate, restaurantId, email, comment } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (comment.length !== 0) {
    try {
      await prisma.rating.create({
        data: {
          id: uuidv4(),
          rate,
          restaurantId,
          userId: user?.id,
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
          id: uuidv4(),
          rate,
          restaurantId,
          userId: user?.id,
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
