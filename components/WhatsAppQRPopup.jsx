"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";

export default function WhatsAppCommunityPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("wa_qr_theme_popup");
    if (!shown) {
      setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("wa_qr_theme_popup", "1");
      }, 700);
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black/60 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Card */}
          <motion.div
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="
              relative w-full max-w-sm rounded-[28px]
              border border-[var(--border)]
              bg-gradient-to-br
              from-[var(--card)]
              via-[var(--background)]
              to-[var(--card)]
              p-6 shadow-2xl
            "
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-lg
                         text-[var(--muted)]
                         hover:text-[var(--foreground)]
                         transition"
            >
              ✕
            </button>

            {/* Content */}
            <div className="flex flex-col items-center text-center gap-4">
              <h2 className="text-xl font-extrabold leading-snug">
                Join Our Buyer&apos;s
                <br />
                <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]
                                 bg-clip-text text-transparent">
                  WhatsApp Community
                </span>
              </h2>

              <p className="text-sm text-[var(--muted)]">
                Get exclusive offers & early access deals every week ✨
              </p>

              {/* QR */}
              <div
                className="
                  rounded-2xl p-4
                  bg-gradient-to-br
                  from-white
                  to-gray-100
                  border border-[var(--accent)]/40
                  shadow-lg
                "
              >
                <QRCodeCanvas
                  value="https://wa.me/916372305866?text=Hi%20I%20want%20to%20join%20the%20buyers%20community"
                  size={180}
                  level="H"
                />
              </div>

              <p className="text-xs text-[var(--muted)]">
                Scan the QR code to join instantly
              </p>

              {/* Gradient CTA */}
              <a
                href="https://wa.me/916372305866"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-2 w-full rounded-full py-3
                  font-bold text-sm
                  bg-gradient-to-r
                  from-[var(--accent)]
                  to-[var(--accent-secondary)]
                  text-black
                  hover:brightness-110
                  active:scale-[0.98]
                  transition
                "
              >
                Join Now
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
