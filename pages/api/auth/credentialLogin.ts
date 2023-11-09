import { Rating } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

import { prisma } from "../../../lib/prisma";
import { authOptions } from "./[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405);
    res.end();
    return;
  }
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Missing fields" });
    res.end();
    return;
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    res.status(400).json({ error: "User already exists" });
    res.end();
    return;
  }
  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
        return;
      } else {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            hashedPassword: hash,
          },
        });

        const session = await getServerSession({ req, ...authOptions });
        // session!.set("user", user);
        res.status(200).json({ success: true });
        res.end();
      }
    });
  } catch (e) {
    console.log(e);
  }
}
