// pages/creator.tsx

import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CampaignCard, { Campaign } from "../components/CampaignCard";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import FilterPanel from "../components/FilterPanel";

export default function CreatorDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [minReward, setMinReward] = useState<number>(0);
  const [maxReward, setMaxReward] = useState<number>(Infinity);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "campaigns"));
      setCampaigns(snap.docs.map((d) => {
        const data = d.data() as Campaign;
        return { ...data, id: d.id };
      }));
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
                  {/* Reuse CampaignCard but override the CTA */}
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