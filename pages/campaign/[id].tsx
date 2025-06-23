// pages/campaign/[id].tsx
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface CampaignData {
  title: string;
  brandName: string;
  reward: number;
  deadline: string;
  description?: string;
}

export default function CampaignDetailPage() {
  const router = useRouter();
  const { id } = router.query as { id?: string };

  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function load() {
      const snap = id ? await getDoc(doc(db, "campaigns", id)) : null;
      if (snap && snap.exists()) {
        setCampaign(snap.data() as CampaignData);
      } else {
        setCampaign(null);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading campaign…</p>
        </div>
      </>
    );
  }

  if (!campaign) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <p>Campaign not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{campaign.title} • ReVibe Space</title>
      </Head>
      <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
          <p className="text-gray-600 mb-2">
            Brand: <span className="font-medium">{campaign.brandName}</span>
          </p>
          <p className="mb-2">Reward: ₹{campaign.reward} per review</p>
          <p className="mb-4 text-sm text-gray-500">
            Deadline: {campaign.deadline}
          </p>
          {campaign.description && (
            <p className="mb-6 text-gray-700">{campaign.description}</p>
          )}
          <button
            onClick={() => router.push(`/submit/${id}`)}
            className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition"
          >
            Apply Now
          </button>
        </div>
      </main>
    </>
  );
}