"use client";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Blue Buff";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-5 py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--accent)] mb-4">
          Terms & Conditions
        </h1>

        <p className="text-sm text-[var(--muted)] mb-10">
          Last updated: January 5, 2026
        </p>

        <p className="mb-8 leading-relaxed">
          Welcome to <strong>{BRAND}</strong>. By accessing or using our website,
          placing an order, or using any services provided through our platform,
          you agree to comply with and be bound by the following Terms & Conditions.
          If you do not agree with any part of these terms, you must discontinue use
          of the platform immediately.
        </p>

        {/* 1 */}
        <Section
          title="1. Eligibility & Account Responsibility"
          content={
            <>
              You must be at least 18 years old or have parental/guardian
              permission to use this platform.
              <br /><br />
              You are responsible for maintaining the confidentiality of your
              account details and for all activities that occur under your account.
            </>
          }
        />

        {/* 2 */}
        <Section
          title="2. Use of the Platform"
          content={
            <>
              You agree to use {BRAND} only for lawful purposes.
              <br /><br />
              You must provide accurate and complete information when placing
              orders, including game ID, server/zone, and contact details.
              Incorrect information may result in failed or irreversible
              transactions.
            </>
          }
        />

        {/* 3 */}
        <Section
          title="3. Orders & Digital Delivery"
          content={
            <>
              All products sold on {BRAND} are digital services.
              <br /><br />
              • Orders are processed automatically or semi-automatically.  
              <br />
              • Once successfully delivered, orders are final.  
              <br />
              • We are not responsible for errors caused by incorrect user input.
              <br /><br />
              By placing an order, you confirm that you are authorized to use the
              selected game account.
            </>
          }
        />

        {/* 4 */}
        <Section
          title="4. Payments"
          content={
            <>
              Payments are processed through secure third-party payment gateways.
              {BRAND} does not store sensitive payment information.
              <br /><br />
              We reserve the right to cancel or delay orders in cases of suspected
              fraud, payment disputes, or technical issues.
            </>
          }
        />

        {/* 5 */}
        <Section
          title="5. Refund Policy"
          content={
            <>
              Due to the digital and instant nature of our services:
              <br /><br />
              • Successfully delivered orders are non-refundable.  
              <br />
              • Refunds may be considered only if a transaction fails and no value
              is credited to the game account.
              <br /><br />
              Refund decisions are made at the sole discretion of {BRAND}.
            </>
          }
        />

        {/* 6 */}
        <Section
          title="6. Prohibited Activities"
          content={
            <>
              You must not:
              <br /><br />
              • Exploit pricing errors or system vulnerabilities  
              <br />
              • Engage in fraudulent transactions  
              <br />
              • Interfere with platform security  
              <br />
              • Use automated bots without authorization  
              <br />
              • Resell services without written permission (unless allowed)
            </>
          }
        />

        {/* 7 */}
        <Section
          title="7. Intellectual Property"
          content={
            <>
              All content, branding, logos, and platform materials are owned by
              {BRAND} unless otherwise stated.
              <br /><br />
              Game titles, trademarks, and logos belong to their respective
              publishers. {BRAND} is not affiliated with, endorsed by, or
              sponsored by any game publisher.
            </>
          }
        />

        {/* 8 */}
        <Section
          title="8. Limitation of Liability"
          content={
            <>
              {BRAND} shall not be liable for:
              <br /><br />
              • Losses caused by incorrect user input  
              <br />
              • Delays due to maintenance or third-party APIs  
              <br />
              • Game account restrictions or bans  
              <br />
              • Indirect or consequential damages
            </>
          }
        />

        {/* 9 */}
        <Section
          title="9. Account Suspension & Termination"
          content={
            <>
              We reserve the right to suspend or terminate accounts that violate
              these Terms or engage in suspicious activity without prior notice.
            </>
          }
        />

        {/* 10 */}
        <Section
          title="10. Changes to Terms"
          content={
            <>
              {BRAND} may update these Terms at any time.
              Changes become effective immediately upon posting.
              Continued use of the platform constitutes acceptance of the updated Terms.
            </>
          }
        />

        {/* 11 */}
        <Section
          title="11. Governing Law"
          content={
            <>
              These Terms shall be governed by and interpreted in accordance with
              the laws of your operating jurisdiction. Any disputes arising from
              these Terms shall be subject to the exclusive jurisdiction of the
              competent courts in that region.
            </>
          }
        />

        <div className="mt-12 pt-6 border-t border-[var(--border)] text-sm text-[var(--muted)]">
          For any questions regarding these Terms, please contact us through the
          official support channels listed on our website.
        </div>
      </div>
    </main>
  );
}

/* Reusable Section Component */
function Section({ title, content }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-[var(--accent)] mb-3">
        {title}
      </h2>
      <p className="leading-relaxed text-[var(--foreground)]/90">
        {content}
      </p>
    </section>
  );
}
