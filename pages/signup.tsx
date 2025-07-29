// pages/signup.tsx
import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 🔒 TODO: replace with real sign-up logic
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Sign Up – ReVibe Space</title>
      </Head>
      <Header />

      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Create Your Account</h1>

          {submitted ? (
            <p className="text-green-600">
              Thanks! Please check your email to confirm your account.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="block mb-1 font-medium">Email address</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </label>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}