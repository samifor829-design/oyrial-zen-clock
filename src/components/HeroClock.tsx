import { useEffect, useRef, useState } from "react";
import clockFace from "@/assets/clock-face-epoxy.png";

const VIEWBOX_SIZE = 460;
const CENTER = VIEWBOX_SIZE / 2;

// Organic branch-shaped hour hand — short, thick base tapering to a thin twig tip with small natural forks
const HOUR_HAND = `
  M ${CENTER - 5} ${CENTER + 12}
  C ${CENTER - 7} ${CENTER + 2}, ${CENTER - 8} ${CENTER - 10}, ${CENTER - 7} ${CENTER - 30}
  C ${CENTER - 6} ${CENTER - 55}, ${CENTER - 5} ${CENTER - 75}, ${CENTER - 4} ${CENTER - 95}
  C ${CENTER - 3} ${CENTER - 108}, ${CENTER - 2} ${CENTER - 118}, ${CENTER - 1} ${CENTER - 125}
  L ${CENTER} ${CENTER - 132}
  L ${CENTER + 1} ${CENTER - 125}
  C ${CENTER + 2} ${CENTER - 118}, ${CENTER + 3} ${CENTER - 108}, ${CENTER + 4} ${CENTER - 95}
  C ${CENTER + 5} ${CENTER - 75}, ${CENTER + 6} ${CENTER - 55}, ${CENTER + 7} ${CENTER - 30}
  C ${CENTER + 8} ${CENTER - 10}, ${CENTER + 7} ${CENTER + 2}, ${CENTER + 5} ${CENTER + 12}
  Z
`;

// Small branch fork on the hour hand
const HOUR_FORK = `
  M ${CENTER + 5} ${CENTER - 88}
  Q ${CENTER + 18} ${CENTER - 105}, ${CENTER + 22} ${CENTER - 118}
  Q ${CENTER + 16} ${CENTER - 108}, ${CENTER + 6} ${CENTER - 94}
`;

// Organic branch-shaped minute hand — longer, thinner, elegant taper
const MINUTE_HAND = `
  M ${CENTER - 4} ${CENTER + 14}
  C ${CENTER - 6} ${CENTER}, ${CENTER - 6} ${CENTER - 20}, ${CENTER - 5} ${CENTER - 50}
  C ${CENTER - 5} ${CENTER - 80}, ${CENTER - 4} ${CENTER - 110}, ${CENTER - 3} ${CENTER - 140}
  C ${CENTER - 2} ${CENTER - 160}, ${CENTER - 1.5} ${CENTER - 175}, ${CENTER - 1} ${CENTER - 185}
  L ${CENTER} ${CENTER - 194}
  L ${CENTER + 1} ${CENTER - 185}
  C ${CENTER + 1.5} ${CENTER - 175}, ${CENTER + 2} ${CENTER - 160}, ${CENTER + 3} ${CENTER - 140}
  C ${CENTER + 4} ${CENTER - 110}, ${CENTER + 5} ${CENTER - 80}, ${CENTER + 5} ${CENTER - 50}
  C ${CENTER + 6} ${CENTER - 20}, ${CENTER + 6} ${CENTER}, ${CENTER + 4} ${CENTER + 14}
  Z
`;

// Small branch fork on the minute hand
const MINUTE_FORK = `
  M ${CENTER - 4} ${CENTER - 130}
  Q ${CENTER - 16} ${CENTER - 152}, ${CENTER - 20} ${CENTER - 166}
  Q ${CENTER - 14} ${CENTER - 155}, ${CENTER - 5} ${CENTER - 136}
`;

// Thin second hand — sleek, no branching
const SECOND_HAND = `
  M ${CENTER - 1.2} ${CENTER + 28}
  L ${CENTER - 0.8} ${CENTER - 185}
  L ${CENTER} ${CENTER - 196}
  L ${CENTER + 0.8} ${CENTER - 185}
  L ${CENTER + 1.2} ${CENTER + 28}
  Z
`;

// 12 small circular wooden markers
const MARKER_RADIUS = 6;
const MARKER_DISTANCE = 196; // from center

const markerPositions = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * 30 - 90) * (Math.PI / 180);
  return {
    x: CENTER + MARKER_DISTANCE * Math.cos(angle),
    y: CENTER + MARKER_DISTANCE * Math.sin(angle),
  };
});

const HeroClock = () => {
  const rafRef = useRef<number>(0);
  const [angles, setAngles] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ms = now.getMilliseconds();
      const s = now.getSeconds() + ms / 1000;
      const m = now.getMinutes() + s / 60;
      const h = (now.getHours() % 12) + m / 60;

      setAngles({ h: h * 30, m: m * 6, s: s * 6 });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative mx-auto h-[380px] w-[380px] sm:h-[420px] sm:w-[420px] md:h-[450px] md:w-[450px]">
      <img
        src={clockFace}
        alt="Premium epoxy resin and wood wall clock"
        width={1024}
        height={1024}
        className="absolute inset-0 h-full w-full rounded-full object-cover"
        style={{ clipPath: "circle(49.2% at 50% 50%)" }}
        draggable={false}
      />

      <svg
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          {/* Realistic walnut wood grain gradient */}
          <linearGradient id="walnutGrain" x1="0%" y1="0%" x2="30%" y2="100%">
            <stop offset="0%" stopColor="hsl(20 52% 42%)" />
            <stop offset="30%" stopColor="hsl(18 48% 34%)" />
            <stop offset="60%" stopColor="hsl(16 44% 28%)" />
            <stop offset="100%" stopColor="hsl(14 40% 22%)" />
          </linearGradient>

          {/* Highlight sheen for wood */}
          <linearGradient id="walnutSheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(28 50% 55% / 0.35)" />
            <stop offset="100%" stopColor="hsl(14 30% 18% / 0.05)" />
          </linearGradient>

          {/* Marker wood fill */}
          <radialGradient id="markerWood" cx="40%" cy="35%">
            <stop offset="0%" stopColor="hsl(22 50% 44%)" />
            <stop offset="100%" stopColor="hsl(16 42% 28%)" />
          </radialGradient>

          {/* Subtle hand shadow */}
          <filter id="handShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0.6" dy="1.8" stdDeviation="1.6" floodColor="hsl(16 20% 10% / 0.30)" />
          </filter>

          {/* Brass center gradient */}
          <radialGradient id="brassFill" cx="38%" cy="35%">
            <stop offset="0%" stopColor="hsl(44 62% 72%)" />
            <stop offset="60%" stopColor="hsl(40 50% 52%)" />
            <stop offset="100%" stopColor="hsl(36 42% 38%)" />
          </radialGradient>
        </defs>

        {/* Hour markers — small wooden circles */}
        {markerPositions.map((pos, i) => (
          <circle
            key={i}
            cx={pos.x}
            cy={pos.y}
            r={MARKER_RADIUS}
            fill="url(#markerWood)"
            stroke="hsl(14 36% 20% / 0.5)"
            strokeWidth="0.8"
            filter="url(#handShadow)"
          />
        ))}

        {/* Hour hand — thick organic branch */}
        <g transform={`rotate(${angles.h} ${CENTER} ${CENTER})`} filter="url(#handShadow)">
          <path d={HOUR_HAND} fill="url(#walnutGrain)" stroke="hsl(14 38% 18% / 0.55)" strokeWidth="1" strokeLinejoin="round" />
          <path d={HOUR_HAND} fill="url(#walnutSheen)" opacity="0.5" />
          <path d={HOUR_FORK} fill="none" stroke="url(#walnutGrain)" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Minute hand — longer, thinner branch */}
        <g transform={`rotate(${angles.m} ${CENTER} ${CENTER})`} filter="url(#handShadow)">
          <path d={MINUTE_HAND} fill="url(#walnutGrain)" stroke="hsl(14 38% 18% / 0.55)" strokeWidth="0.9" strokeLinejoin="round" />
          <path d={MINUTE_HAND} fill="url(#walnutSheen)" opacity="0.45" />
          <path d={MINUTE_FORK} fill="none" stroke="url(#walnutGrain)" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Second hand — thin sleek line */}
        <g transform={`rotate(${angles.s} ${CENTER} ${CENTER})`} filter="url(#handShadow)">
          <path d={SECOND_HAND} fill="url(#walnutGrain)" stroke="hsl(14 34% 20% / 0.4)" strokeWidth="0.5" />
        </g>

        {/* Brass center cap */}
        <circle cx={CENTER} cy={CENTER} r="11" fill="url(#brassFill)" filter="url(#handShadow)" />
        <circle cx={CENTER} cy={CENTER} r="6" fill="hsl(40 48% 46%)" />
        <circle cx={CENTER} cy={CENTER} r="2.5" fill="hsl(44 55% 70%)" opacity="0.7" />
      </svg>
    </div>
  );
};

export default HeroClock;
