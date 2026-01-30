import Link from "next/link";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Blue Buff";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mlbbtopup.in";

export const metadata = {
  title: `About ${BRAND} | Instant Game Top-Ups & Secure Payments`,
  description: `${BRAND} is a fast and secure game top-up platform offering instant delivery, trusted payment gateways, and competitive pricing. Available 24×7 for gamers worldwide.`,
  keywords: [
    "game top up",
    "instant game recharge",
    "mobile legends top up",
    "pubg recharge",
    "secure game payments",
    "online game credits",
    "mlbb topup india",
    `${BRAND}`,
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: `About ${BRAND}`,
    description:
      "Fast, secure, and automated game top-ups with instant delivery.",
    url: `${SITE_URL}/about`,
    siteName: BRAND,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${BRAND}`,
    description:
      "Instant game top-ups with secure payments and 24×7 delivery.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* Hero */}
      <section className="relative text-center py-20 px-6 border-b border-[var(--border)]">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[var(--accent)] opacity-10 blur-[140px]" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-purple-500 bg-clip-text text-transparent">
          About {BRAND}
        </h1>

        <p className="text-[var(--muted)] text-base sm:text-lg max-w-2xl mx-auto">
          A trusted platform delivering instant game top-ups, secure payments,
          and automated processing — built for modern gamers.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-[var(--accent)] text-center">
          Our Mission
        </h2>

        <p className="text-[var(--muted)] leading-relaxed text-base sm:text-lg text-center max-w-3xl mx-auto mb-8">
          {BRAND} was created to simplify in-game purchases. We focus on
          speed, reliability, and transparency — ensuring gamers receive their
          credits instantly without unnecessary steps or security concerns.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 text-[var(--muted)] text-base">
          <ul className="space-y-3">
            <li>✔ Instant automated top-ups</li>
            <li>✔ 24×7 system availability</li>
          </ul>
          <ul className="space-y-3">
            <li>✔ Secure payment gateways</li>
            <li>✔ Transparent pricing structure</li>
          </ul>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-12 text-center text-[var(--accent)]">
          Why Choose {BRAND}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Instant Delivery",
              desc: "Orders are processed automatically and delivered immediately after confirmation.",
            },
            {
              title: "Secure Payments",
              desc: "Integrated with trusted and verified payment providers.",
            },
            {
              title: "Affordable Pricing",
              desc: "Competitive rates with no hidden fees.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:shadow-lg hover:border-[var(--accent)] transition-all"
            >
              <h3 className="text-lg font-semibold mb-2 text-[var(--accent)]">
                {item.title}
              </h3>
              <p className="text-[var(--muted)] text-sm sm:text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center border-t border-[var(--border)] px-6">
        <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)]">
          Trusted by Gamers
        </h2>

        <p className="text-[var(--muted)] mb-8 max-w-xl mx-auto">
          Thousands of successful transactions processed securely.
          Join {BRAND} and experience fast, reliable game top-ups.
        </p>

        <Link
          href="/games"
          className="inline-block bg-gradient-to-r from-[var(--accent)] to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
        >
          Explore Games
        </Link>
      </section>
    </main>
  );
}
