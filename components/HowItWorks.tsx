// components/HowItWorks.tsx
import React from "react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 5a1 1 0 011-1h3a1 1 0 01.707.293l5 5a1 1 0 010 1.414l-5 5A1 1 0 017 15H4a1 1 0 01-1-1V5z" />
        </svg>
      ),
      title: "AI-Generated UGC",
      desc: "Use AI-driven tools to generate engaging user content at scale while maintaining authenticity.",
      linkText: "Generate with AI →",
      href: "/ai-ugc",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a2 2 0 00-2 2v2H6a2 2 0 00-2 2v2H2a2 2 0 00-2 2v2h2v2a2 2 0 002 2h2v2a2 2 0 002 2h2v-2h2a2 2 0 002-2v-2h2a2 2 0 002-2v-2h-2V8a2 2 0 00-2-2h-2V4a2 2 0 00-2-2h-2z" />
        </svg>
      ),
      title: "Creator-Led Campaigns",
      desc: "Creators run transparent marketing campaigns for brands and earn rewards for genuine promotion.",
      linkText: "Apply for Campaigns →",
      href: "/creator",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 2L3 14h7v4l10-12h-7V2z" />
        </svg>
      ),
      title: "Consumer Trust & On-Chain Verification",
      desc: "All UGC and reviews are tracked on-chain, ensuring transparency and building consumer trust.",
      linkText: "View On-Chain Proof →",
      href: "/on-chain",
    },
  ];

  return (
    <section className="py-16 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-2">How RevibeSpace Works</h2>
        <p className="text-gray-600 mb-12">Three pillars powering our platform</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-lg shadow-lg text-left">
              <div className="mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-700 mb-4">{s.desc}</p>
              <Link href={s.href} className="text-purple-600 hover:underline font-medium">
                {s.linkText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}