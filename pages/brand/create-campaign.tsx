// pages/brand/create-campaign.tsx

import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface CampaignFormData {
  title: string;
  brandName: string;
  reward: number;
  deadline: string;
}

export default function CreateCampaign() {
  const [formData, setFormData] = useState<CampaignFormData>({
    title: '',
    brandName: '',
    reward: 0,
    deadline: '',
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'reward' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'campaigns'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      alert('Campaign created successfully!');
    } catch (err) {
      console.error('Creation error:', err);
      alert('Failed to create campaign.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create Campaign – ReVibe Space</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-6">Create Campaign</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg space-y-4 bg-white p-6 rounded shadow"
        >
          {(['title', 'brandName', 'deadline'] as const).map((field) => (
            <div key={field}>
              <label className="block mb-1 capitalize font-medium">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field === 'deadline' ? 'date' : 'text'}
                name={field}
                required
                value={formData[field]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          ))}
          <div>
            <label className="block mb-1 font-medium">Reward (₹)</label>
            <input
              type="number"
              name="reward"
              required
              value={formData.reward}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Creating…' : 'Create Campaign'}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}