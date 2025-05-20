// pages/index.tsx

import Head from "next/head";
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import FeaturedCampaignsSection from "../components/FeaturedCampaignsSection";
import FilterPanel from "../components/FilterPanel";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Campaign } from "../components/CampaignCard";

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [minReward, setMinReward] = useState<number>(0);
  const [maxReward, setMaxReward] = useState<number>(Infinity);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "campaigns"));
      setCampaigns(
        snap.docs.map((d) => {
          const { id, ...data } = d.data() as Campaign;
          return { id: d.id, ...data };
        })
      );
    }
    load();
  }, []);

  // Apply reward filter
  const filtered = campaigns.filter(
    (c) => c.reward >= minReward && c.reward <= maxReward
  );

  return (
    <>
      <Head>
        <title>ReVibe Space</title>
      </Head>
      <Header />

      {/* Top sections */}
      <HowItWorks />

      {/* Filter + Featured Campaigns */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Featured Campaigns
          </h2>
          <div className="mb-6 flex justify-center">
            <FilterPanel
              onFilterChange={(min, max) => {
                setMinReward(min);
                setMaxReward(max);
              }}
            />
          </div>
          <FeaturedCampaignsSection campaigns={filtered} />
        </div>
      </section>

      {/* Call to action banner */}
      <CTABanner />

      <Footer />
    </>
  );
}