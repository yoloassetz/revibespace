// pages/creator-guidelines.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CreatorGuidelinesPage() {
  return (
    <>
      <Head>
        <title>Creator Guidelines – ReVibe Space</title>
      </Head>
      <Header />
      <main className="bg-white px-4 sm:px-6 lg:px-8 py-16 max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-4">Creator Guidelines</h1>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Be Honest & Respectful</h2>
          <p className="text-gray-700">
            Always provide genuine feedback based on your real experience with
            the product. Respect brand instructions and community standards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Media Requirements</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Videos must be at least 30 seconds and max 3 minutes.</li>
            <li>Images should be high-resolution (min 1080×1080).</li>
            <li>No watermarks or external branding allowed.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Submission Process</h2>
          <p className="text-gray-700">
            After approval, upload your media on the submission page and add a
            brief write-up. Brands will review within 48 hours.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Earnings & Rewards</h2>
          <p className="text-gray-700">
            Earn tokens immediately on approval. Track your balance and
            withdrawals in the Creator Dashboard.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}