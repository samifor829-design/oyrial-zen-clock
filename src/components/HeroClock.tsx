import { useEffect, useRef, useState } from "react";
import clockFace from "@/assets/clock-face-epoxy.png";

const SIZE = 460;
const C = SIZE / 2; // center

// Hour hand — thick walnut branch, organic taper
const HOUR_PATH = `
  M ${C - 7} ${C + 12}
  C ${C - 8} ${C - 5}, ${C - 8} ${C - 30}, ${C - 7.5} ${C - 55}
  C ${C - 6.5} ${C - 78}, ${C - 5} ${C - 98}, ${C - 3.5} ${C - 115}
  C ${C - 2} ${C - 125}, ${C - 1} ${C - 130}, ${C} ${C - 134}
  C ${C + 1} ${C - 130}, ${C + 2} ${C - 125}, ${C + 3.5} ${C - 115}
  C ${C + 5} ${C - 98}, ${C + 6.5} ${C - 78}, ${C + 7.5} ${C - 55}
  C ${C + 8} ${C - 30}, ${C + 8} ${C - 5}, ${C + 7} ${C + 12}
  Z
`;

// Minute hand — longer, slightly thinner walnut branch
const MINUTE_PATH = `
  M ${C - 5.5} ${C + 14}
  C ${C - 6} ${C - 8}, ${C - 6} ${C - 40}, ${C - 5.5} ${C - 75}
  C ${C - 5} ${C - 110}, ${C - 4} ${C - 140}, ${C - 2.8} ${C - 165}
  C ${C - 1.5} ${C - 180}, ${C - 0.8} ${C - 188}, ${C} ${C - 194}
  C ${C + 0.8} ${C - 188}, ${C + 1.5} ${C - 180}, ${C + 2.8} ${C - 165}
  C ${C + 4} ${C - 140}, ${C + 5} ${C - 110}, ${C + 5.5} ${C - 75}
  C ${C + 6} ${C - 40}, ${C + 6} ${C - 8}, ${C + 5.5} ${C + 14}
  Z
`;

// Thin second hand
const SECOND_PATH = `
  M ${C - 1} ${C + 30}
  L ${C - 0.6} ${C - 188}
  L ${C} ${C - 196}
  L ${C + 0.6} ${C - 188}
  L ${C + 1} ${C + 30}
  Z
`;

// Wood grain lines for each hand to simulate real wood texture
const hourGrainLines = [
  `M ${C - 2} ${C + 6} Q ${C - 3} ${C - 60}, ${C - 1} ${C - 130}`,
  `M ${C + 1} ${C + 4} Q ${C + 2} ${C - 50}, ${C} ${C - 120}`,
  `M ${C} ${C - 20} Q ${C - 1.5} ${C - 70}, ${C + 0.5} ${C - 110}`,
];

const minuteGrainLines = [
  `M ${C - 1.5} ${C + 8} Q ${C - 2} ${C - 70}, ${C - 0.5} ${C - 185}`,
  `M ${C + 1} ${C + 6} Q ${C + 1.5} ${C - 60}, ${C} ${C - 175}`,
  `M ${C} ${C - 30} Q ${C - 1} ${C - 100}, ${C + 0.3} ${C - 165}`,
];

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
        style={{ clipPath: "circle(47.5% at 50% 50%)" }}
        draggable={false}
      />

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          {/* Walnut wood base — rich brown with variation */}
          <linearGradient id="walnut" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#7A4F30" />
            <stop offset="25%" stopColor="#5C3A1E" />
            <stop offset="50%" stopColor="#6B4426" />
            <stop offset="75%" stopColor="#4A2E16" />
            <stop offset="100%" stopColor="#3D2410" />
          </linearGradient>

          {/* Edge darkening for 3D roundness */}
          <linearGradient id="walnutEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3D2410" stopOpacity="0.5" />
            <stop offset="30%" stopColor="#3D2410" stopOpacity="0" />
            <stop offset="70%" stopColor="#3D2410" stopOpacity="0" />
            <stop offset="100%" stopColor="#3D2410" stopOpacity="0.5" />
          </linearGradient>

          {/* Subtle highlight for convex shape */}
          <linearGradient id="walnutHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9956A" stopOpacity="0" />
            <stop offset="35%" stopColor="#C9956A" stopOpacity="0.25" />
            <stop offset="65%" stopColor="#C9956A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C9956A" stopOpacity="0" />
          </linearGradient>

          {/* Grain texture pattern */}
          <pattern id="grainPattern" width="4" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(2)">
            <line x1="0" y1="0" x2="0" y2="80" stroke="#4A2E16" strokeWidth="0.3" strokeOpacity="0.2" />
            <line x1="2" y1="0" x2="2" y2="80" stroke="#6F4528" strokeWidth="0.2" strokeOpacity="0.15" />
          </pattern>

          {/* Second hand — darker slim */}
          <linearGradient id="secondFill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5C3A1E" />
            <stop offset="50%" stopColor="#4A2E16" />
            <stop offset="100%" stopColor="#3D2410" />
          </linearGradient>

          {/* Brass center */}
          <radialGradient id="brass" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#B8952C" />
            <stop offset="100%" stopColor="#8B7020" />
          </radialGradient>

          {/* Realistic drop shadow */}
          <filter id="hShadow" x="-15%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0.8" dy="2.2" stdDeviation="1.8" floodColor="rgba(30,18,8,0.35)" />
          </filter>

          <filter id="sShadow" x="-20%" y="-5%" width="140%" height="115%">
            <feDropShadow dx="0.3" dy="1" stdDeviation="0.8" floodColor="rgba(30,18,8,0.25)" />
          </filter>
        </defs>

        {/* ── Hour hand ── */}
        <g transform={`rotate(${angles.h} ${C} ${C})`} filter="url(#hShadow)">
          {/* Base shape */}
          <path d={HOUR_PATH} fill="url(#walnut)" />
          {/* Edge darkening */}
          <path d={HOUR_PATH} fill="url(#walnutEdge)" />
          {/* Highlight */}
          <path d={HOUR_PATH} fill="url(#walnutHighlight)" />
          {/* Grain overlay */}
          <path d={HOUR_PATH} fill="url(#grainPattern)" opacity="0.6" />
          {/* Wood grain lines */}
          {hourGrainLines.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#3D2410" strokeWidth="0.4" strokeOpacity="0.2" strokeLinecap="round" />
          ))}
          {/* Outline */}
          <path d={HOUR_PATH} fill="none" stroke="#3D2410" strokeWidth="0.6" strokeOpacity="0.4" />
        </g>

        {/* ── Minute hand ── */}
        <g transform={`rotate(${angles.m} ${C} ${C})`} filter="url(#hShadow)">
          <path d={MINUTE_PATH} fill="url(#walnut)" />
          <path d={MINUTE_PATH} fill="url(#walnutEdge)" />
          <path d={MINUTE_PATH} fill="url(#walnutHighlight)" />
          <path d={MINUTE_PATH} fill="url(#grainPattern)" opacity="0.6" />
          {minuteGrainLines.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#3D2410" strokeWidth="0.3" strokeOpacity="0.2" strokeLinecap="round" />
          ))}
          <path d={MINUTE_PATH} fill="none" stroke="#3D2410" strokeWidth="0.5" strokeOpacity="0.4" />
        </g>

        {/* ── Second hand ── */}
        <g transform={`rotate(${angles.s} ${C} ${C})`} filter="url(#sShadow)">
          <path d={SECOND_PATH} fill="url(#secondFill)" />
          <path d={SECOND_PATH} fill="none" stroke="#3D2410" strokeWidth="0.3" strokeOpacity="0.3" />
        </g>

        {/* ── Brass center cap ── */}
        <circle cx={C} cy={C} r="10" fill="url(#brass)" filter="url(#sShadow)" />
        <circle cx={C} cy={C} r="5.5" fill="#A07D28" />
        <circle cx={C} cy={C} r="2.2" fill="#D4AF37" opacity="0.6" />
      </svg>
    </div>
  );
};

export default HeroClock;
