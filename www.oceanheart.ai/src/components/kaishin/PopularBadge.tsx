import { motion } from "framer-motion";

export function PopularBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute -top-3 -right-3 z-20"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl" />
        <div className="relative bg-gradient-to-br from-gold to-gold/80 text-zinc-900 text-xs font-bold px-4 py-1.5 rounded-full border border-gold/30 shadow-lg">
          MOST POPULAR
        </div>
      </div>
    </motion.div>
  );
}
