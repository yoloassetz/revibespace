// pages/brand.tsx

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Link from "next/link";

type Submission = {
  id: string;
  userId: string;
  campaignId: string;
  mediaURL: string;
  feedback: string;
  status: string;
  submittedAt: any;
  campaignTitle?: string;
};

export default function BrandDashboard() {
  const [subs, setSubs] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSubs() {
      try {
        const submissionsSnap = await getDocs(
          query(collection(db, "submissions"))
        );

        const list = await Promise.all(
          submissionsSnap.docs.map(async (docSnap) => {
            // 1) Raw Firestore data
            const raw = docSnap.data() as {
              userId: string;
              campaignId: string;
              mediaURL: string;
              feedback: string;
              status: string;
              submittedAt: any;
            };

            // 2) Fetch the campaign title from campaigns collection
            const campaignSnap = await getDoc(
              doc(db, "campaigns", raw.campaignId)
            );
            const campaignTitle = campaignSnap.exists()
              ? (campaignSnap.data() as { title: string }).title
              : "Unknown";

            // 3) Return a fully-explicit object—no spreads!
            return {
              id: docSnap.id,
              userId: raw.userId,
              campaignId: raw.campaignId,
              mediaURL: raw.mediaURL,
              feedback: raw.feedback,
              status: raw.status,
              submittedAt: raw.submittedAt,
              campaignTitle,
            };
          })
        );

        setSubs(list);
      } catch (e: any) {
        console.error("Error loading submissions:", e);
        setError("Failed to load submissions");
      } finally {
        setLoading(false);
      }
    }

    fetchSubs();
  }, []);

  const updateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    try {
      await updateDoc(doc(db, "submissions", id), { status: newStatus });
      setSubs((current) =>
        current.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );
    } catch (e) {
      console.error("Error updating status:", e);
      alert("Could not update status");
    }
  };

  if (loading) return <p className="p-6">Loading submissions…</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Brand Dashboard</h1>
        <Link href="/brand/create-campaign">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Create Campaign
          </button>
        </Link>
      </div>

      {subs.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div className="space-y-6">
          {subs.map((sub) => (
            <div key={sub.id} className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">
                {sub.campaignTitle}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                By: {sub.userId} • Status:{" "}
                <span
                  className={
                    sub.status === "approved"
                      ? "text-green-600"
                      : sub.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {sub.status}
                </span>
              </p>

              <div className="mb-4">
                {/\.(mp4|webm)$/i.test(sub.mediaURL) ? (
                  <video
                    src={sub.mediaURL}
                    controls
                    className="w-full max-h-64 rounded"
                  />
                ) : (
                  <img
                    src={sub.mediaURL}
                    alt="submission"
                    className="w-full rounded"
                  />
                )}
              </div>

              <p className="mb-4">{sub.feedback}</p>

              {sub.status === "pending" && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => updateStatus(sub.id, "approved")}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(sub.id, "rejected")}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
