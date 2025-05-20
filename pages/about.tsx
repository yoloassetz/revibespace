// pages/about.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About – ReVibe Space</title>
      </Head>
      <Header />
      <main className="bg-white px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Our Story */}
        <section id="our-story" className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Founded in 2024, ReVibe Space began with a simple mission: to bring
            authentic voices back to product marketing. We believe every review
            tells a story, and every creator deserves to be rewarded for their
            honesty. Powered by blockchain transparency, our platform ensures
            trust and fairness for both brands and creators.
          </p>
        </section>

        {/* Team */}
        <section id="team" className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Team</h2>
          <ul className="space-y-6">
            <li>
              <h3 className="text-xl font-semibold">Ayesha Khan</h3>
              <p className="text-gray-600">Co-Founder & CEO</p>
            </li>
            <li>
              <h3 className="text-xl font-semibold">Rahul Mehta</h3>
              <p className="text-gray-600">CTO & Blockchain Architect</p>
            </li>
            <li>
              <h3 className="text-xl font-semibold">Sara Patel</h3>
              <p className="text-gray-600">Head of Community</p>
            </li>
          </ul>
        </section>

        {/* Careers */}
        <section id="careers" className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Careers</h2>
          <p className="text-gray-700 mb-4">
            We’re growing fast and looking for passionate people to join our
            journey. If you love blockchain, marketing, or building communities,
            check out our open roles:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Full-Stack Developer</li>
            <li>Smart Contract Engineer</li>
            <li>Marketing Manager</li>
            <li>UX/UI Designer</li>
          </ul>
          <p className="mt-4">
            Interested? Send your resume to{" "}
            <a href="mailto:jobs@revibespace.com" className="text-purple-600">
              jobs@revibespace.com
            </a>
            .
          </p>
        </section>

        {/* Blog */}
        <section id="blog" className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Blog</h2>
          <p className="text-gray-700 mb-4">
            Read the latest insights on product reviews, blockchain marketing,
            and creator success stories.
          </p>
          <ul className="space-y-4">
            <li>
              <a href="/blog/launching-revibe" className="text-purple-600 hover:underline">
                Launching ReVibe Space: Our Vision & Roadmap →
              </a>
            </li>
            <li>
              <a href="/blog/creator-tips" className="text-purple-600 hover:underline">
                10 Tips for Creating Engaging Product Reviews →
              </a>
            </li>
            <li>
              <a href="/blog/blockchain-transparency" className="text-purple-600 hover:underline">
                How Blockchain Ensures Review Integrity →
              </a>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}