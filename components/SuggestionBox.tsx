// components/SuggestionBox.tsx
import { useState, useEffect } from "react";

export default function SuggestionBox({ pastReviews }: any[]) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  useEffect(() => {
    fetch("/api/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pastReviews }),
    })
      .then(res => res.json())
      .then(data => setSuggestions(data.suggestions.split("\n")));
  }, [pastReviews]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="font-bold mb-2">AI Campaign Suggestions</h3>
      <ul className="list-disc list-inside space-y-1">
        {suggestions.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
}