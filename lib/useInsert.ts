import React, { useEffect, useState } from "react";
import { firestore } from "./firebase";

const DATA = [1, 2, 3];

const categories = [
  { id: "1", categoryName: "Bakso & Soto" },
  { id: "2", categoryName: "Bakery" },
  { id: "3", categoryName: "Beverages" },
  { id: "4", categoryName: "Chicken & Duck" },
  { id: "5", categoryName: "Chinese" },
  { id: "6", categoryName: "Coffee" },
  { id: "7", categoryName: "Fast Food" },
  { id: "8", categoryName: "Japanese" },
  { id: "9", categoryName: "Korean" },
  { id: "10", categoryName: "Martabak" },
  { id: "11", categoryName: "Middle Eastern" },
  { id: "12", categoryName: "Noodles" },
  { id: "13", categoryName: "Pizza & Pasta" },
  { id: "14", categoryName: "Rice" },
  { id: "15", categoryName: "Seafood" },
  { id: "16", categoryName: "Sweets" },
  { id: "17", categoryName: "Snacks" },
  { id: "18", categoryName: "Western" },
];

export default function useInsert() {
  const [users, setUser] = useState<any>(1);

  useEffect(() => {
    const insert = () => {
      const reducedArray = DATA.map((item: any) => {
        const categories = item.Category.split(", ").map((category: any) => category.trim());
        return {
          Category: categories,
          place_id: item.place_id,
        };
      });
      reducedArray.map((row: any) => {
        const place_id = row.place_id;
        const category = row.Category;

        const restaurantRef = firestore.collection("resto1").where("place_id", "==", place_id);
        restaurantRef
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                const docRef = firestore.collection("resto1").doc(doc.id);

                // Update the document fields
                docRef
                  .update({
                    category: category,
                  })
                  .then(() => {
                    console.log("Document updated successfully");
                  })
                  .catch((error) => {
                    console.error("Error updating document:", error);
                  });
              });
            } else {
              console.log("No matching documents found");
            }
          })
          .catch((error) => {
            console.error("Error fetching documents:", error);
          });
      });
    };
    const add = async () => {
      const batch = firestore.batch();

      categories.forEach((category) => {
        const categoryRef = firestore.collection("category").doc(category.id);
        batch.set(categoryRef, category);
      });

      try {
        await batch.commit();
        console.log("Bulk category addition successful.");
      } catch (error) {
        console.error("Error adding categories: ", error);
      }
    };
    const filter = (array: any) => {
      const newData = array.map((item: any) => {
        return {
          place_id: item["place_id"],
          Category: item["Category"],
        };
      });
      return newData;
    };

    // insert();
    // add();
  }, []);

  return users;
}
