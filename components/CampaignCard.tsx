// components/CampaignCard.tsx
import Link from "next/link";

export type Campaign = {
  id: string;
  title: string;
  brandName: string;
  reward: number;
  deadline: string;
  brief?: string;
  active?: boolean;
};

interface Props {
  campaign: Campaign;
  showStatus?: boolean;            // if you want the “Active” pill
  actionLabel?: string;            // defaults to “Apply Now”
  actionHref?: string;             // defaults to `/submit/[campaign.id]`
}

export default function CampaignCard({
  campaign,
  showStatus = false,
  actionLabel = "Apply Now",
  actionHref,
}: Props) {
  // default the href if none passed
  const href = actionHref ?? `/submit/${campaign.id}`;

  return (
    <div className="relative bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col">
      {showStatus && campaign.active && (
        <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Active
        </span>
      )}
      <h4 className="text-lg font-bold mb-1">{campaign.title}</h4>
      <p className="text-sm text-gray-500 mb-2">{campaign.brandName}</p>
      <p className="text-base font-semibold mb-2">💰 ₹{campaign.reward}</p>
      <p className="text-sm text-gray-400 mb-4">Deadline: {campaign.deadline}</p>
      {campaign.brief && (
        <p className="text-gray-700 mb-4 text-sm">{campaign.brief}</p>
      )}

      <div className="mt-auto">
        <Link
          href={href}
          className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}