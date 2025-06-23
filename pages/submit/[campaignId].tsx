// pages/submit/[campaignId].tsx
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, FormEvent } from "react";
import Skeleton from "../../components/Skeleton";
import { auth, db, storage } from "../../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function SubmitReview() {
  const router = useRouter();
  const { campaignId } = router.query as { campaignId: string };

  const [user, setUser] = useState<User | null>(null);
  const [campaignTitle, setCampaignTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [submitting, setSubmitting] = useState(false);

  // Auth guard + load campaign title
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return router.replace("/signup");
      setUser(u);

      // ensure creator role
      const userSnap = await getDoc(doc(db, "users", u.uid));
      if (!userSnap.exists() || userSnap.data().role !== "creator") {
        return router.replace("/");
      }

      // load campaign data
      const cSnap = await getDoc(doc(db, "campaigns", campaignId));
      setCampaignTitle(cSnap.exists() ? (cSnap.data() as any).title : "");
      setLoading(false);
    });
    return () => unsub();
  }, [campaignId, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !campaignId) return;
    setSubmitting(true);

    try {
      let mediaURL = "";
      if (file) {
        const storageRef = ref(
          storage,
          `submissions/${campaignId}/${user.uid}_${Date.now()}_${file.name}`
        );
        await uploadBytes(storageRef, file);
        mediaURL = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "submissions"), {
        campaignId,
        userId: user.uid,
        mediaURL,
        feedback,
        rating,
        status: "pending",
        submittedAt: serverTimestamp(),
      });

      router.push("/creator");
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading…</title>
        </Head>
        <main className="p-8">
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-64 w-full" />
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Submit Review – {campaignTitle}</title>
      </Head>
      <main className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Submit Review for “{campaignTitle}”
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-6"
        >
          {/* Media Upload */}
          <div>
            <label className="block font-medium mb-2">Upload Media</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              className="block w-full"
            />
          </div>

          {/* Feedback */}
          <div>
            <label className="block font-medium mb-2">Your Feedback</label>
            <textarea
              required
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block font-medium mb-2">
              Rating (1–5 Stars)
            </label>
            <select
              required
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border px-3 py-2 rounded-md"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} Star{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50 transition"
          >
            {submitting ? "Submitting…" : "Submit Review"}
          </button>
        </form>
      </main>
    </>
  );
}