import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

const Handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      // ...add more providers here
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXT_PUBLIC_SECRET,
  });

export default Handler;
