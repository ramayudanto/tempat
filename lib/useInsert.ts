import React, { useEffect, useState } from "react";
import { firestore } from "./firebase";

const DATA = [{ place_id: "1", gofood_name: "kfc", Category: "Fast Food", thumbnail: "1" }];

export default function useInsert() {
  const [users, setUser] = useState<any>(1);

  useEffect(() => {
    const insert = () => {
      DATA.map((row) => {
        const place_id = row.place_id;
        const gofood_name = row.gofood_name;
        const category = row.Category;
        const thumbnail = row.thumbnail;

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
                    gofood_name: gofood_name,
                    category: category,
                    thumbnail: thumbnail,
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

    // insert();
  }, []);

  return users;
}
