// components/Header.tsx
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "../lib/firebase";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // watch auth + load Firestore role
  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const snap = await getDoc(doc(db, "users", u.uid));
        setRole(snap.exists() ? (snap.data().role as string) : null);
      } else {
        setRole(null);
      }
      setLoading(false);
    });
  }, []);

  const handleLogin = async () => {
    try {
      const { user: u } = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", u.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid:         u.uid,
          displayName: u.displayName,
          email:       u.email,
          photoURL:    u.photoURL,
          role:        "",               // still need to pick
          createdAt:   new Date().toISOString(),
        });
        return router.push("/select-role");
      }
      const data = snap.data();
      if (data.role === "creator") router.push("/creator");
      else if (data.role === "brand") router.push("/brand");
      else router.push("/select-role");
    } catch {
      alert("Sign-in failed");
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setRole(null);
      router.push("/");
    });
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          ReVibe Space
        </Link>

        {/* nav links */}
        <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-2 md:space-y-0">
          <Link href="/" className="hover:text-gray-200 transition">
            Home
          </Link>

          {/* only creators see All Campaigns */}
          {!loading && role === "creator" && (
            <Link href="/campaigns" className="hover:text-gray-200 transition">
              All Campaigns
            </Link>
          )}

          {/* unified Dashboard link */}
          {!loading && user && role && (
            <Link
              href={role === "creator" ? "/creator" : "/brand"}
              className="hover:text-gray-200 transition"
            >
              Dashboard
            </Link>
          )}

          {/* auth / profile */}
          {!loading ? (
            user ? (
              <div className="flex items-center space-x-3">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "avatar"}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                )}
                <span className="font-medium">{user.displayName}</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 bg-white bg-opacity-20 px-3 py-1 rounded hover:bg-opacity-30 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-white bg-opacity-20 px-4 py-2 rounded hover:bg-opacity-30 transition"
              >
                Sign In
              </button>
            )
          ) : (
            <span className="text-gray-200">…</span>
          )}
        </div>
      </div>
    </nav>
  );
}