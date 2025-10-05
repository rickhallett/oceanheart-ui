"use client";
import { motion } from "framer-motion";
import { PillarIcon } from "./PillarIcon";

type Pillar = "view" | "compass" | "ground";

interface PillarCardProps {
  pillar: Pillar;
  title: string;
  subtitle: string;
  description: string;
  delay?: number;
}

const pillarColors = {
  view: {
    accent: "gold",
    gradient: "from-gold/0 via-gold/50 to-gold/0",
    border: "gold",
  },
  compass: {
    accent: "gold",
    gradient: "from-gold/0 via-gold/50 to-gold/0",
    border: "gold",
  },
  ground: {
    accent: "zinc-100",
    gradient: "from-white/0 via-white/50 to-white/0",
    border: "white",
  },
};

export function PillarCard({ pillar, title, subtitle, description, delay = 0 }: PillarCardProps) {
  const colors = pillarColors[pillar];

  const animationConfig = {
    view: { initial: { opacity: 0, x: -20 } },
    compass: { initial: { opacity: 0, y: 20 } },
    ground: { initial: { opacity: 0, x: 20 } },
  };

  return (
    <motion.div
      initial={animationConfig[pillar].initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group relative p-[1px] overflow-hidden"
    >
      {/* Animated border glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />

      <div className={`relative bg-black border border-${colors.border}/40 group-hover:border-${colors.border}/60 p-8 backdrop-blur-xl transition-all duration-300 h-full flex flex-col`}>
        <div className={`absolute top-0 left-0 w-1 h-0 bg-${colors.border} group-hover:h-full transition-all duration-400 origin-top`} />

        <div className="mb-4">
          <PillarIcon pillar={pillar} size={48} />
        </div>

        <h3 className="text-2xl font-serif font-normal text-zinc-100 mb-3">{title}</h3>
        <p className={`text-sm text-${colors.accent}/90 font-light mb-3 tracking-wide`}>{subtitle}</p>
        <p className="text-zinc-400 font-light leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
