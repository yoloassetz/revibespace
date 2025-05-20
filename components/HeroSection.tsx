// components/HeroSection.tsx
export default function HeroSection() {
  return (
    <section className="bg-primary/10 py-32 text-center">
      <div className="max-w-3xl mx-auto space-y-6 px-4">
        <h1 className="text-6xl font-extrabold text-primary">Creators. Brands. Trust.</h1>
        <p className="text-xl text-gray-700">
          ReVibe Space connects creators and brands with honest, reward-based content.
        </p>
        <a
          href="#campaigns"
          className="inline-block bg-primary text-white py-4 px-10 rounded-full text-lg font-semibold hover:bg-secondary transition"
        >
          Explore Campaigns
        </a>
      </div>
    </section>
  );
}