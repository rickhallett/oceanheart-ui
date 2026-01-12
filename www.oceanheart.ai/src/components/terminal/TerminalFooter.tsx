"use client";

import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";

export function TerminalFooter() {
  return (
    <footer className="bg-terminal-bg-secondary text-terminal-secondary py-12 px-6 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="font-terminal text-lg text-terminal mb-3">
              <span className="text-terminal-cyan">&gt;</span> oceanheart.ai
            </div>
            <p className="text-sm text-terminal-muted mb-4 max-w-md">
              Building AI systems that understand people.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/rickhallett"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-muted hover:text-terminal-cyan transition-colors"
                aria-label="GitHub"
              >
                <IconBrandGithub className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/richardkaihallett"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-muted hover:text-terminal-blue transition-colors"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:kai@oceanheart.ai"
                className="text-terminal-muted hover:text-terminal-green transition-colors"
                aria-label="Email"
              >
                <IconMail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-terminal text-sm text-terminal-cyan mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm font-terminal">
              <li>
                <Link href="/" className="text-terminal-muted hover:text-terminal transition-colors">
                  <span className="text-terminal-green mr-1">$</span> home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-terminal-muted hover:text-terminal transition-colors">
                  <span className="text-terminal-green mr-1">$</span> portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-terminal-muted hover:text-terminal transition-colors">
                  <span className="text-terminal-green mr-1">$</span> blog
                </Link>
              </li>
              <li>
                <Link href="/consulting" className="text-terminal-muted hover:text-terminal transition-colors">
                  <span className="text-terminal-green mr-1">$</span> consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-terminal text-sm text-terminal-purple mb-4">About</h3>
            <ul className="space-y-2 text-sm font-terminal">
              <li>
                <Link href="/kai" className="text-terminal-muted hover:text-terminal transition-colors">
                  <span className="text-terminal-green mr-1">$</span> about
                </Link>
              </li>
              <li>
                <Link href="/build" className="text-terminal-muted hover:text-terminal transition-colors">
                  <span className="text-terminal-green mr-1">$</span> build
                </Link>
              </li>
              <li>
                <a
                  href="https://calendar.app.google/RMwsbtUZ76G6VZzb7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-muted hover:text-terminal transition-colors"
                >
                  <span className="text-terminal-green mr-1">$</span> contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-terminal-muted font-terminal">
            <span className="text-terminal-green">$</span> echo &quot;© 2025 Kai Hallett. Built with Next.js.&quot;
          </p>
          <div className="flex items-center gap-4 text-xs text-terminal-muted font-terminal">
            <span className="hidden sm:inline">
              Press <kbd className="px-1 py-0.5 bg-terminal-bg-tertiary rounded-sm border border-white/10">?</kbd> for shortcuts
            </span>
            <span className="cursor-blink text-terminal-cyan">_</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
