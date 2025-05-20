// pages/brand-resources.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BrandResourcesPage() {
  return (
    <>
      <Head>
        <title>Brand Resources – ReVibe Space</title>
      </Head>
      <Header />
      <main className="bg-white px-4 sm:px-6 lg:px-8 py-16 max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-4">Brand Resources</h1>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
          <p className="text-gray-700">
            Learn how to set up your brand profile, fund your wallet, and
            launch your first campaign in under 5 minutes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Campaign Best Practices</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Define clear deliverables and deadlines.</li>
            <li>Offer fair token rewards based on scope.</li>
            <li>Provide example scripts or briefs for creators.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Analytics Dashboard</h2>
          <p className="text-gray-700">
            Track submissions, approvals, and ROI in real time. Export reports
            as CSV or PDF.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Support & FAQs</h2>
          <p className="text-gray-700">
            Visit our{" "}
            <a href="/faq" className="text-purple-600 hover:underline">
              Blockchain FAQ
            </a>{" "}
            for common questions, or contact our support at support@revibespace.com.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}