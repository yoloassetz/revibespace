// pages/terms.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service – ReVibe Space</title>
      </Head>
      <Header />
      <main className="bg-white px-4 sm:px-6 lg:px-8 py-16 max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <section>
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By using ReVibe Space, you agree to these terms and our privacy
            policy.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">2. User Conduct</h2>
          <p className="text-gray-700">
            Users must comply with our creator guidelines and respect brand
            intellectual property.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">3. Payments & Fees</h2>
          <p className="text-gray-700">
            All token transactions are final. Brands deposit tokens into a
            smart contract escrow before campaigns begin.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">4. Limitation of Liability</h2>
          <p className="text-gray-700">
            ReVibe Space is not liable for any indirect damages resulting from
            platform use.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}