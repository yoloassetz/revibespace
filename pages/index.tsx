// pages/index.tsx

import Head from "next/head";
import { useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, provider, db } from "../lib/firebase";

export default function Home() {
  // 1) Firebase Auth user + loading
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // 2) Firestore profile + loading
  const [profile, setProfile] = useState<{ role: string } | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // 3) Campaigns + loading
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);

  // Listen for auth changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoadingAuth(false);
    });
    return () => unsub();
  }, []);

  // When authUser changes, fetch their profile doc
  useEffect(() => {
    const fetchProfile = async () => {
      if (!authUser) {
        setProfile(null);
        setLoadingProfile(false);
        return;
      }
      setLoadingProfile(true);
      try {
        const userSnap = await getDoc(doc(db, "users", authUser.uid));
        if (userSnap.exists()) {
          const data = userSnap.data();
          setProfile({ role: data.role });
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        setProfile(null);
      }
      setLoadingProfile(false);
    };
    fetchProfile();
  }, [authUser]);

  // Fetch campaigns once
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const snap = await getDocs(collection(db, "campaigns"));
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setCampaigns(data);
      } catch (err) {
        console.error("Error loading campaigns:", err);
      }
      setLoadingCampaigns(false);
    };
    fetchCampaigns();
  }, []);

  // Auth handlers
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setAuthUser(result.user);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  const handleLogout = async () => {
    await signOut(auth);
    setAuthUser(null);
    setProfile(null);
  };

  return (
    <>
      <Head>
        <title>ReVibe Space</title>
        <meta
          name="description"
          content="Where creators and brands meet authentically"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <h1 className="text-2xl font-bold">ReVibe Space</h1>
            <nav className="space-x-4 text-center">
              <a
                href="#campaigns"
                className="text-blue-600 hover:underline"
              >
                Campaigns
              </a>
              <a
                href="#submit"
                className="text-blue-600 hover:underline"
              >
                Submit Review
              </a>
              <a
                href="/creator"
                className="text-blue-600 hover:underline"
              >
                Creator Dashboard
              </a>
              <a
                href="/brand"
                className="text-blue-600 hover:underline"
              >
                Brand Dashboard
              </a>

              {/* SHOW "Become Brand" ONLY when profile.role === "creator" */}
              {!loadingProfile &&
                authUser &&
                profile?.role === "creator" && (
                  <a
                    href="/become-brand"
                    className="text-green-600 hover:underline"
                  >
                    Become Brand
                  </a>
                )}

              {/* Auth Buttons */}
              {loadingAuth ? (
                <span className="text-gray-600">Checking login…</span>
              ) : authUser ? (
                <span className="inline-flex items-center space-x-4">
                  <span className="font-medium">
                    Hi, {authUser.displayName}
                  </span>
                  {authUser.photoURL && (
                    <img
                      src={authUser.photoURL}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:underline"
                  >
                    Logout
                  </button>
                </span>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Sign in with Google
                </button>
              )}
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-blue-100 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-4">
              Creators. Brands. Trust.
            </h2>
            <p className="text-lg">
              ReVibe Space connects creators and brands with honest,
              reward-based content and review campaigns.
            </p>
            <a
              href="#campaigns"
              className="mt-6 inline-block bg-blue-600 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-700"
            >
              Explore Campaigns
            </a>
          </div>
        </section>

        {/* Campaigns */}
        <section id="campaigns" className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6">
              Featured Campaigns
            </h3>
            {loadingCampaigns ? (
              <p>Loading campaigns…</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.slice(0, 3).map((c) => (
                  <div
                    key={c.id}
                    className="bg-white p-6 rounded-xl shadow"
                  >
                    <h4 className="text-xl font-bold">{c.title}</h4>
                    <p className="text-sm text-gray-600">
                      {c.brandName}
                    </p>
                    <p className="mt-1">₹{c.reward} per review</p>
                    <p className="text-sm text-gray-500">
                      Deadline: {c.deadline}
                    </p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Submit Form */}
        <section id="submit" className="bg-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6">
              Submit Your Review
            </h3>
            <form className="space-y-6">
              {/* ...your form fields here... */}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}