"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  FaComments,
  FaPaperPlane,
  FaRobot,
  FaXmark,
} from "react-icons/fa6";

/* ================= CONFIG ================= */

const SUPPORT_PHONE = "6372305866";
const SUPPORT_EMAIL = "tusharkantanayak713@gmail.com";

const ALLOWED_ROUTES = ["/", "/home"];

/* ================= TYPES ================= */

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

type Context = {
  topic?: "pricing" | "support";
  userName?: string;
  unknownCount: number;
};

/* ================= UTILS ================= */

const random = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

/* ================= COMPONENT ================= */

export default function ChatBot() {
  /* ---------- ROUTE GUARD ---------- */
  // const pathname = usePathname();
  // if (!ALLOWED_ROUTES.includes(pathname)) return null;

  /* ---------- STATE ---------- */
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      text: "Hi 👋 I'm your assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  /* ---------- REFS ---------- */
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contextRef = useRef<Context>({ unknownCount: 0 });

  /* ================= AUTO SCROLL ================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* ================= CLOSE ON OUTSIDE CLICK ================= */

  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  /* ================= ESC KEY CLOSE ================= */

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  /* ================= SCROLL HIDE / SHOW ================= */

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 60 && !isOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  /* ================= BOT BRAIN ================= */

  const getBotResponse = (input: string): string => {
    const msg = input.toLowerCase();
    const ctx = contextRef.current;

    const nameMatch = msg.match(/my name is (\w+)/);
    if (nameMatch) {
      ctx.userName = nameMatch[1];
      ctx.unknownCount = 0;
      return `Nice to meet you, ${ctx.userName} 😊 How can I help?`;
    }

    if (/^(hi|hello|hey)/.test(msg)) {
      ctx.unknownCount = 0;
      return random([
        "Hey! 👋 What are you looking for today?",
        "Hi there 😊 Need prices, top-ups, or support?",
        "Hello! How can I assist you today?",
      ]);
    }

    if (msg.includes("price") || msg.includes("cost")) {
      ctx.topic = "pricing";
      ctx.unknownCount = 0;
      return "Sure 💰 Which game are you checking prices for? (MLBB / PUBG)";
    }

    if (ctx.topic === "pricing") {
      if (msg.includes("mlbb"))
        return "MLBB diamonds start from ₹99 ⚡ Instant delivery.";
      if (msg.includes("pubg"))
        return "PUBG UC prices depend on pack size 🎮 Small or large packs?";
    }

    if (msg.includes("support") || msg.includes("issue")) {
      ctx.topic = "support";
      ctx.unknownCount = 0;
      return "I'm sorry about that 😕 Is it a payment issue or delivery issue?";
    }

    ctx.unknownCount++;

    if (ctx.unknownCount >= 2) {
      return (
        "I might be missing something 😅\n\n" +
        `📞 Customer Support: ${SUPPORT_PHONE}\n` +
        `📧 Email: ${SUPPORT_EMAIL}`
      );
    }

    return random([
      "Hmm 🤔 Can you explain a bit more?",
      "Got it 👍 Could you give me more details?",
    ]);
  };

  /* ================= SEND MESSAGE ================= */

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((p) => [...p, userMsg]);
    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((p) => [
        ...p,
        {
          id: Date.now().toString(),
          text: getBotResponse(userMsg.text),
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 700 + Math.random() * 600);
  };

  /* ================= UI ================= */

  return (
    <motion.div
      ref={chatRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 left-6 z-50"
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4 w-80 sm:w-96 h-[500px] bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-indigo-500 to-purple-500 p-4 flex items-center justify-between overflow-hidden">
              {/* Animated background */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />

              <div className="flex gap-3 items-center relative z-10">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <FaRobot className="text-white" />
                </motion.div>
                <div>
                  <h3 className="text-white font-semibold">AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="w-2 h-2 rounded-full bg-green-400"
                    />
                    <p className="text-xs text-white/80">Online</p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="relative z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
                aria-label="Close chat"
              >
                <FaXmark />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <AnimatePresence initial={false}>
                {messages.map((m, index) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`flex gap-2 ${m.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                  >
                    {m.sender === "bot" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-lg"
                      >
                        <FaRobot className="text-sm" />
                      </motion.div>
                    )}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm whitespace-pre-line shadow-md ${m.sender === "user"
                        ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-tr-sm"
                        : "bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 rounded-tl-sm"
                        }`}
                    >
                      {m.text}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-2 items-center"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-lg">
                      <FaRobot className="text-sm" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-gray-100 dark:bg-zinc-800 flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            y: [0, -8, 0],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                          className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-gray-200 dark:border-zinc-700 flex gap-2"
            >
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-zinc-800 outline-none text-sm focus:ring-2 focus:ring-indigo-500 transition"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={!message.trim()}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <FaPaperPlane className="text-sm" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="group relative"
        aria-label="Toggle chat"
      >
        {/* Pulsing glow */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 blur-xl"
        />

        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Shimmer */}
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />

          {/* Icon */}
          <motion.div
            animate={{
              rotate: isOpen ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {isOpen ? <FaXmark className="text-xl" /> : <FaComments className="text-xl" />}
          </motion.div>

          {/* Notification dot */}
          {!isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
            >
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 bg-red-500 rounded-full"
              />
            </motion.div>
          )}
        </div>
      </motion.button>
    </motion.div>
  );
}
