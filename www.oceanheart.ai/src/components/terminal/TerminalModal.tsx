"use client";
import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function TerminalModal({ isOpen, onClose, children, title }: TerminalModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Handle click outside
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-terminal-bg border border-white/10 rounded-sm overflow-hidden shadow-2xl"
          >
            {/* Terminal header bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-terminal-bg-secondary border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-terminal-red hover:brightness-110 transition-all"
                    aria-label="Close"
                  />
                  <div className="w-3 h-3 rounded-full bg-terminal-orange/50" />
                  <div className="w-3 h-3 rounded-full bg-terminal-green/50" />
                </div>
                {title && (
                  <span className="ml-3 font-terminal text-xs text-terminal-muted">
                    {title}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1 text-terminal-muted hover:text-terminal-cyan transition-colors"
                aria-label="Close modal"
              >
                <IconX className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-52px)]">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
