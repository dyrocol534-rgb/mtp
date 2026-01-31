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
    <section className="relative min-h-screen flex items-center justify-center px-4 bg-[var(--background)]">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xl px-8 py-10">

          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--accent)]/10 mb-4">
              <Image
                src="/logoBB.png"
                alt="Logo"
                width={40}
                height={40}
              />
            </div>

            <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
              {success ? `Welcome Back!` : "Welcome Back"}
            </h1>

            <p className="text-sm text-[var(--muted)]">
              {success ? `Hey ${userName}, setting things up...` : "Sign in to continue"}
            </p>
          </div>

          {/* Success State */}
          {success && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-600 dark:text-green-400">
              <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-sm">
                <p className="font-semibold">Signed in successfully</p>
                <p className="opacity-80">Redirecting...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-600 dark:text-red-400">
              <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.7 7.3a1 1 0 00-1.4 1.4L8.6 10l-1.3 1.3a1 1 0 101.4 1.4L10 11.4l1.3 1.3a1 1 0 001.4-1.4L11.4 10l1.3-1.3a1 1 0 00-1.4-1.4L10 8.6 8.7 7.3z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-sm">
                <p className="font-semibold">Authentication failed</p>
                <p className="opacity-80">{error}</p>
              </div>
            </div>
          )}

          {/* Google Login Button */}
          {!success && (
            <div className="space-y-6">
              <div className={`flex justify-center transition-opacity ${loading ? "opacity-50 pointer-events-none" : ""
                }`}>
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

              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center gap-2 text-[var(--muted)] text-sm">
                  <div className="h-4 w-4 rounded-full border-2 border-[var(--border)] border-t-[var(--accent)] animate-spin" />
                  <span>Authenticating...</span>
                </div>
              )}

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--border)]" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-[var(--card)] text-[var(--muted)]">
                    Secure authentication
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="space-y-1.5">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-xs text-[var(--muted)]">Secure</p>
                </div>
                <div className="space-y-1.5">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-xs text-[var(--muted)]">Fast</p>
                </div>
                <div className="space-y-1.5">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-[var(--muted)]">Reliable</p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          {!success && (
            <div className="mt-8 pt-6 border-t border-[var(--border)]">
              <p className="text-xs text-center text-[var(--muted)] leading-relaxed">
                By continuing, you agree to our{" "}
                <a href="#" className="text-[var(--accent)] hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-[var(--accent)] hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Trust Badge */}
        {!success && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--muted)]">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Protected by Google OAuth 2.0</span>
          </div>
        )}
      </div>
    </section>
  );
}