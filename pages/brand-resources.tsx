// pages/brand-resources.tsx

import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function BrandResources() {
  return (
    <>
      <Head>
        <title>Resources – ReVibe Space</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-4">Brand Resources</h1>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
          <li>
            <Link href="/legal">Legal</Link>
          </li>
          {/* add more internal links here */}
        </ul>
      </main>
      <Footer />
    </>
  );
}