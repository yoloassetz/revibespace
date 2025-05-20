// pages/faq.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: "What is ReVibe Space?",
    a:
      "ReVibe Space is a blockchain-powered platform connecting creators with brands for authentic, transparent product reviews and campaigns.",
  },
  {
    q: "How do I earn tokens?",
    a:
      "Simply apply for campaigns, submit your honest video or text review, and get tokens instantly when approved by the brand.",
  },
  {
    q: "How are reviews stored?",
    a:
      "All approved reviews are hashed and stored on-chain to guarantee immutability and trust.",
  },
  {
    q: "Can brands run private campaigns?",
    a:
      "Yes—brands can choose public or invite-only campaigns, and manage applicants directly through the dashboard.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Head>
        <title>FAQ – ReVibe Space</title>
      </Head>
      <Header />
      <main className="bg-white px-4 sm:px-6 lg:px-8 py-16 max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Blockchain FAQ</h1>
        {faqs.map((item, i) => (
          <div key={i}>
            <h2 className="text-xl font-semibold">{item.q}</h2>
            <p className="text-gray-700 mt-1">{item.a}</p>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}