import { useEffect, useRef, useState } from "react";
import clockFace from "@/assets/clock-face-epoxy.png";

const SIZE = 460;
const C = SIZE / 2; // center
const R = 195; // marker radius from center

// Straight rectangular hour hand
const HOUR_PATH = `
  M ${C - 6} ${C + 14}
  L ${C - 6} ${C - 120}
  L ${C - 4} ${C - 130}
  L ${C} ${C - 136}
  L ${C + 4} ${C - 130}
  L ${C + 6} ${C - 120}
  L ${C + 6} ${C + 14}
  Z
`;

// Straight rectangular minute hand (longer, slightly narrower)
const MINUTE_PATH = `
  M ${C - 4.5} ${C + 16}
  L ${C - 4.5} ${C - 170}
  L ${C - 3} ${C - 185}
  L ${C} ${C - 192}
  L ${C + 3} ${C - 185}
  L ${C + 4.5} ${C - 170}
  L ${C + 4.5} ${C + 16}
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

// Straight rectangular hour markers (12 positions)
const markers = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * 30 - 90) * (Math.PI / 180);
  const x = C + R * Math.cos(angle);
  const y = C + R * Math.sin(angle);
  return { x, y, rotation: i * 30 };
});

// Wood grain lines for straight hands
const hourGrainLines = [
  `M ${C - 3} ${C + 8} L ${C - 3} ${C - 125}`,
  `M ${C + 2} ${C + 6} L ${C + 2} ${C - 120}`,
  `M ${C} ${C - 20} L ${C} ${C - 130}`,
];

const minuteGrainLines = [
  `M ${C - 2} ${C + 10} L ${C - 2} ${C - 180}`,
  `M ${C + 1.5} ${C + 8} L ${C + 1.5} ${C - 175}`,
  `M ${C} ${C - 30} L ${C} ${C - 185}`,
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
    <div className="relative mx-auto h-[420px] w-[420px] sm:h-[550px] sm:w-[550px] md:h-[690px] md:w-[690px]">
      <img
        src={clockFace}
        alt="Premium epoxy resin and wood wall clock"
        width={1024}
        height={1024}
        className="absolute inset-0 h-full w-full rounded-full object-cover"
        style={{ clipPath: "circle(44% at 50% 49.5%)" }}
        draggable={false}
      />

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          {/* Walnut wood base */}
          <linearGradient id="walnut" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#7A4F30" />
            <stop offset="25%" stopColor="#5C3A1E" />
            <stop offset="50%" stopColor="#6B4426" />
            <stop offset="75%" stopColor="#4A2E16" />
            <stop offset="100%" stopColor="#3D2410" />
          </linearGradient>

          {/* Edge darkening for 3D depth */}
          <linearGradient id="walnutEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3D2410" stopOpacity="0.5" />
            <stop offset="30%" stopColor="#3D2410" stopOpacity="0" />
            <stop offset="70%" stopColor="#3D2410" stopOpacity="0" />
            <stop offset="100%" stopColor="#3D2410" stopOpacity="0.5" />
          </linearGradient>

          {/* Center highlight */}
          <linearGradient id="walnutHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9956A" stopOpacity="0" />
            <stop offset="35%" stopColor="#C9956A" stopOpacity="0.3" />
            <stop offset="65%" stopColor="#C9956A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C9956A" stopOpacity="0" />
          </linearGradient>

          {/* Grain texture */}
          <pattern id="grainPattern" width="4" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
            <line x1="1" y1="0" x2="1" y2="80" stroke="#4A2E16" strokeWidth="0.4" strokeOpacity="0.18" />
            <line x1="3" y1="0" x2="3" y2="80" stroke="#6F4528" strokeWidth="0.25" strokeOpacity="0.12" />
          </pattern>

          {/* Marker wood gradient */}
          <linearGradient id="markerWood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B6340" />
            <stop offset="50%" stopColor="#5C3A1E" />
            <stop offset="100%" stopColor="#4A2E16" />
          </linearGradient>

          {/* Second hand fill */}
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

          {/* Shadows */}
          <filter id="hShadow" x="-15%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0.8" dy="2.2" stdDeviation="1.8" floodColor="rgba(30,18,8,0.35)" />
          </filter>
          <filter id="sShadow" x="-20%" y="-5%" width="140%" height="115%">
            <feDropShadow dx="0.3" dy="1" stdDeviation="0.8" floodColor="rgba(30,18,8,0.25)" />
          </filter>
          <filter id="mShadow" x="-30%" y="-10%" width="160%" height="130%">
            <feDropShadow dx="0.4" dy="1.2" stdDeviation="0.6" floodColor="rgba(30,18,8,0.3)" />
          </filter>
        </defs>

        {/* ── Straight hour markers ── */}
        {markers.map((m, i) => (
          <g key={i} transform={`rotate(${m.rotation} ${m.x} ${m.y})`} filter="url(#mShadow)">
            <rect
              x={m.x - (i % 3 === 0 ? 3 : 2)}
              y={m.y - (i % 3 === 0 ? 12 : 8)}
              width={i % 3 === 0 ? 6 : 4}
              height={i % 3 === 0 ? 24 : 16}
              rx="1.5"
              fill="url(#markerWood)"
            />
            <rect
              x={m.x - (i % 3 === 0 ? 3 : 2)}
              y={m.y - (i % 3 === 0 ? 12 : 8)}
              width={i % 3 === 0 ? 6 : 4}
              height={i % 3 === 0 ? 24 : 16}
              rx="1.5"
              fill="url(#grainPattern)"
              opacity="0.5"
            />
          </g>
        ))}

        {/* ── Hour hand ── */}
        <g transform={`rotate(${angles.h} ${C} ${C})`} filter="url(#hShadow)">
          <path d={HOUR_PATH} fill="url(#walnut)" />
          <path d={HOUR_PATH} fill="url(#walnutEdge)" />
          <path d={HOUR_PATH} fill="url(#walnutHighlight)" />
          <path d={HOUR_PATH} fill="url(#grainPattern)" opacity="0.6" />
          {hourGrainLines.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#3D2410" strokeWidth="0.4" strokeOpacity="0.2" strokeLinecap="round" />
          ))}
          <path d={HOUR_PATH} fill="none" stroke="#3D2410" strokeWidth="0.6" strokeOpacity="0.35" />
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
          <path d={MINUTE_PATH} fill="none" stroke="#3D2410" strokeWidth="0.5" strokeOpacity="0.35" />
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
