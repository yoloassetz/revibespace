// pages/creator.tsx

import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CampaignCard, { Campaign } from "../components/CampaignCard";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function CreatorDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "campaigns"));
      const list = snap.docs.map((d) => {
        // Grab Firestore data excluding any embedded `id`
        const data = d.data() as Omit<Campaign, "id">;
        // Re-attach the real document ID exactly once
        return { id: d.id, ...data };
      });
      setCampaigns(list);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <Head>
        <title>Creator Dashboard – ReVibe Space</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6">Creator Dashboard</h1>

          {loading ? (
            <p>Loading campaigns…</p>
          ) : campaigns.length === 0 ? (
            <p>No campaigns available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((c) => (
                <div key={c.id}>
                  <CampaignCard campaign={c} />
                  <Link
                    href={`/submit/${c.id}`}
                    className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Submit Review
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}