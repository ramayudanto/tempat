import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { authOptions } from "./auth/[...nextauth]";
import { decryptAES } from "../../lib/logic";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
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
  const email = session?.user?.email!;
  const { username, encryptedOldPassword, name, encryptedNewPassword } = req.body;

  const newPassword = decryptAES(encryptedNewPassword);
  const oldPassword = decryptAES(encryptedOldPassword);

  if (!oldPassword) {
    try {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          username,
          name,
        },
      });
      res.status(200);
      res.end();
    } catch (e) {
      console.log(e);
      res.status(400);
      res.end();
    }
  } else {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      // send res with 401 error
      res.status(401);
      res.end();
    }
    const passwordMatch = await bcrypt.compare(oldPassword, user?.hashedPassword!);
    if (!passwordMatch) {
      // send res with 401 error
      res.status(200);
      res.end();
    }
    const hashedPassword: string = await bcrypt.hash(newPassword, 12);
    try {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          username,
          name,
          hashedPassword,
        },
      });
      res.status(200);
      res.end();
    } catch (e) {
      console.log(e);
      res.status(400);
      res.end();
    }
  }
}
