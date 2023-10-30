import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: any, res: NextApiResponse) {
  //   if (req.method !== "POST") {
  //     res.status(405);
  //     res.end();
  //     return;
  //   }
  try {
    // const after = translate(resto);

    res.json({ success: true, data: 1 });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, data: "gagal" });
    res.end();
  }
}

function translate(jsonArray: any[]) {
  return jsonArray.map((item) => {
    const { opening_hours, geometry, ...rest } = item.result;
    const { location } = geometry;
    const { lat, lng } = location;

    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const transformedHours: any = {};

    opening_hours.weekday_text.forEach((text: string, index: number) => {
      const day = daysOfWeek[index];
      const hours = text.split(": ")[1];
      transformedHours[day] = hours === "Open 24 hours" ? "24" : hours;
    });

    return {
      ...rest,
      opening_hours: transformedHours,
      geometry: {
        lat,
        lng,
      },
    };
  });
}
