// pages/_app.tsx
import type { AppProps } from "next/app";
import Script from "next/script";
import { useEffect } from "react";

import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user: FirebaseUser | null) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const snap = await getDoc(userRef);
          if (!snap.exists()) {
            // First time sign-in: create real user record
            await setDoc(userRef, {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              role: "creator", // default role
              createdAt: new Date().toISOString(),
            });
          }
        }
      }
    );
    return unsubscribe;
  }, []);

  return (
    <>
      {/* 1) Tailwind via CDN */}
      <Script
        src="https://cdn.tailwindcss.com"
        strategy="beforeInteractive"
      />

      {/* 2) Your app */}
      <Component {...pageProps} />
    </>
  );
}