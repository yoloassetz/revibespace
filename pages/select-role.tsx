// pages/select-role.tsx
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SelectRole() {
  const router = useRouter();

  /** route away if role already chosen */
  useEffect(() => {
    const stored = localStorage.getItem('revibe-role');
    if (stored) router.replace(`/${stored}`);
  }, [router]);

  const choose = (role: 'creator' | 'brand') => {
    localStorage.setItem('revibe-role', role);
    router.push(`/${role}`);
  };

  return (
    <>
      <Head>
        <title>Select Your Role – ReVibe Space</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center gap-8">
        <h1 className="text-3xl font-bold">Continue as…</h1>
        <button
          onClick={() => choose('creator')}
          className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition"
        >
          Creator
        </button>
        <button
          onClick={() => choose('brand')}
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
        >
          Brand
        </button>
      </main>
    </>
  );
}