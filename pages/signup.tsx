// pages/signup.tsx
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, provider, db } from "../lib/firebase";
import {
  signInWithPopup,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      if (!user) {
        setLoading(false);
        return;
      }
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid:         user.uid,
          displayName: user.displayName,
          email:       user.email,
          photoURL:    user.photoURL,
          role:        "",
          createdAt:   new Date().toISOString(),
        });
      }
      const data = (await getDoc(userRef)).data() as any;
      router.replace(data.role ? `/${data.role}` : "/select-role");
    });
    return () => unsub();
  }, [router]);

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
      alert("Google sign-in failed");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p>Checking authentication…</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Sign Up • ReVibe Space</title>
      </Head>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow text-center">
          <h1 className="text-2xl font-bold mb-6">Welcome to ReVibe Space</h1>
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}