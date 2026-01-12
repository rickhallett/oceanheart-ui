"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { IconBrandGoogle, IconBrandGithub, IconMail } from "@tabler/icons-react";
import { AUTH_CONFIG } from "@/config/features";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || AUTH_CONFIG.successRedirectUri;

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("resend", {
        email,
        redirect: false,
        callbackUrl,
      });

      if (result?.ok) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl });
  };

  if (emailSent) {
    return (
      <main className="relative bg-black min-h-screen flex items-center justify-center overflow-hidden">
        <Spotlight className="top-0 left-1/4 md:-top-20" fill="#4fc3f7" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md px-6"
        >
          <div className="bg-black border border-white/[0.1] backdrop-blur-xl rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-ocean-blue/20 rounded-full flex items-center justify-center">
                <IconMail className="w-8 h-8 text-ocean-blue" />
              </div>
            </div>

            <h2 className="text-2xl font-light text-zinc-100 mb-2">
              Check Your Email
            </h2>

            <p className="text-zinc-400 mb-6">
              We sent a magic link to <strong className="text-zinc-100">{email}</strong>
            </p>

            <p className="text-sm text-zinc-500">
              Click the link in the email to sign in to your account.
              The link expires in 24 hours.
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative bg-black min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <Spotlight className="top-0 left-1/4 md:-top-20" fill="#4fc3f7" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary/5 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-black border border-white/[0.1] backdrop-blur-xl rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-zinc-100 mb-2">
              Welcome to <span className="text-gold">The Kaishin Method</span>
            </h1>
            <p className="text-zinc-400">Sign in to access your member portal</p>
          </div>

          {/* Email Sign-In Form */}
          <form onSubmit={handleEmailSignIn} className="mb-6">
            <label htmlFor="email" className="block text-sm text-zinc-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-ocean-blue/50 transition-colors disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full mt-4 bg-ocean-blue hover:bg-ocean-blue/90 text-black font-medium py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending magic link...
                </>
              ) : (
                <>
                  <IconMail className="w-5 h-5" />
                  Continue with Email
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.1]"></div>
            </div>
            <div className="relative bg-black px-4 text-sm text-zinc-500">
              Or continue with
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuthSignIn("google")}
              className="w-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-zinc-100 font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <IconBrandGoogle className="w-5 h-5" />
              Sign in with Google
            </button>

            <button
              onClick={() => handleOAuthSignIn("github")}
              className="w-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-zinc-100 font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <IconBrandGithub className="w-5 h-5" />
              Sign in with GitHub
            </button>
          </div>


          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-500">
              New to The Kaishin Method?{" "}
              <Link href="/#book" className="text-gold hover:underline">
                Purchase Access
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <main className="relative bg-black min-h-screen flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </main>
    }>
      <SignInForm />
    </Suspense>
  );
}
