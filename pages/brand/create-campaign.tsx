// pages/brand/create-campaign.tsx

import Head from "next/head";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface CampaignForm {
  title: string;
  brandName: string;
  reward: number;
  deadline: string;
}

export default function CreateCampaign() {
  const [form, setForm] = useState<CampaignForm>({
    title: "",
    brandName: "",
    reward: 0,
    deadline: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "reward" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addDoc(collection(db, "campaigns"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      alert("Campaign created!");
      setForm({ title: "", brandName: "", reward: 0, deadline: "" });
    } catch (err) {
      console.error(err);
      alert("Error creating campaign.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create Campaign – ReVibe Space</title>
      </Head>

      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">
            Create Campaign
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium">
                Title
              </label>
              <input
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Brand Name
              </label>
              <input
                name="brandName"
                required
                value={form.brandName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Reward (₹)
              </label>
              <input
                name="reward"
                type="number"
                required
                value={form.reward}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Deadline
              </label>
              <input
                name="deadline"
                type="date"
                required
                value={form.deadline}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Creating…" : "Create Campaign"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}