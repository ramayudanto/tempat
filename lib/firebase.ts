// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const firestore = firebase.firestore();

export const getRestaurantImage = async (id: number) => {
  const restaurantIdRef = ref(storage, `/${id}/rating`);
  const res = await listAll(restaurantIdRef);
  const image = await Promise.all(
    res.items.map(async (item) => {
      const url = await getDownloadURL(item);
      return url;
    })
  );
  return image;
};

export const submitRate = async (imageFile: File, body: any) => {
  const { restaurantId } = body;
  if (imageFile) {
    const imageRef = ref(storage, `/${restaurantId}/rating/${imageFile!.name + v4()}`);
    await uploadBytes(imageRef, imageFile!);
    const imageUrl = await getDownloadURL(imageRef);
    await fetch(`/api/postReview`, {
      body: JSON.stringify({ ...body, imageUrl }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return imageUrl;
  } else {
    await fetch(`/api/postReview`, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return;
  }
};
