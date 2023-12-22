import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401);
    res.end();
    return;
  }
  if (req.method === "DELETE") {
    const { ratingId } = req.body;

    // Retrieve the rating to get its score and associated restaurant ID
    const rating = await prisma.rating.findUnique({
      where: { id: ratingId },
    });

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    // return 401 if user is not rating owner
    if (rating.userId !== session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //   // Delete the rating
    //   await prisma.rating.delete({
    //     where: { id: ratingId },
    //   });

    //   // Update the restaurant's rating sum and count
    //   await prisma.restaurantV2.update({
    //     where: {
    //       id: rating.restaurantId!,
    //     },

    //     //   where: { id: rating.restaurantId },
    //     data: {
    //       ratingSum: {
    //         decrement: rating.rate,
    //       },
    //       ratingCount: {
    //         decrement: 1,
    //       },
    //     },
    //   });

    res.status(200).json({ message: "Rating deleted successfully" });
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  //   res.status(200).json({ message: "Rating deleted successfully", session });
}
