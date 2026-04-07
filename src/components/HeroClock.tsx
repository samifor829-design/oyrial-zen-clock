import { useEffect, useRef, useState } from "react";
import oyrialLogo from "@/assets/logo-gold.png";

const CLOCK_SIZE = 340;
const CENTER = CLOCK_SIZE / 2;
const CLOCK_RADIUS = 155;
const MARKER_RADIUS = 132;
const MARKER_W = 3;
const MARKER_H = 14;
const HOUR_LENGTH = 72;
const MINUTE_LENGTH = 100;

/* Organic wood slab shapes — irregular, jagged, like live-edge slabs */
const woodSlabs = [
  // Top-right large slab
  `M ${CENTER + 20} ${CENTER - 120}
   C ${CENTER + 55} ${CENTER - 130}, ${CENTER + 110} ${CENTER - 105}, ${CENTER + 120} ${CENTER - 70}
   C ${CENTER + 135} ${CENTER - 30}, ${CENTER + 125} ${CENTER + 10}, ${CENTER + 100} ${CENTER + 5}
   C ${CENTER + 80} ${CENTER + 15}, ${CENTER + 50} ${CENTER - 10}, ${CENTER + 35} ${CENTER - 40}
   C ${CENTER + 15} ${CENTER - 65}, ${CENTER + 10} ${CENTER - 100}, ${CENTER + 20} ${CENTER - 120}Z`,
  // Bottom-left large slab
  `M ${CENTER - 110} ${CENTER + 30}
   C ${CENTER - 130} ${CENTER + 55}, ${CENTER - 120} ${CENTER + 100}, ${CENTER - 90} ${CENTER + 120}
   C ${CENTER - 60} ${CENTER + 135}, ${CENTER - 20} ${CENTER + 125}, ${CENTER - 5} ${CENTER + 100}
   C ${CENTER + 5} ${CENTER + 80}, ${CENTER - 10} ${CENTER + 55}, ${CENTER - 40} ${CENTER + 35}
   C ${CENTER - 70} ${CENTER + 20}, ${CENTER - 95} ${CENTER + 15}, ${CENTER - 110} ${CENTER + 30}Z`,
  // Left-center slab
  `M ${CENTER - 130} ${CENTER - 50}
   C ${CENTER - 140} ${CENTER - 25}, ${CENTER - 138} ${CENTER + 5}, ${CENTER - 120} ${CENTER + 15}
   C ${CENTER - 100} ${CENTER + 20}, ${CENTER - 80} ${CENTER + 5}, ${CENTER - 75} ${CENTER - 20}
   C ${CENTER - 70} ${CENTER - 45}, ${CENTER - 85} ${CENTER - 65}, ${CENTER - 110} ${CENTER - 60}
   C ${CENTER - 125} ${CENTER - 58}, ${CENTER - 128} ${CENTER - 55}, ${CENTER - 130} ${CENTER - 50}Z`,
  // Bottom-right small slab
  `M ${CENTER + 60} ${CENTER + 60}
   C ${CENTER + 90} ${CENTER + 55}, ${CENTER + 115} ${CENTER + 75}, ${CENTER + 110} ${CENTER + 100}
   C ${CENTER + 105} ${CENTER + 120}, ${CENTER + 80} ${CENTER + 130}, ${CENTER + 55} ${CENTER + 115}
   C ${CENTER + 40} ${CENTER + 100}, ${CENTER + 40} ${CENTER + 75}, ${CENTER + 60} ${CENTER + 60}Z`,
  // Top-left small slab
  `M ${CENTER - 55} ${CENTER - 100}
   C ${CENTER - 35} ${CENTER - 120}, ${CENTER - 10} ${CENTER - 115}, ${CENTER - 5} ${CENTER - 90}
   C ${CENTER} ${CENTER - 70}, ${CENTER - 20} ${CENTER - 60}, ${CENTER - 45} ${CENTER - 65}
   C ${CENTER - 65} ${CENTER - 70}, ${CENTER - 70} ${CENTER - 85}, ${CENTER - 55} ${CENTER - 100}Z`,
];

/* Wood grain ring patterns for each slab */
const grainRings = [
  // Slab 0 rings
  [
    { cx: CENTER + 75, cy: CENTER - 55, rx: 25, ry: 20 },
    { cx: CENTER + 75, cy: CENTER - 55, rx: 18, ry: 14 },
    { cx: CENTER + 75, cy: CENTER - 55, rx: 12, ry: 8 },
    { cx: CENTER + 75, cy: CENTER - 55, rx: 6, ry: 4 },
  ],
  // Slab 1 rings
  [
    { cx: CENTER - 55, cy: CENTER + 80, rx: 28, ry: 22 },
    { cx: CENTER - 55, cy: CENTER + 80, rx: 20, ry: 15 },
    { cx: CENTER - 55, cy: CENTER + 80, rx: 13, ry: 9 },
    { cx: CENTER - 55, cy: CENTER + 80, rx: 6, ry: 4 },
  ],
  // Slab 2 rings
  [
    { cx: CENTER - 100, cy: CENTER - 22, rx: 16, ry: 12 },
    { cx: CENTER - 100, cy: CENTER - 22, rx: 10, ry: 7 },
    { cx: CENTER - 100, cy: CENTER - 22, rx: 5, ry: 3 },
  ],
  // Slab 3 rings
  [
    { cx: CENTER + 82, cy: CENTER + 92, rx: 18, ry: 15 },
    { cx: CENTER + 82, cy: CENTER + 92, rx: 11, ry: 9 },
    { cx: CENTER + 82, cy: CENTER + 92, rx: 5, ry: 4 },
  ],
  // Slab 4 rings
  [
    { cx: CENTER - 30, cy: CENTER - 88, rx: 14, ry: 11 },
    { cx: CENTER - 30, cy: CENTER - 88, rx: 8, ry: 6 },
    { cx: CENTER - 30, cy: CENTER - 88, rx: 4, ry: 3 },
  ],
];

const woodColors = [
  { base: "#8B6914", dark: "#6B4E12", grain: "#5C3D0E", highlight: "#A67C28" },
  { base: "#7A5C1A", dark: "#5E4410", grain: "#4A340C", highlight: "#9B7024" },
  { base: "#926C18", dark: "#735414", grain: "#5A3E0A", highlight: "#B08430" },
  { base: "#84601C", dark: "#664A14", grain: "#503A0E", highlight: "#A47828" },
  { base: "#7E5818", dark: "#604210", grain: "#4C340C", highlight: "#9C6E24" },
];

const HeroClock = () => {
  const rafRef = useRef<number>(0);
  const [angles, setAngles] = useState({ h: 0, m: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;
      setAngles({
        h: hr * 30,
        m: min * 6,
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const markers = Array.from({ length: 12 }, (_, i) => {
    const angleDeg = i * 30 - 90;
    const angleRad = angleDeg * (Math.PI / 180);
    return {
      x: CENTER + MARKER_RADIUS * Math.cos(angleRad),
      y: CENTER + MARKER_RADIUS * Math.sin(angleRad),
      rotation: i * 30,
    };
  });

  return (
    <div className="hero-clock-wrapper flex items-center justify-center">
      <svg
        width={CLOCK_SIZE}
        height={CLOCK_SIZE}
        viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
        className="hero-clock drop-shadow-2xl"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <defs>
          {/* Clip to circle */}
          <clipPath id="clockCircle">
            <circle cx={CENTER} cy={CENTER} r={CLOCK_RADIUS} />
          </clipPath>

          {/* Epoxy resin gradient — smoky dark grey, slightly transparent/glossy */}
          <radialGradient id="epoxyBase" cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#6b7280" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#4b5563" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#374151" stopOpacity="0.95" />
          </radialGradient>

          {/* Epoxy sheen / glass reflection */}
          <radialGradient id="epoxySheen" cx="35%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Dark mode glow for resin */}
          <radialGradient id="epoxyDarkGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.2" />
            <stop offset="60%" stopColor="#475569" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
          </radialGradient>

          {/* Gold glow filter for dark mode */}
          <filter id="goldGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Wood textures per slab */}
          {woodColors.map((c, i) => (
            <pattern key={i} id={`wood${i}`} patternUnits="userSpaceOnUse" width="60" height="60">
              <rect width="60" height="60" fill={c.base} />
              {Array.from({ length: 12 }, (_, j) => (
                <line
                  key={j}
                  x1="0"
                  y1={j * 5 + Math.random() * 2}
                  x2="60"
                  y2={j * 5 + 1 + Math.random() * 2}
                  stroke={c.grain}
                  strokeWidth={0.4 + Math.random() * 0.8}
                  opacity={0.15 + Math.random() * 0.2}
                />
              ))}
              {/* Subtle highlight streaks */}
              <line x1="0" y1="15" x2="60" y2="16" stroke={c.highlight} strokeWidth="0.3" opacity="0.12" />
              <line x1="0" y1="38" x2="60" y2="39" stroke={c.highlight} strokeWidth="0.3" opacity="0.1" />
            </pattern>
          ))}

          {/* Outer ring subtle shadow */}
          <filter id="outerShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Outer circle — subtle border */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={CLOCK_RADIUS}
          fill="none"
          stroke="#8B7355"
          strokeWidth="2.5"
          filter="url(#outerShadow)"
        />

        {/* Clipped content */}
        <g clipPath="url(#clockCircle)">
          {/* Epoxy resin background */}
          <circle cx={CENTER} cy={CENTER} r={CLOCK_RADIUS} fill="url(#epoxyBase)" />

          {/* Dark mode resin glow */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={CLOCK_RADIUS}
            fill="url(#epoxyDarkGlow)"
            className="clock-epoxy-dark-glow"
          />

          {/* Wood slabs with grain */}
          {woodSlabs.map((d, i) => (
            <g key={i}>
              <path d={d} fill={`url(#wood${i})`} />
              {/* Dark edge for raw/jagged look */}
              <path
                d={d}
                fill="none"
                stroke="#3E2723"
                strokeWidth="1.2"
                opacity="0.4"
              />
              {/* Inner shadow on wood */}
              <path
                d={d}
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="0.6"
                opacity="0.15"
                strokeDasharray="3,5"
              />
              {/* Tree rings */}
              {grainRings[i]?.map((ring, j) => (
                <ellipse
                  key={j}
                  cx={ring.cx}
                  cy={ring.cy}
                  rx={ring.rx}
                  ry={ring.ry}
                  fill="none"
                  stroke={woodColors[i].dark}
                  strokeWidth="0.7"
                  opacity={0.25 - j * 0.04}
                />
              ))}
              {/* Highlight on wood for warmth */}
              <path
                d={d}
                fill={woodColors[i].highlight}
                opacity="0.06"
              />
            </g>
          ))}

          {/* Epoxy sheen/glass overlay */}
          <circle cx={CENTER} cy={CENTER} r={CLOCK_RADIUS} fill="url(#epoxySheen)" />

          {/* Oyrial logo — upper center, gold tinted */}
          <image
            href={oyrialLogo}
            x={CENTER - 16}
            y={CENTER - 75}
            width="32"
            height="32"
            opacity="0.7"
            style={{ filter: "sepia(1) saturate(3) hue-rotate(10deg) brightness(1.1)" }}
          />
        </g>

        {/* Hour markers — slim gold rectangles */}
        {markers.map((m, i) => (
          <rect
            key={i}
            x={m.x - MARKER_W / 2}
            y={m.y - MARKER_H / 2}
            width={MARKER_W}
            height={MARKER_H}
            rx="1"
            fill="#d4af37"
            transform={`rotate(${m.rotation} ${m.x} ${m.y})`}
            className="clock-marker"
          />
        ))}

        {/* Hour hand — tapered polygon */}
        <g transform={`rotate(${angles.h} ${CENTER} ${CENTER})`} className="clock-hand">
          <polygon
            points={`
              ${CENTER - 2.8},${CENTER + 12}
              ${CENTER + 2.8},${CENTER + 12}
              ${CENTER + 1},${CENTER - HOUR_LENGTH}
              ${CENTER - 1},${CENTER - HOUR_LENGTH}
            `}
            fill="#d4af37"
            stroke="#b8941e"
            strokeWidth="0.3"
          />
        </g>

        {/* Minute hand — tapered polygon, longer and thinner */}
        <g transform={`rotate(${angles.m} ${CENTER} ${CENTER})`} className="clock-hand">
          <polygon
            points={`
              ${CENTER - 2},${CENTER + 14}
              ${CENTER + 2},${CENTER + 14}
              ${CENTER + 0.6},${CENTER - MINUTE_LENGTH}
              ${CENTER - 0.6},${CENTER - MINUTE_LENGTH}
            `}
            fill="#d4af37"
            stroke="#b8941e"
            strokeWidth="0.3"
          />
        </g>

        {/* Center pivot */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r="5.5"
          fill="#d4af37"
          className="clock-pivot"
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r="2.5"
          fill="#b8941e"
        />
      </svg>
    </div>
  );
};

export default HeroClock;
