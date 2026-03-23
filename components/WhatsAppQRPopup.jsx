"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { FiX, FiUsers, FiZap, FiCheck } from "react-icons/fi";

export default function WhatsAppCommunityPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("wa_qr_theme_popup");
    if (!shown) {
      const t = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("wa_qr_theme_popup", "1");
      }, 700);

      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center
                     bg-black/80 backdrop-blur-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Main Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[300px]"
          >
            {/* Background Glows */}
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-indigo-600/15 blur-[60px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Tactical Frame */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[var(--card)]/40 backdrop-blur-3xl p-5 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/5">
              
              {/* Internal Border Glow */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-[var(--muted)] hover:text-white transition-all duration-300 z-20 group"
              >
                <FiX size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                
                {/* Header Icon Section */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
                    <FiUsers size={28} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-blue-600 border-2 border-[var(--card)] flex items-center justify-center text-white shadow-lg">
                    <FiCheck size={12} strokeWidth={4} />
                  </div>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl font-[1000] tracking-tight uppercase italic leading-none text-[var(--foreground)]">
                    Join Our<br />
                    <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">Community</span>
                  </h2>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--muted)] opacity-50 flex items-center justify-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-500 animate-ping" />
                    Updates & Giveaways
                  </p>
                </div>

                {/* QR Section */}
                <div className="relative group p-1 w-full flex justify-center mt-1">
                  <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative rounded-3xl p-4 bg-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover:scale-[1.05] group-hover:-rotate-1 ring-1 ring-white/20">
                    <QRCodeCanvas
                      value="https://whatsapp.com/channel/0029Vb87jgR17En1n5PKy129"
                      size={120}
                      level="H"
                      includeMargin={false}
                      fgColor="#000000"
                    />
                  </div>
                  <div className="absolute -bottom-2 px-3 py-1 rounded-full bg-indigo-600 text-[8px] font-black uppercase tracking-widest text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    Scan Me
                  </div>
                </div>

                {/* Main Action Button */}
                <a
                  href="https://whatsapp.com/channel/0029Vb87jgR17En1n5PKy129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 mt-2 rounded-[1.25rem] bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(59,130,246,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 transition-all active:scale-[0.98] group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  <div className="flex items-center gap-2 relative z-10">
                    <span className="text-xs font-black uppercase italic tracking-wider">Join Now</span>
                    <FiZap size={14} className="animate-bounce" />
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
