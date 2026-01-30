import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

/* ================= SEO METADATA ================= */
export const metadata: Metadata = {
  title: "MLBB Weekly Pass Price in India (Updated 2025)",
  description:
    "Check the latest MLBB weekly pass price in India (2025). Learn benefits, rewards, validity, and how to buy MLBB weekly pass safely online.",
  keywords: [
    "mlbb weekly pass price in india",
    "mlbb weekly pass cost india",
    "mlbb weekly recharge india",
    "mlbb weekly pass diamonds",
    "mobile legends weekly pass india",
  ],
  alternates: {
    canonical:
      "https://mlbbtopup.in/blog/mlbb-weekly-pass-price-in-india",
  },
  openGraph: {
    title: "MLBB Weekly Pass Price in India (2025)",
    description:
      "Latest MLBB weekly pass price in India with benefits and safe buying guide.",
    url: "https://mlbbtopup.in/blog/mlbb-weekly-pass-price-in-india",
    type: "article",
  },
};

/* ================= BLOG PAGE ================= */
export default function BlogPage() {
  return (
    <>
      {/* ================= STRUCTURED DATA ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "MLBB Weekly Pass Price in India (2025)",
            description:
              "Latest MLBB weekly pass price in India with benefits and buying guide.",
            datePublished: "2025-01-10",
            author: {
              "@type": "Organization",
              name: "MLBBTopup India",
            },
            mainEntityOfPage:
              "https://mlbbtopup.in/blog/mlbb-weekly-pass-price-in-india",
          }),
        }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 leading-relaxed">

        {/* FEATURED IMAGE */}
        <div className="mb-8">
          <Image
            src="https://res.cloudinary.com/dk0sslz1q/image/upload/v1765619191/ideogram-v3.0_A_high-quality_horizontal_rectangular_website_banner_for_a_gaming_top-up_website-0_2_rgpuck.png"
            alt="MLBB Weekly Pass Price in India"
            width={1200}
            height={675}
            className="rounded-2xl border shadow-sm"
            priority
          />
        </div>

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          MLBB Weekly Pass Price in India (2025)
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Updated January 2025 · 4 min read
        </p>

        {/* INTRO */}
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          The <strong>MLBB weekly pass</strong> is one of the most
          cost-effective recharge options for Mobile Legends players in India.
          It provides daily diamond rewards for 7 days at a lower total cost
          compared to individual diamond purchases.
        </p>

        {/* WHAT IS */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          What Is MLBB Weekly Pass?
        </h2>
        <p className="mb-6">
          The weekly pass grants diamonds daily for seven consecutive days.
          Once activated, diamonds are automatically credited upon login.
          It is ideal for events, skins, heroes, and battle passes.
        </p>

        {/* PRICE */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          MLBB Weekly Pass Price in India (2025)
        </h2>
        <p className="mb-6">
          The current <strong>MLBB weekly pass price in India</strong>
          typically ranges between <strong>₹130 – ₹150</strong>.
          Final pricing may vary depending on platform fees and offers.
        </p>

        {/* BENEFITS */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Benefits of MLBB Weekly Pass
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Better value than small diamond packs</li>
          <li>Consistent daily diamond rewards</li>
          <li>Ideal for limited-time MLBB events</li>
          <li>Predictable and budget-friendly pricing</li>
        </ul>

        {/* HOW TO BUY */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          How to Buy MLBB Weekly Pass Safely
        </h2>

        <p className="mb-6">
          Always use trusted top-up platforms that only require your
          <strong> Player ID</strong> and <strong>Server ID</strong>.
          Never share passwords or OTPs.
        </p>

        <p className="mb-6">
          Buy securely from{" "}
          <Link
            href="/games/mobile-legends988"
            className="text-blue-600 font-medium underline"
          >
            MLBBTopup India
          </Link>{" "}
          for instant delivery and secure Indian payment methods like UPI,
          debit cards, and wallets.
        </p>

        {/* FAQ */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div>
            <p className="font-medium">
              Is MLBB weekly pass legal in India?
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Yes, when purchased through official or trusted platforms.
            </p>
          </div>

          <div>
            <p className="font-medium">
              Can I stack multiple weekly passes?
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              In most cases, stacking extends the duration of rewards.
            </p>
          </div>

          <div>
            <p className="font-medium">
              How fast is delivery?
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Usually within minutes after successful payment.
            </p>
          </div>
        </div>

        {/* CTA */}
       
      </article>
    </>
  );
}
