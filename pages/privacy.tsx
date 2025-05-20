// pages/privacy.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy – ReVibe Space</title>
      </Head>
      <Header />
      <main className="bg-white px-4 sm:px-6 lg:px-8 py-16 max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-gray-700">
          Your privacy is important to us. This policy explains how we collect,
          use, and protect your personal data.
        </p>
        <section>
          <h2 className="text-2xl font-semibold">Information We Collect</h2>
          <p className="text-gray-700">
            We collect email addresses, names, and blockchain wallet IDs when
            you sign up and submit reviews.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">How We Use Data</h2>
          <p className="text-gray-700">
            Data is used to authenticate users, process submissions, and
            generate analytics reports for brands.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Sharing & Security</h2>
          <p className="text-gray-700">
            We never sell your data. All sensitive data is encrypted in transit
            and at rest.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}