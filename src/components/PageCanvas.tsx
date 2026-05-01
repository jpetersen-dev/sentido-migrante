"use client";

import { useEffect, useRef } from "react";

/**
 * PageCanvas — an animated organic background that lives inside the main
 * content area. Soft gradient blobs drift slowly, creating a living backdrop
 * that all glass sections layer on top of. Invisible on its own, rich when
 * seen through the translucent section cards.
 */
export default function PageCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/*
        SVG: tall organic background — paths and blobs designed to flow
        along the full page height. Coordinates are in a 390×2400 viewport
        (mobile-first: 390px wide = iPhone 14 width, 2400 = ~4 screens tall).
      */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMin slice"
        viewBox="0 0 390 2400"
      >
        <defs>
          {/* Soft radial gradient blobs */}
          <radialGradient id="blob1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A2BC97" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#A2BC97" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="blob2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DAEDDF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#DAEDDF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="blob3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#516750" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#516750" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="blob4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A2BC97" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#A2BC97" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── BLOB 1: top-right, large warm green ── */}
        <ellipse cx="340" cy="280" rx="220" ry="200" fill="url(#blob1)" />

        {/* ── BLOB 2: left of manifesto section ── */}
        <ellipse cx="-30" cy="700" rx="200" ry="240" fill="url(#blob2)" />

        {/* ── BLOB 3: center, around services ── */}
        <ellipse cx="200" cy="1100" rx="280" ry="220" fill="url(#blob3)" />

        {/* ── BLOB 4: lower right, near testimonials ── */}
        <ellipse cx="380" cy="1700" rx="200" ry="260" fill="url(#blob4)" />

        {/* ── BLOB 5: bottom left ── */}
        <ellipse cx="20" cy="2200" rx="240" ry="200" fill="url(#blob2)" />

        {/* ───── Fine arc strokes — the "design signature" ───── */}

        {/* Arc 1: flows from top-left down to center */}
        <path
          d="M -20 120 C 60 300, 80 500, 40 750"
          fill="none"
          stroke="#A2BC97"
          strokeWidth="0.8"
          opacity="0.25"
          strokeLinecap="round"
        />

        {/* Arc 2: parallel, slightly offset */}
        <path
          d="M 10 80 C 100 280, 120 480, 80 730"
          fill="none"
          stroke="#647453"
          strokeWidth="0.5"
          opacity="0.18"
          strokeLinecap="round"
        />

        {/* Arc 3: right side, mid-page sweep */}
        <path
          d="M 410 600 C 340 800, 360 1000, 420 1200"
          fill="none"
          stroke="#A2BC97"
          strokeWidth="0.8"
          opacity="0.22"
          strokeLinecap="round"
        />

        {/* Arc 4: horizontal gentle curve crossing the page ~services level */}
        <path
          d="M -10 1050 C 100 980, 290 1120, 400 1060"
          fill="none"
          stroke="#DAEDDF"
          strokeWidth="1"
          opacity="0.30"
          strokeLinecap="round"
        />

        {/* Arc 5: diagonal from center to bottom-right */}
        <path
          d="M 150 1400 C 240 1550, 350 1650, 420 1850"
          fill="none"
          stroke="#A2BC97"
          strokeWidth="0.7"
          opacity="0.20"
          strokeLinecap="round"
        />

        {/* Arc 6: left side lower flow */}
        <path
          d="M -30 1800 C 60 1950, 50 2100, 20 2300"
          fill="none"
          stroke="#647453"
          strokeWidth="0.6"
          opacity="0.16"
          strokeLinecap="round"
        />

        {/* ── Small circles / accent rings ── */}

        {/* Ring near hero bottom */}
        <circle cx="340" cy="560" r="38" fill="none" stroke="#A2BC97" strokeWidth="0.8" opacity="0.22" />

        {/* Ring left, manifesto area */}
        <circle cx="30" cy="820" r="52" fill="none" stroke="#DAEDDF" strokeWidth="1" opacity="0.28" />

        {/* Tiny accent dot cluster, top-left */}
        <circle cx="48"  cy="180" r="2.5" fill="#A2BC97" opacity="0.20" />
        <circle cx="62"  cy="198" r="1.5" fill="#647453" opacity="0.15" />
        <circle cx="38"  cy="202" r="1.8" fill="#DAEDDF" opacity="0.22" />

        {/* Ring near photographic divider (around y=1500 in this coord system) */}
        <circle cx="195" cy="1480" r="65" fill="none" stroke="#A2BC97" strokeWidth="0.8" opacity="0.18" />
        <circle cx="195" cy="1480" r="90" fill="none" stroke="#647453" strokeWidth="0.5" opacity="0.12" />

        {/* Dot cluster, lower section */}
        <circle cx="350" cy="1980" r="2"   fill="#A2BC97" opacity="0.18" />
        <circle cx="364" cy="1996" r="1.5" fill="#516750" opacity="0.14" />
        <circle cx="340" cy="2002" r="1.2" fill="#DAEDDF" opacity="0.20" />

        {/* Long gentle arc from top to bottom, very subtle */}
        <path
          d="M 195 0 C 280 600, 100 1200, 195 1900 C 260 2200, 150 2350, 195 2400"
          fill="none"
          stroke="#A2BC97"
          strokeWidth="0.4"
          opacity="0.12"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
