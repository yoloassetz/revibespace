// components/Features.tsx
export default function Features() {
  const items = [
    { icon: "🔍", title: "Discover Campaigns",    desc: "Browse brand-driven review opportunities tailored to your niche." },
    { icon: "📤", title: "Submit Reviews",        desc: "Upload honest video or photo feedback and tell your story." },
    { icon: "💰", title: "Earn Rewards",          desc: "Get paid instantly upon approval and watch your earnings grow." },
    { icon: "⭐", title: "Build Reputation",      desc: "Showcase your credibility and attract more campaigns over time." },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((f) => (
            <div key={f.title} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}