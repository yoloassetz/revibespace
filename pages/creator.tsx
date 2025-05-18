import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

type Campaign = {
  id: string;
  title: string;
  brandName: string;
  reward: number;
  deadline: string;
  brief: string;
};

export default function CreatorDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const snapshot = await getDocs(collection(db, "campaigns"));

        console.log("Fetched snapshot:", snapshot.docs.map(doc => doc.data())); // 🔍 Debug

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Campaign[];

        console.log("Mapped campaigns:", data); // 🔍 Debug

        setCampaigns(data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to load campaigns.");
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Creator Dashboard</h1>

      {loading && <p>Loading campaigns...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <div key={c.id} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold">{c.title}</h2>
            <p className="text-sm text-gray-600 mb-1">{c.brandName}</p>
            <p className="mb-1">💰 ₹{c.reward}</p>
            <p className="mb-1">📅 Deadline: {c.deadline}</p>
            <p className="text-sm mb-2">{c.brief}</p>
            <button
              onClick={() => window.location.href = `/submit/${c.id}`}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
              Submit Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}