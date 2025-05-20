// components/ReviewCard.tsx

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Badge } from "./Badge";

export type ReviewCardProps = {
  reviewer: string;
  reviewerUid: string;
  rating: number;
  mediaUrl?: string | null;
  feedback: string;
  pointsEarned: number;
};

export default function ReviewCard({
  reviewer,
  reviewerUid,
  rating,
  mediaUrl,
  feedback,
  pointsEarned,
}: ReviewCardProps) {
  const [stats, setStats] = useState<{ reviewsCount: number; avgRating: number } | null>(
    null
  );

  useEffect(() => {
    async function loadStats() {
      try {
        const snap = await getDoc(doc(db, "users", reviewerUid));
        if (snap.exists()) {
          setStats(snap.data() as { reviewsCount: number; avgRating: number });
        }
      } catch (err) {
        console.error("Failed to load reviewer stats:", err);
      }
    }
    if (reviewerUid) loadStats();
  }, [reviewerUid]);

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <span className="font-medium">{reviewer}</span>
          {stats && stats.reviewsCount >= 20 && stats.avgRating >= 4.5 && (
            <Badge label="Top Reviewer" colorClass="bg-purple-600" />
          )}
        </div>
        <div className="text-yellow-500">{/* stars */}
          {"★".repeat(rating)}{" "}
        </div>
      </div>

      {mediaUrl && (
        <div className="w-full h-48 bg-gray-100 rounded overflow-hidden">
          <img
            src={mediaUrl}
            alt="Review media"
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <p className="text-gray-700">{feedback}</p>
      <div className="text-green-600 font-semibold">
        +{pointsEarned} Tokens
      </div>
    </div>
  );
}