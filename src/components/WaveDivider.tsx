"use client";

import { motion } from "motion/react";

interface WaveDividerProps {
  /** hex or tailwind-compatible color for the top section's bg */
  fromColor: string;
  /** hex or tailwind-compatible color for the bottom section's bg */
  toColor: string;
  /** flip the wave horizontally for variation */
  flip?: boolean;
  /** optional className on the container */
  className?: string;
}

/**
 * WaveDivider — an SVG wave that transitions between two section colors.
 * The wave itself is animated on scroll enter for a gentle, living feel.
 * Uses a full-bleed layout to break out of the max-width container.
 */
export default function WaveDivider({ fromColor, toColor, flip = false, className = "" }: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-screen ml-[calc(50%-50vw)] overflow-hidden leading-none ${className}`}
      style={{ backgroundColor: fromColor }}
    >
      <motion.svg
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full block"
        style={{
          transform: flip ? "scaleX(-1)" : undefined,
          display: "block",
        }}
      >
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
          fill={toColor}
        />
      </motion.svg>
    </div>
  );
}
