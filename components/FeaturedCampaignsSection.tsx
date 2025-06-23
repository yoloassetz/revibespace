// components/FeaturedCampaignsSection.tsx
import React from "react";
import CampaignCard, { Campaign } from "./CampaignCard";

interface Props {
  campaigns: Campaign[];
}

export default function FeaturedCampaignsSection({ campaigns }: Props) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-2">Browse AI-Powered UGC Campaigns</h2>
        <p className="text-gray-600 mb-8">
          Browse live AI-powered UGC campaigns and start earning today.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.slice(0, 3).map((c) => (
            <CampaignCard key={c.id} campaign={c} showStatus />
          ))}
        </div>
      </div>
    </section>
  );
}