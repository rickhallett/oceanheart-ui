"use client";

import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { IconMail, IconCheck } from "@tabler/icons-react";
import Link from "next/link";

export default function VerifyRequestPage() {
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
          {/* Icon with Animation */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center relative"
            >
              <IconMail className="w-8 h-8 text-gold" />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-jade rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(93,214,174,0.4)]"
              >
                <IconCheck className="w-4 h-4 text-zinc-900" />
              </motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-light text-zinc-100 mb-3">
              Check Your Email
            </h1>
            <p className="text-zinc-400 mb-4">
              A sign-in link has been sent to your email address.
            </p>
            <p className="text-sm text-zinc-500">
              Click the link in the email to sign in to your account.
              The link will expire in 24 hours.
            </p>
          </div>

          {/* Info Box */}
          <div className="mb-6 p-4 bg-gold/10 border border-gold/20 rounded-lg">
            <div className="flex items-start gap-3">
              <IconMail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <div className="text-sm text-zinc-300">
                <p className="font-medium text-zinc-100 mb-1">Didn&apos;t receive the email?</p>
                <ul className="list-disc list-inside space-y-1 text-zinc-400">
                  <li>Check your spam folder</li>
                  <li>Make sure you entered the correct email</li>
                  <li>Wait a few minutes and check again</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="block w-full bg-gold hover:shadow-[0_0_30px_rgba(212,165,116,0.5)] text-zinc-900 text-center font-medium py-3 px-6 rounded-lg transition-all"
            >
              Back to Sign In
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
