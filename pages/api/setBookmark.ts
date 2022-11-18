import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "../../lib/prisma";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    res.status(400);
    res.end();
    return;
  }
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401);
    res.end();
    return;
  }
  const { routeName } = req.body;
  const email = session?.user?.email!;

  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        bookmark: {
          connect: {
            routeName,
          },
        },
      },
    });
    res.status(200);
    res.end();
  } catch (e) {
    console.log(e);
    res.status(409);
    res.end();
  }
}
