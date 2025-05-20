// components/CTABanner.tsx
import React from "react";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-4xl font-extrabold">Ready to get started?</h2>
        <p className="text-lg">
          Join our transparent marketplace today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Sign Up button */}
          <Link
            href="/signup"
            className="bg-white text-purple-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Sign Up
          </Link>

          {/* Learn More button */}
          <Link
            href="#how-it-works"
            className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-30 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}