import {
  FaStore,
  FaGlobe,
  FaCogs,
  FaWhatsapp,
} from "react-icons/fa";

const services = [
  {
    title: "Be a Reseller",
    description:
      "Start selling game topups instantly with industry pricing and automated delivery.",
    badge: "Best Value",
    icon: FaStore,
    accent: "from-emerald-500/20 to-transparent",
  },
  {
    title: "Website Whitelabel",
    description:
      "Launch your own branded topup platform with full control and automation.",
    badge: "Available",
    icon: FaGlobe,
    accent: "from-blue-500/20 to-transparent",
  },
  {
    title: "Custom Topup Platform",
    description:
      "Enterprise-grade custom solutions built around your business needs.",
    badge: "Custom",
    icon: FaCogs,
    accent: "from-purple-500/20 to-transparent",
  },
];

export default function HomeServices() {
  return (
    <section className="py-14 px-4 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
            Additional Services
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Start, scale, or customize your game topup business with professional tools.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <div
                key={i}
                className="
                  group relative overflow-hidden rounded-2xl
                  bg-[var(--card)]
                  border border-[var(--border)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-xl hover:border-[var(--accent)]
                "
              >
                {/* Accent Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.accent}
                  opacity-0 group-hover:opacity-100 transition`}
                />

                {/* Content */}
                <div className="relative p-5 flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/15
                  flex items-center justify-center mb-4">
                    <Icon className="text-[var(--accent)]" />
                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-semibold mb-2">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[11px] px-2.5 py-1 rounded-full
                    bg-[var(--accent)]/15 text-[var(--accent)]">
                      {service.badge}
                    </span>

                    <a
                      href="https://wa.me/916372305866"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5
                      text-sm text-[var(--accent)] font-medium"
                    >
                      <FaWhatsapp />
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
