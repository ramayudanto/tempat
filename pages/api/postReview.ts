import { Rating } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";

import { prisma } from "../../lib/prisma";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405);
    res.end();
    return;
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401);
    res.end();
    return;
  }
  const { rate, restaurantId, comment, image } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
    select: {
      id: true,
    },
  });

  const data: Rating = {
    id: uuidv4(),
    rate,
    restaurantId,
    userId: user!.id,
    comment,
    imageUrl: String(image),
    postDate: new Date(),
  };

  try {
    await prisma.rating.create({
      data,
    });

    await prisma.restaurantV2.update({
      where: { id: restaurantId },
      data: {
        ratingSum: {
          increment: rate,
        },
        ratingCount: {
          increment: 1,
        },
      },
    });

    res.send("success");
    res.status(200);
  } catch (e) {
    console.log(e);
  }
}
