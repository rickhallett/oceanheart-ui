"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { IconAlertCircle } from "@tabler/icons-react";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, { title: string; description: string }> = {
    Configuration: {
      title: "Configuration Error",
      description: "There is a problem with the server configuration. Please contact support.",
    },
    AccessDenied: {
      title: "Access Denied",
      description: "You do not have permission to sign in. Please contact support if you believe this is an error.",
    },
    Verification: {
      title: "Verification Link Expired",
      description: "The verification link has expired. Please request a new one.",
    },
    OAuthSignin: {
      title: "OAuth Sign-In Error",
      description: "Error connecting to the authentication provider. Please try again.",
    },
    OAuthCallback: {
      title: "OAuth Callback Error",
      description: "Authentication failed during the callback. Please try again.",
    },
    OAuthCreateAccount: {
      title: "Cannot Create Account",
      description: "Could not create your account. The email may already be in use with a different provider.",
    },
    EmailCreateAccount: {
      title: "Cannot Create Account",
      description: "Could not create your account with this email. Please try again.",
    },
    Callback: {
      title: "Callback Error",
      description: "Authentication callback failed. Please try again.",
    },
    Default: {
      title: "Authentication Error",
      description: "An error occurred during sign-in. Please try again.",
    },
  };

  const errorInfo = errorMessages[error || "Default"] || errorMessages.Default;

  return (
    <main className="relative bg-black min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <Spotlight className="top-0 left-1/4 md:-top-20" fill="#ef4444" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-500/5 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-black border border-rust/30 backdrop-blur-xl rounded-2xl p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-rust/20 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(229,115,115,0.3)]">
              <IconAlertCircle className="w-8 h-8 text-rust" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-light text-zinc-100 mb-3">{errorInfo.title}</h1>
            <p className="text-zinc-400">{errorInfo.description}</p>
          </div>

          {/* Error Code (if available) */}
          {error && (
            <div className="mb-6 p-3 bg-rust/10 border border-rust/20 rounded-lg">
              <p className="text-sm text-rust text-center">
                Error Code: <code className="font-mono">{error}</code>
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="block w-full bg-gold hover:shadow-[0_0_30px_rgba(212,165,116,0.5)] text-zinc-900 text-center font-medium py-3 px-6 rounded-lg transition-all"
            >
              Try Again
            </Link>

            <Link
              href="/"
              className="block w-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-zinc-100 text-center font-medium py-3 px-6 rounded-lg transition-all"
            >
              Go to Home
            </Link>
          </div>

          {/* Support Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-500">
              Need help?{" "}
              <a href="mailto:support@becomingdiamond.com" className="text-gold hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
