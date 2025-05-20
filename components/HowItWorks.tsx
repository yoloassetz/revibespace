// components/HowItWorks.tsx
import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-purple-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2 5h2v10H2V5zm3 0l6-3v16L5 15V5z" />
        </svg>
      ),
      title: "Consumers Post Reviews",
      desc:
        "Share authentic video and text reviews of products you've used. All reviews are stored on-chain for transparency.",
      linkText: "Earn 10–50 tokens per review",
      linkHref: "#",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-purple-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5 3a3 3 0 016 0v2a3 3 0 01-6 0V3zM2 13a4 4 0 018 0v1H2v-1zM12 6a4 4 0 110 8h-1V6h1z" />
        </svg>
      ),
      title: "Creators Run Campaigns",
      desc:
        "Apply to run marketing campaigns for brands. Create content packages and get rewarded for authentic promotion.",
      linkText: "Earn 100–1000 tokens per campaign",
      linkHref: "#",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-purple-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M11 2L3 14h6v4l8-12h-6z" />
        </svg>
      ),
      title: "On-Chain Tracking",
      desc:
        "All activities tracked on-chain or via smart contract proxies, ensuring transparency and immutability.",
      linkText: "View blockchain verification",
      linkHref: "#",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-2">How ReviewChain Works</h2>
        <p className="text-purple-200 mb-12">
          A transparent marketplace powered by blockchain technology
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-lg text-left"
            >
              <div className="mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {s.title}
              </h3>
              <p className="text-gray-700 mb-4">{s.desc}</p>
              <a
                href={s.linkHref}
                className="text-purple-600 hover:underline font-medium"
              >
                {s.linkText} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}