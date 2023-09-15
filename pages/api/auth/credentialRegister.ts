import { Rating } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import validator from "validator";

import { prisma } from "../../../lib/prisma";
import { authOptions } from "./[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405);
    res.end();
    return;
  }
  const { email, password, name } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Missing fields" });
    res.end();
    return;
  }
  //   const isEmailValid = validator.isEmail(email, {
  //     domain_specific_validation: true,
  //   });

  //   if (!isEmailValid) {
  //     res.status(400).json({ error: "Invalid email" });
  //     res.end();
  //     return;
  //   }

  //   const userExists = await prisma.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   });

  //   if (userExists) {
  //     res.status(400).json({ error: "User already exists" });
  //     res.end();
  //     return;
  //   }

  let isSuccess: boolean;

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log(err);
      res.end();
      return;
    } else {
      try {
        await prisma.user.create({
          data: {
            id: uuidv4(),
            name,
            email,
            hashedPassword: hash,
          },
        });

        // const session = await getServerSession({ req, ...authOptions });
        // session!.set("user", user);
        isSuccess = true;
        res.status(200).json({ success: true });
        res.end();
        return;
      } catch (err: any) {
        isSuccess = false;
        if (err.meta.target.includes("email")) {
          res.status(400).json({ error: "Email already exists" });
          res.end();
          return;
        } else {
          res.status(400).json({ error: "Something went wrong" });
          res.end();
          return;
        }
      }
    }
  });
}
