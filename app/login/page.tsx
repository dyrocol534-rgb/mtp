"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGoogleLogin = async (credential: string) => {
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
        return;
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userName", data.user.name);
      sessionStorage.setItem("email", data.user.email);
      sessionStorage.setItem("userId", data.user.userId);

      setSuccess("Signed in successfully. Redirecting...");
      setTimeout(() => (window.location.href = "/"), 800);
    } catch {
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-[var(--background)]">

      {/* Watermark Background */}
      <div
        className="pointer-events-none absolute inset-0 bg-center bg-no-repeat opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: "url('/logoBB.png')",
          backgroundSize: "420px",
        }}
      />

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-white/80 dark:bg-black/40 border border-black/10 dark:border-white/10 shadow-2xl backdrop-blur-xl p-6 sm:p-8">

        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 dark:bg-black/40 shadow">
            <Image
              src="/logoBB.png"
              alt="Logo"
              width={48}
              height={48}
              priority
            />
          </div>

          <h1 className="text-xl font-semibold text-[var(--foreground)]">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Sign in to continue
          </p>
        </div>

        {/* Success */}
        {success && (
          <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-600 dark:text-green-400">
            {success}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Google Button */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(res) =>
              res.credential && handleGoogleLogin(res.credential)
            }
            onError={() => setError("Google authentication was cancelled")}
            theme="outline"
            size="large"
            shape="pill"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--muted)]">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-[var(--muted)] border-t-[var(--foreground)]" />
            Authenticating…
          </div>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[var(--muted)]">
          By continuing, you agree to our{" "}
          <span className="text-[var(--foreground)] font-medium">Terms</span>{" "}
          &{" "}
          <span className="text-[var(--foreground)] font-medium">
            Privacy Policy
          </span>
        </p>
      </div>
    </section>
  );
}
