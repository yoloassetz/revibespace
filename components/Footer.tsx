// components/Footer.tsx
import React from "react";
import Link from "next/link";

export default function Footer() {
  const aboutLinks = [
    { label: "Our Story", href: "/about#our-story" },
    { label: "Team", href: "/about#team" },
    { label: "Careers", href: "/about#careers" },
    { label: "Blog", href: "/blog" },
  ];
  const resourceLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Blockchain FAQ", href: "/faq" },
    { label: "Creator Guidelines", href: "/creator-guidelines" },
    { label: "Brand Resources", href: "/brand-resources" },
  ];
  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h4 className="text-gray-200 font-semibold mb-4">About</h4>
          {aboutLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block mb-2 hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-gray-200 font-semibold mb-4">Resources</h4>
          {resourceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block mb-2 hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-gray-200 font-semibold mb-4">Legal</h4>
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block mb-2 hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ReVibe Space. All rights reserved.
      </div>
    </footer>
  );
}