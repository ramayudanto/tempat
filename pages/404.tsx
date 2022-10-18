import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Notfound() {
  const router = useRouter();
  useEffect(() => {
    const push = setTimeout(() => {
      router.push("/");
    }, 2000);
    return () => clearTimeout(push);
  }, []);
  return (
    <div>
      <p>salah route</p>
    </div>
  );
}
