import { useState, useEffect } from "react";

type SuggestionBoxProps = {
  pastReviews: any[];
};

export default function SuggestionBox({ pastReviews }: SuggestionBoxProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pastReviews }),
    })
      .then((res) => res.json())
      .then((data) => setSuggestions(data.suggestions || []))
      .catch((err) => console.error("Suggestion error:", err));
  }, [pastReviews]);

  return (
    <div className="mt-8 p-6 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Suggested Improvements</h3>
      {suggestions.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {suggestions.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No suggestions available yet.</p>
      )}
    </div>
  );
}
