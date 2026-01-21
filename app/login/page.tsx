"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userName, setUserName] = useState("");

  const handleGoogleLogin = async (credential: string) => {
    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credential }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Authentication failed");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userName", data.user.name);
      sessionStorage.setItem("email", data.user.email);
      sessionStorage.setItem("userId", data.user.userId);

      setUserName(data.user.name);
      setSuccess("done");

      setTimeout(() => {
        window.location.replace("/");
      }, 1200);
    } catch {
      setError("Google login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 bg-background text-foreground overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-140px] right-[-140px] w-[520px] h-[520px] bg-accent/15 rounded-full blur-[140px]" />
      </div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md">
        {/* SOFT OUTER GLOW */}
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl opacity-60" />

        <div className="relative rounded-[28px] bg-card/80 backdrop-blur-2xl border border-border shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] p-9 sm:p-11 transition-all duration-500">
          {/* LOGO */}
          <div className="text-center mb-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-background border border-border shadow-md">
              <Image src="/logoBB.png" alt="Logo" width={52} height={52} />
            </div>

            <h1 className="text-[26px] font-semibold tracking-tight">
              {success ? `Welcome, ${userName}` : "Welcome back"}
            </h1>

            <p className="mt-2 text-sm text-foreground/60">
              {success
                ? "Setting things up for you…"
                : "Sign in to continue"}
            </p>
          </div>

          {/* SUCCESS */}
          {success && (
            <div className="mb-8 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400 animate-in fade-in zoom-in-95 duration-300">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Signed in successfully
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 animate-in fade-in slide-in-from-top-2 duration-300">
              {error}
            </div>
          )}

          {/* GOOGLE LOGIN */}
          {!success && (
            <div className="flex justify-center">
              <div
                className={`relative transition-all duration-300 ${
                  loading ? "opacity-40 pointer-events-none scale-[0.98]" : ""
                }`}
              >
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-accent opacity-0 hover:opacity-25 blur-md transition" />
                <GoogleLogin
                  onSuccess={(res) =>
                    res.credential && handleGoogleLogin(res.credential)
                  }
                  onError={() =>
                    setError("Google authentication was cancelled")
                  }
                  theme="outline"
                  size="large"
                  shape="pill"
                />
              </div>
            </div>
          )}

          {/* LOADING */}
          {loading && !success && (
            <div className="mt-6 flex items-center justify-center gap-3 text-sm text-foreground/60 animate-in fade-in duration-300">
              <span className="relative flex h-4 w-4">
                <span className="absolute inset-0 rounded-full border-2 border-border" />
                <span className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </span>
              Authenticating securely…
            </div>
          )}

          {/* FOOTER */}
          {!success && (
            <div className="mt-10 pt-6 border-t border-border text-center">
              <p className="text-xs text-foreground/45 leading-relaxed">
                By continuing, you agree to our{" "}
                <span className="font-medium text-foreground hover:text-primary transition underline underline-offset-4">
                  Terms
                </span>{" "}
                and{" "}
                <span className="font-medium text-foreground hover:text-primary transition underline underline-offset-4">
                  Privacy Policy
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
