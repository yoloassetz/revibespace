// components/Header.tsx
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, provider, db } from "../lib/firebase";
import ConnectWallet from "./ConnectWallet";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const snap = await getDoc(doc(db, "users", u.uid));
        setRole(snap.exists() ? (snap.data()!.role as string) : null);
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLogin = () => signInWithPopup(auth, provider);
  const handleLogout = () => signOut(auth);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="text-2xl font-bold">
          ReVibe Space
        </Link>

        {/* Center: Nav Links */}
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-gray-200 transition">
            Home
          </Link>
          <Link href="/campaigns" className="hover:text-gray-200 transition">
            All Campaigns
          </Link>
          {role === "creator" && (
            <Link href="/creator" className="hover:text-gray-200 transition">
              My Submissions
            </Link>
          )}
          {role === "brand" && (
            <Link href="/brand" className="hover:text-gray-200 transition">
              Brand Dashboard
            </Link>
          )}
        </div>

        {/* Right: Wallet + Auth */}
        <div className="flex items-center space-x-4">
          {/* Wallet only for creators */}
          {!loading && user && role === "creator" && <ConnectWallet />}

          {/* Auth buttons */}
          {!loading && (user ? (
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
          ))}
        </div>
      </div>
    </nav>
  );
}