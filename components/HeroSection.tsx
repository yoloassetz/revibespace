// components/HeroSection.tsx
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-32">
      <div className="max-w-3xl mx-auto space-y-8 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          AI-Powered UGC & Authentic Campaigns:
          <br />
          Connecting Brands, Creators, and Consumers.
        </h1>
        <p className="text-xl md:text-2xl text-white/90">
          RevibeSpace helps brands generate high-converting UGC with AI, run
          transparent review and content campaigns with creators, and build
          trust with consumers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/brand/create-campaign"
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Start a Campaign
          </Link>
          <Link
            href="/creator"
            className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition"
          >
            Join as Creator
          </Link>
        </div>
      </div>
    </section>
  );
}