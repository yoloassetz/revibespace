import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";

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
    const fetchSubs = async () => {
      try {
        // 1) fetch all submissions
        const q = query(collection(db, "submissions"));
        const snap = await getDocs(q);

        // 2) for each, fetch the campaign title
        const list = await Promise.all(
          snap.docs.map(async (d) => {
            const data = d.data() as Submission;
            const cSnap = await getDoc(doc(db, "campaigns", data.campaignId));
            return {
              id: d.id,
              ...data,
              campaignTitle: cSnap.exists() ? cSnap.data()?.title : "Unknown",
            };
          })
        );

        setSubs(list);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubs();
  }, []);

  const updateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    try {
      await updateDoc(doc(db, "submissions", id), { status: newStatus });
      setSubs((s) =>
        s.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
      );
    } catch (err) {
      console.error(err);
      alert("Could not update status");
    }
  };

  if (loading) return <p className="p-6">Loading submissions…</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center justify-between">
        Brand Dashboard
       <a
         href="/brand/create-campaign"
         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
       >
         + Create Campaign
       </a>
      </h1>

      {subs.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div className="space-y-6">
          {subs.map((sub) => (
            <div key={sub.id} className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{sub.campaignTitle}</h2>
              <p className="text-sm text-gray-600 mb-1">
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
                {sub.mediaURL.match(/\.(mp4|webm)$/) ? (
                  <video src={sub.mediaURL} controls className="w-full max-h-64 rounded" />
                ) : (
                  <img src={sub.mediaURL} alt="submission" className="w-full rounded" />
                )}
              </div>

              <p className="mb-4">{sub.feedback}</p>

              {sub.status === "pending" && (
                <div className="space-x-4">
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