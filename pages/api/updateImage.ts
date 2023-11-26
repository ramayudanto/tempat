import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    res.status(405);
    res.end();
    return;
  }

  const { key, place_id, resto_image, menu_image }: { key: string; place_id: string; resto_image: string[]; menu_image: string[] } = req.body;

  if (key !== process.env.NEXT_PUBLIC_ADD_RESTO!) {
    res.status(401);
    res.send("Wrong key");
    res.end();
    return;
  }

  try {
    await prisma.restaurantV2.update({
      where: {
        place_id,
      },
      data: {
        Image: {
          push: resto_image,
        },
        menu: {
          upsert: {
            create: {
              image: menu_image,
            },
            update: {
              image: {
                push: menu_image,
              },
            },
          },
        },
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, error: e });
    res.end();
  }
}
