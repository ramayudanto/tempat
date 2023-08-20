import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebase";

export default async function handler(req: any, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405);
    res.end();
    return;
  }
  const { q } = req.query;
  if (!q) {
    res.status(404);
    res.end();
    return;
  }
  try {
    const restaurantsRef = firestore.collection("resto1");
    const snapshot = await restaurantsRef.where("category", "array-contains", q).get();

    if (snapshot.empty) {
      res.status(404).json({ error: "Restaurant not found" });
      return;
    }

    const restaurantData = snapshot.docs.map((doc) => doc.data());
    res.status(200).json(JSON.parse(JSON.stringify(shuffleArray(restaurantData))));
  } catch (e) {
    console.log(e);
    res.status(404);
    res.end();
  }
}

function shuffleArray(array: any[]) {
  if (!array) return array;
  if (array.length < 10) return array;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomizedTop10(array: any[]) {
  const shuffledArray = shuffleArray([...array]);
  const first10Elements = shuffledArray.slice(0, 10);

  return first10Elements;
}
