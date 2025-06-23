// pages/campaigns.tsx
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import CampaignCard, { Campaign } from "../components/CampaignCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function AllCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "campaigns"));
      setCampaigns(
        snap.docs.map((d) => ({
          ...(d.data() as Campaign),
          id: d.id,
        }))
      );
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <Head>
        <title>All Campaigns • ReVibe Space</title>
      </Head>
      <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">All Campaigns</h1>
          {loading ? (
            <p className="text-center">Loading campaigns…</p>
          ) : campaigns.length === 0 ? (
            <p className="text-center">No campaigns found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((c) => (
                <div key={c.id}>
                  <CampaignCard campaign={c} />
                  <Link
                    href={`/campaign/${c.id}`}
                    className="mt-3 inline-block text-purple-600 hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}