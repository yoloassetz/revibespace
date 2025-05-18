// pages/become-brand.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export default function BecomeBrand() {
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // If not logged in, send to home
        router.replace("/");
        return;
      }
      setUid(user.uid);

      // If already a brand, send to Brand Dashboard
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists() && snap.data().role === "brand") {
        router.replace("/brand");
      } else {
        setLoading(false);
      }
    });
    return unsub;
  }, [router]);

  const applyBrand = async () => {
    if (!uid) return;
    await updateDoc(doc(db, "users", uid), { role: "brand" });
    router.replace("/brand");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-6">
      <h1 className="text-3xl font-semibold">Become a Brand</h1>
      <p className="text-center max-w-md">
        By becoming a brand, you can create and manage campaigns to engage
        creators and showcase your products.
      </p>
      <button
        onClick={applyBrand}
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
      >
        Apply Now
      </button>
    </div>
  );
}