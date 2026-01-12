"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Shortcut {
  keys: string[];
  description: string;
  action: () => void;
}

export function KeyboardNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [showHelp, setShowHelp] = useState(false);
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Check if we're on a touch device
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const shortcuts: Shortcut[] = [
    { keys: ["g", "h"], description: "Go to Home", action: () => router.push("/") },
    { keys: ["g", "p"], description: "Go to Portfolio", action: () => router.push("/portfolio") },
    { keys: ["g", "b"], description: "Go to Blog", action: () => router.push("/blog") },
    { keys: ["g", "c"], description: "Go to Consulting", action: () => router.push("/consulting") },
    { keys: ["g", "a"], description: "Go to About", action: () => router.push("/kai") },
    { keys: ["g", "s"], description: "Go to Build", action: () => router.push("/build") },
    { keys: ["?"], description: "Show help", action: () => setShowHelp(true) },
    { keys: ["Escape"], description: "Close overlay", action: () => setShowHelp(false) },
    { keys: ["j"], description: "Scroll down", action: () => window.scrollBy({ top: 100, behavior: "smooth" }) },
    { keys: ["k"], description: "Scroll up", action: () => window.scrollBy({ top: -100, behavior: "smooth" }) },
    { keys: ["G"], description: "Go to bottom", action: () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }) },
    { keys: ["g", "g"], description: "Go to top", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  ];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      const key = e.key;

      // Handle ? for help (needs shift check)
      if (key === "?" || (e.shiftKey && key === "/")) {
        e.preventDefault();
        setShowHelp((prev) => !prev);
        return;
      }

      // Handle Escape
      if (key === "Escape") {
        setShowHelp(false);
        setPendingKey(null);
        return;
      }

      // Handle two-key sequences (g + something)
      if (pendingKey === "g") {
        const twoKeyShortcut = shortcuts.find(
          (s) => s.keys.length === 2 && s.keys[0] === "g" && s.keys[1] === key
        );
        if (twoKeyShortcut) {
          e.preventDefault();
          twoKeyShortcut.action();
          setShowToast(twoKeyShortcut.description);
          setTimeout(() => setShowToast(null), 1500);
        }
        setPendingKey(null);
        return;
      }

      // Handle single key shortcuts
      if (key === "g") {
        setPendingKey("g");
        // Clear pending after timeout
        setTimeout(() => setPendingKey(null), 1000);
        return;
      }

      // j/k scroll, G for bottom
      if (key === "j") {
        window.scrollBy({ top: 100, behavior: "smooth" });
        return;
      }
      if (key === "k") {
        window.scrollBy({ top: -100, behavior: "smooth" });
        return;
      }
      if (key === "G" && e.shiftKey) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        return;
      }
    },
    [pendingKey, router, shortcuts]
  );

  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, isTouchDevice]);

  // Don't render anything on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Pending key indicator */}
      <AnimatePresence>
        {pendingKey && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-4 right-4 z-50 px-3 py-2 bg-terminal-bg-secondary border border-terminal-cyan/30 rounded-sm font-terminal text-sm text-terminal-cyan"
          >
            <span className="text-terminal-green">$</span> {pendingKey}_
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-4 right-4 z-50 px-3 py-2 bg-terminal-bg-secondary border border-terminal-green/30 rounded-sm font-terminal text-sm text-terminal-green"
          >
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help overlay */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-terminal-bg border border-white/10 rounded-sm p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-terminal text-terminal-muted text-xs mb-1">
                    <span className="text-terminal-green">$</span> help --keyboard
                  </p>
                  <h2 className="font-terminal text-xl text-terminal">Keyboard Shortcuts</h2>
                </div>
                <button
                  onClick={() => setShowHelp(false)}
                  className="font-terminal text-terminal-muted hover:text-terminal-red transition-colors"
                >
                  [ESC]
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-terminal text-sm text-terminal-cyan mb-2">Navigation</h3>
                  <div className="space-y-2">
                    {shortcuts
                      .filter((s) => s.keys[0] === "g" && s.keys.length === 2)
                      .map((shortcut) => (
                        <div key={shortcut.keys.join("")} className="flex justify-between items-center">
                          <span className="text-terminal text-sm">{shortcut.description}</span>
                          <div className="flex gap-1">
                            {shortcut.keys.map((k, i) => (
                              <kbd
                                key={i}
                                className="px-2 py-1 bg-terminal-bg-tertiary text-terminal font-terminal text-xs rounded-sm border border-white/20"
                              >
                                {k}
                              </kbd>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-terminal text-sm text-terminal-purple mb-2">Scrolling</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-terminal text-sm">Scroll down</span>
                      <kbd className="px-2 py-1 bg-terminal-bg-tertiary text-terminal font-terminal text-xs rounded-sm border border-white/20">
                        j
                      </kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-terminal text-sm">Scroll up</span>
                      <kbd className="px-2 py-1 bg-terminal-bg-tertiary text-terminal font-terminal text-xs rounded-sm border border-white/20">
                        k
                      </kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-terminal text-sm">Go to top</span>
                      <div className="flex gap-1">
                        <kbd className="px-2 py-1 bg-terminal-bg-tertiary text-terminal font-terminal text-xs rounded-sm border border-white/20">
                          g
                        </kbd>
                        <kbd className="px-2 py-1 bg-terminal-bg-tertiary text-terminal font-terminal text-xs rounded-sm border border-white/20">
                          g
                        </kbd>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-terminal text-sm">Go to bottom</span>
                      <kbd className="px-2 py-1 bg-terminal-bg-tertiary text-terminal font-terminal text-xs rounded-sm border border-white/20">
                        G
                      </kbd>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-terminal text-sm text-terminal-green mb-2">General</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-terminal text-sm">Show this help</span>
                      <kbd className="px-2 py-1 bg-terminal-bg-tertiary text-terminal font-terminal text-xs rounded-sm border border-white/20">
                        ?
                      </kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-terminal text-sm">Close overlay</span>
                      <kbd className="px-2 py-1 bg-terminal-bg-tertiary text-terminal font-terminal text-xs rounded-sm border border-white/20">
                        ESC
                      </kbd>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="font-terminal text-xs text-terminal-secondary">
                  <span className="text-terminal-green">tip:</span> Press{" "}
                  <kbd className="px-1 py-0.5 bg-terminal-bg-tertiary text-terminal rounded-sm border border-white/20">?</kbd> anytime to see shortcuts
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Current page indicator component
export function CurrentPageIndicator() {
  const pathname = usePathname();

  const getPageName = () => {
    if (pathname === "/") return "home";
    if (pathname === "/portfolio") return "portfolio";
    if (pathname === "/blog" || pathname.startsWith("/blog/")) return "blog";
    if (pathname === "/consulting") return "consulting";
    if (pathname === "/kai") return "about";
    if (pathname === "/build") return "build";
    return pathname.slice(1);
  };

  return (
    <div className="font-terminal text-xs text-terminal-muted">
      <span className="text-terminal-cyan">&gt;</span> {getPageName()}
    </div>
  );
}
