"use client";

/**
 * PageDecor — subtle SVG decorative motifs running behind the page content.
 * Asymmetric arcs, circles and strokes in brand palette at very low opacity.
 * Sits fixed behind all sections from manifesto to footer.
 */
export default function PageDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 w-full h-full overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
      >
        {/* ── Large off-center circle, top-right ── */}
        <circle
          cx="1320" cy="140" r="340"
          fill="none"
          stroke="#A2BC97"
          strokeWidth="1"
          opacity="0.12"
        />

        {/* ── Second ring slightly offset ── */}
        <circle
          cx="1360" cy="110" r="220"
          fill="none"
          stroke="#516750"
          strokeWidth="0.8"
          opacity="0.08"
        />

        {/* ── Thin arc, bottom-left ── */}
        <path
          d="M -60 820 A 480 480 0 0 1 400 520"
          fill="none"
          stroke="#A2BC97"
          strokeWidth="1"
          opacity="0.10"
        />

        {/* ── Wider sweeping arc, left side ── */}
        <path
          d="M -120 960 A 700 700 0 0 1 560 200"
          fill="none"
          stroke="#647453"
          strokeWidth="0.7"
          opacity="0.07"
        />

        {/* ── Small accent circle, mid-left ── */}
        <circle
          cx="80" cy="480" r="90"
          fill="none"
          stroke="#DAEDDF"
          strokeWidth="1.2"
          opacity="0.18"
        />

        {/* ── Diagonal subtle stroke, upper-center ── */}
        <line
          x1="520" y1="0"
          x2="740" y2="300"
          stroke="#A2BC97"
          strokeWidth="0.6"
          opacity="0.09"
        />

        {/* ── Partial arc, center-right ── */}
        <path
          d="M 900 350 A 260 260 0 0 1 1180 600"
          fill="none"
          stroke="#516750"
          strokeWidth="0.8"
          opacity="0.08"
        />

        {/* ── Tiny dot cluster, upper-left ── */}
        <circle cx="180" cy="130" r="3" fill="#A2BC97" opacity="0.12" />
        <circle cx="200" cy="155" r="2" fill="#647453" opacity="0.10" />
        <circle cx="160" cy="160" r="1.5" fill="#A2BC97" opacity="0.09" />
        <circle cx="225" cy="135" r="1.8" fill="#DAEDDF" opacity="0.15" />

        {/* ── Dot cluster, bottom-right ── */}
        <circle cx="1280" cy="780" r="3.5" fill="#A2BC97" opacity="0.11" />
        <circle cx="1310" cy="810" r="2" fill="#516750" opacity="0.09" />
        <circle cx="1260" cy="820" r="1.5" fill="#647453" opacity="0.08" />

        {/* ── Long gentle curve crossing the page ── */}
        <path
          d="M 0 600 C 360 520, 780 680, 1440 560"
          fill="none"
          stroke="#A2BC97"
          strokeWidth="0.6"
          opacity="0.07"
        />

        {/* ── Bottom sweep ── */}
        <path
          d="M 200 900 C 500 780, 900 820, 1440 730"
          fill="none"
          stroke="#516750"
          strokeWidth="0.7"
          opacity="0.06"
        />

        {/* ── Small isolated ring, bottom-center ── */}
        <circle
          cx="720" cy="850" r="55"
          fill="none"
          stroke="#A2BC97"
          strokeWidth="0.9"
          opacity="0.10"
        />

        {/* ── Delicate vertical arc, right edge ── */}
        <path
          d="M 1440 300 A 200 200 0 0 0 1280 600"
          fill="none"
          stroke="#DAEDDF"
          strokeWidth="1"
          opacity="0.13"
        />
      </svg>
    </div>
  );
}
