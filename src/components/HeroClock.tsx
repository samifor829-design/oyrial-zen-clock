import { useEffect, useRef, useState } from "react";
import clockFace from "@/assets/clock-face-epoxy.png";

const SIZE = 460;
const C = SIZE / 2; // center

// Hour hand: short & thick
const HOUR_PATH = `
  M ${C - 5} ${C + 10}
  L ${C - 5} ${C - 85}
  L ${C - 3} ${C - 92}
  L ${C} ${C - 96}
  L ${C + 3} ${C - 92}
  L ${C + 5} ${C - 85}
  L ${C + 5} ${C + 10}
  Z
`;

// Minute hand: longer & thinner
const MINUTE_PATH = `
  M ${C - 3.5} ${C + 12}
  L ${C - 3.5} ${C - 140}
  L ${C - 2} ${C - 150}
  L ${C} ${C - 155}
  L ${C + 2} ${C - 150}
  L ${C + 3.5} ${C - 140}
  L ${C + 3.5} ${C + 12}
  Z
`;

// Second hand: very thin & long
const SECOND_PATH = `
  M ${C - 0.5} ${C + 28}
  L ${C - 0.5} ${C - 165}
  L ${C} ${C - 170}
  L ${C + 0.5} ${C - 165}
  L ${C + 0.5} ${C + 28}
  Z
`;

// Hour markers at 12, 3, 6, 9 only — thick wooden bars near the edge
const MARKER_R_INNER = 168;
const MARKER_R_OUTER = 208;
const MARKER_POSITIONS = [0, 3, 6, 9]; // 12, 3, 6, 9 o'clock
const markers = MARKER_POSITIONS.map((hour) => {
  const angle = (hour * 30 - 90) * (Math.PI / 180);
  return {
    x1: C + MARKER_R_INNER * Math.cos(angle),
    y1: C + MARKER_R_INNER * Math.sin(angle),
    x2: C + MARKER_R_OUTER * Math.cos(angle),
    y2: C + MARKER_R_OUTER * Math.sin(angle),
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
    <div className="relative mx-auto h-[420px] w-[420px] sm:h-[550px] sm:w-[550px] md:h-[690px] md:w-[690px]">
      {/* Clock face image */}
      <img
        src={clockFace}
        alt="Premium epoxy resin and wood wall clock"
        width={1024}
        height={1024}
        className="absolute inset-0 h-full w-full rounded-full object-cover"
        style={{
          clipPath: "circle(46% at 50% 49.5%)",
          filter: "brightness(1.15) contrast(0.95) saturate(1.05)",
        }}
        draggable={false}
      />

      {/* Glass/resin overlay for depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          clipPath: "circle(46% at 50% 49.5%)",
          background: "radial-gradient(ellipse at 40% 35%, rgba(255,255,255,0.15) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          <linearGradient id="walnut" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#7A4F30" />
            <stop offset="25%" stopColor="#5C3A1E" />
            <stop offset="50%" stopColor="#6B4426" />
            <stop offset="75%" stopColor="#4A2E16" />
            <stop offset="100%" stopColor="#3D2410" />
          </linearGradient>

          <linearGradient id="walnutEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3D2410" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#3D2410" stopOpacity="0" />
            <stop offset="70%" stopColor="#3D2410" stopOpacity="0" />
            <stop offset="100%" stopColor="#3D2410" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="walnutHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9956A" stopOpacity="0" />
            <stop offset="40%" stopColor="#C9956A" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#C9956A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C9956A" stopOpacity="0" />
          </linearGradient>

          <pattern id="grainPattern" width="4" height="80" patternUnits="userSpaceOnUse">
            <line x1="1" y1="0" x2="1" y2="80" stroke="#4A2E16" strokeWidth="0.3" strokeOpacity="0.15" />
            <line x1="3" y1="0" x2="3" y2="80" stroke="#6F4528" strokeWidth="0.2" strokeOpacity="0.1" />
          </pattern>

          <linearGradient id="secondFill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2A1A0E" />
            <stop offset="50%" stopColor="#1E1208" />
            <stop offset="100%" stopColor="#2A1A0E" />
          </linearGradient>

          <radialGradient id="brass" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#B8952C" />
            <stop offset="100%" stopColor="#8B7020" />
          </radialGradient>

          <filter id="handShadow" x="-10%" y="-5%" width="120%" height="115%">
            <feDropShadow dx="0.5" dy="1.5" stdDeviation="1.2" floodColor="rgba(30,18,8,0.25)" />
          </filter>
          <filter id="thinShadow" x="-15%" y="-5%" width="130%" height="115%">
            <feDropShadow dx="0.2" dy="0.8" stdDeviation="0.5" floodColor="rgba(30,18,8,0.2)" />
          </filter>
        </defs>

        {/* Brass hour markers */}
        {markers.map((m, i) => (
          <line
            key={i}
            x1={m.x1} y1={m.y1}
            x2={m.x2} y2={m.y2}
            stroke="#C9A84C"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#thinShadow)"
          />
        ))}

        {/* Hour hand */}
        <g transform={`rotate(${angles.h} ${C} ${C})`} filter="url(#handShadow)">
          <path d={HOUR_PATH} fill="url(#walnut)" />
          <path d={HOUR_PATH} fill="url(#walnutEdge)" />
          <path d={HOUR_PATH} fill="url(#walnutHighlight)" />
          <path d={HOUR_PATH} fill="url(#grainPattern)" opacity="0.5" />
          <path d={HOUR_PATH} fill="none" stroke="#3D2410" strokeWidth="0.4" strokeOpacity="0.3" />
        </g>

        {/* Minute hand */}
        <g transform={`rotate(${angles.m} ${C} ${C})`} filter="url(#handShadow)">
          <path d={MINUTE_PATH} fill="url(#walnut)" />
          <path d={MINUTE_PATH} fill="url(#walnutEdge)" />
          <path d={MINUTE_PATH} fill="url(#walnutHighlight)" />
          <path d={MINUTE_PATH} fill="url(#grainPattern)" opacity="0.5" />
          <path d={MINUTE_PATH} fill="none" stroke="#3D2410" strokeWidth="0.35" strokeOpacity="0.3" />
        </g>

        {/* Second hand */}
        <g transform={`rotate(${angles.s} ${C} ${C})`} filter="url(#thinShadow)">
          <path d={SECOND_PATH} fill="url(#secondFill)" />
        </g>

        {/* Brass center cap */}
        <circle cx={C} cy={C} r="8" fill="url(#brass)" filter="url(#thinShadow)" />
        <circle cx={C} cy={C} r="4" fill="#A07D28" />
        <circle cx={C} cy={C} r="1.8" fill="#D4AF37" opacity="0.5" />
      </svg>
    </div>
  );
};

export default HeroClock;
