"use client";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Blue Buff";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mlbbtopup.in";


export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-5 py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--accent)] mb-4">
          Privacy Policy
        </h1>

        <p className="text-sm text-[var(--muted)] mb-10">
          Last updated: November 2025
        </p>

        <p className="mb-8 leading-relaxed">
          At <strong>{BRAND}</strong>, your privacy is important to us. This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you access or use our platform.
        </p>

        <Section
          title="1. Information We Collect"
          content={
            <>
              <strong>Account & Order Information:</strong> Email address,
              phone number, game ID, server details, and order history.
              <br /><br />
              <strong>Payment Information:</strong> Payments are processed via
              secure third-party gateways. We do not store sensitive payment
              credentials.
              <br /><br />
              <strong>Technical Data:</strong> IP address, browser type,
              device information, and usage logs for analytics and fraud
              prevention.
            </>
          }
        />

        <Section
          title="2. How We Use Your Information"
          content={
            <>
              We use collected information to:
              <br /><br />
              • Process and deliver orders accurately  
              <br />
              • Prevent fraud and unauthorized transactions  
              <br />
              • Improve platform functionality  
              <br />
              • Provide customer support  
              <br /><br />
              We do not sell or trade personal data for marketing purposes.
            </>
          }
        />

        <Section
          title="3. Cookies & Tracking Technologies"
          content={
            <>
              We use cookies to maintain sessions, remember preferences, and
              analyze traffic. You may disable cookies through browser settings,
              though some features may not function properly.
            </>
          }
        />

        <Section
          title="4. Data Retention"
          content={
            <>
              We retain personal data only as long as necessary to fulfill
              transactional, legal, or regulatory obligations. Order records may
              be stored for accounting and dispute resolution purposes.
            </>
          }
        />

        <Section
          title="5. Data Security"
          content={
            <>
              We implement appropriate technical and organizational safeguards
              to protect personal information. However, no online system can
              guarantee absolute security.
            </>
          }
        />

        <Section
          title="6. Third-Party Services"
          content={
            <>
              We may rely on third-party providers for payment processing,
              analytics, hosting, and content delivery. These services operate
              under their own privacy policies.
            </>
          }
        />

        <Section
          title="7. International Data Transfers"
          content={
            <>
              If you access our platform from outside our primary operating
              jurisdiction, your data may be transferred and processed in other
              regions in accordance with applicable laws.
            </>
          }
        />

        <Section
          title="8. Your Rights"
          content={
            <>
              Depending on your location, you may have the right to:
              <br /><br />
              • Access your personal data  
              <br />
              • Request corrections  
              <br />
              • Request deletion (subject to legal obligations)  
              <br /><br />
              To exercise these rights, please contact us via our{" "}
              <a href="/contact" className="text-[var(--accent)] hover:underline">
                Contact Page
              </a>.
            </>
          }
        />

        <Section
          title="9. Children’s Privacy"
          content={
            <>
              Our services are not directed toward children under 13 (or the
              minimum legal age in your jurisdiction). We do not knowingly
              collect personal data from minors without parental consent.
            </>
          }
        />

        <Section
          title="10. Policy Updates"
          content={
            <>
              We may update this Privacy Policy from time to time. Updates will
              be posted on this page with a revised “Last updated” date.
            </>
          }
        />

        <div className="mt-12 pt-6 border-t border-[var(--border)] text-sm text-[var(--muted)]">
          If you have questions regarding this Privacy Policy, please contact{" "}
          <a href="/contact" className="text-[var(--accent)] hover:underline">
            {BRAND} Support
          </a>.
        </div>
      </div>
    </main>
  );
}

/* Reusable Section */
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
