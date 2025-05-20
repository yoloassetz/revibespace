// pages/blog.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const posts = [
  {
    slug: "launching-revibe",
    title: "Launching ReVibe Space: Our Vision & Roadmap",
    date: "May 1, 2025",
  },
  {
    slug: "creator-tips",
    title: "10 Tips for Creating Engaging Product Reviews",
    date: "April 15, 2025",
  },
  {
    slug: "blockchain-transparency",
    title: "How Blockchain Ensures Review Integrity",
    date: "March 20, 2025",
  },
];

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog – ReVibe Space</title>
      </Head>
      <Header />
      <main className="bg-white px-4 sm:px-6 lg:px-8 py-16 max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-4">Blog</h1>

        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-4">
            <h2 className="text-2xl font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-500 text-sm">{post.date}</p>
          </article>
        ))}
      </main>
      <Footer />
    </>
  );
}