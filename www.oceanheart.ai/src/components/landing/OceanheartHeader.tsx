"use client";
import { SparklesCore } from "@/components/ui/sparkles";

export function OceanheartHeader() {
  return (
    <div className="relative h-32 md:h-48 lg:h-64 w-full overflow-hidden">
      <SparklesCore
        id="oceanheart-sparkles"
        background="transparent"
        minSize={0.6}
        maxSize={2}
        particleDensity={60}
        speed={4}
        className="w-full h-full"
        particleColor="#f2cc8f"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-zinc-100 mb-2 md:mb-4 text-center">
          Oceanheart AI
        </h1>
        <p className="text-zinc-400 text-sm md:text-lg lg:text-xl text-center">
          Transformation Through Technology & Consciousness
        </p>
      </div>
    </div>
  );
}
