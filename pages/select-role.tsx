// pages/select-role.tsx
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export default function SelectRolePage() {
  const router = useRouter();

  // If someone hits /select-role while not signed in, send them back
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace("/signup");
      }
    });
    return unsub;
  }, [router]);

  const choose = async (role: "creator" | "brand") => {
    const u = auth.currentUser;
    if (!u) return router.replace("/signup");
    // Update their Firestore doc
    await updateDoc(doc(db, "users", u.uid), { role });
    // Send them to their dashboard
    router.replace(`/${role}`);
  };

  return (
    <>
      <Head>
        <title>Select Your Role • ReVibe Space</title>
      </Head>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-16">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow text-center space-y-6">
          <h1 className="text-2xl font-bold">I am a…</h1>
          <button
            onClick={() => choose("creator")}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Creator
          </button>
          <button
            onClick={() => choose("brand")}
            className="w-full border-2 border-purple-600 text-purple-600 py-2 rounded-md hover:bg-purple-50 transition"
          >
            Brand
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}