// pages/brand.tsx

import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

interface Submission {
  id: string;
  userId: string;
  campaignId: string;
  mediaURL: string;
  feedback: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  submittedAt: { seconds: number; nanoseconds: number };
  campaignTitle: string;
}

export default function BrandDashboard() {
  const [subs, setSubs] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubs() {
      const snap = await getDocs(collection(db, "submissions"));
      const list = await Promise.all(
        snap.docs.map(async (d) => {
          const data = d.data() as Omit<Submission, "campaignTitle">;
          const cSnap = await getDoc(
            doc(db, "campaigns", data.campaignId)
          );
          return {
            ...data,
            id: d.id,
            campaignTitle: cSnap.exists()
              ? (cSnap.data()!.title as string)
              : "Unknown",
          };
        })
      );
      setSubs(list);
      setLoading(false);
    }
    fetchSubs();
  }, []);

  const updateStatus = async (
    id: string,
    newStatus: "approved" | "rejected"
  ) => {
    await updateDoc(doc(db, "submissions", id), { status: newStatus });
    setSubs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  return (
    <>
      <Head>
        <title>Brand Dashboard – ReVibe Space</title>
      </Head>

      <main className="min-h-screen bg-gray-100 p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Brand Dashboard</h1>
          <Link
            href="/brand/create-campaign"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create Campaign
          </Link>
        </div>

        {loading ? (
          <p>Loading submissions…</p>
        ) : subs.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <div className="space-y-6">
            {subs.map((sub) => (
              <div
                key={sub.id}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {sub.campaignTitle}
                </h2>
                <p className="mb-2">
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
                  {/\.(mp4|webm)$/.test(sub.mediaURL) ? (
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
      </main>
    </>
  );
}