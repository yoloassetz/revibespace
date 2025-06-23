// pages/index.tsx

import Head from "next/head";
import HowItWorks from "../components/HowItWorks";
import FilterPanel from "../components/FilterPanel";
import FeaturedCampaignsSection from "../components/FeaturedCampaignsSection";
import CTABanner from "../components/CTABanner";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Campaign } from "../components/CampaignCard";

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [minReward, setMinReward] = useState(0);
  const [maxReward, setMaxReward] = useState(Infinity);

  useEffect(() => {
    async function fetchCampaigns() {
      const snap = await getDocs(collection(db, "campaigns"));
      setCampaigns(
        snap.docs.map((d) => {
          const data = d.data() as Omit<Campaign, "id">;
          return { id: d.id, ...data };
        })
      );
    }
    fetchCampaigns();
  }, []);

  const filtered = campaigns.filter(
    (c) => c.reward >= minReward && c.reward <= maxReward
  );

  return (
    <>
      <Head>
        <title>ReVibe Space</title>
        <meta
          name="description"
          content="ReVibe Space — where creators and brands meet authentically."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero / How It Works Section */}
      <HowItWorks />

      {/* Featured Campaigns with Filters */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Featured Campaigns
          </h2>

          <div className="flex justify-center mb-8">
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

      {/* Call-to-Action Banner */}
      <CTABanner />
    </>
  );
}