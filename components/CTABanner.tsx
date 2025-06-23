// components/CTABanner.tsx
import React from "react";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section id="cta" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-4xl font-extrabold mb-4">
          Ready to Elevate Your Brand with Authentic UGC?
        </h2>
        <p className="text-lg mb-8">
          Launch your next campaign or join as a creator to start earning tokens.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/brand/create-campaign"
            className="bg-white text-purple-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Start a Campaign
          </Link>
          <Link
            href="/creator"
            className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-30 transition"
          >
            Join as Creator
          </Link>
        </div>
      </div>
    </section>
  );
}