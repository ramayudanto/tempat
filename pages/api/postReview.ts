import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";

import { prisma } from "../../lib/prisma";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405);
    res.end();
    return;
  }
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401);
    res.end();
    return;
  }
  const { rate, restaurantId, comment } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
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
      res.status(400);
      res.end();
    }
  }
}
