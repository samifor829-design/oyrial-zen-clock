import { useEffect, useRef, useState } from "react";

const CLOCK_SIZE = 340;
const CENTER = CLOCK_SIZE / 2;
const FACE_RADIUS = 155;
const MARKER_INNER = 128;
const MARKER_OUTER = 142;
const HOUR_LENGTH = 75;
const MINUTE_LENGTH = 105;
const SECOND_LENGTH = 115;
const SECOND_TAIL = 26;

const HeroClock = () => {
  const rafRef = useRef<number>(0);
  const [angles, setAngles] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ms = now.getMilliseconds();
      const sec = now.getSeconds() + ms / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;
      setAngles({ h: hr * 30, m: min * 6, s: sec * 6 });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Generate stick markers at each hour position
  const stickMarkers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const isQuarter = i % 3 === 0;
    const inner = isQuarter ? MARKER_INNER - 4 : MARKER_INNER;
    return {
      x1: CENTER + inner * Math.cos(angle),
      y1: CENTER + inner * Math.sin(angle),
      x2: CENTER + MARKER_OUTER * Math.cos(angle),
      y2: CENTER + MARKER_OUTER * Math.sin(angle),
      width: isQuarter ? 2.5 : 1.5,
    };
  });

  return (
    <div className="hero-clock-wrapper">
      <svg
        width={CLOCK_SIZE}
        height={CLOCK_SIZE}
        viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
        className="hero-clock"
        style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.18))" }}
      >
        <defs>
          {/* Rich olive/burl wood base */}
          <radialGradient id="woodBase" cx="35%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#b8944a" />
            <stop offset="30%" stopColor="#8b6c3e" />
            <stop offset="60%" stopColor="#6b4e2e" />
            <stop offset="100%" stopColor="#4a3420" />
          </radialGradient>

          {/* Wood section 1 - top left burl */}
          <radialGradient id="wood1" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#c9a050" />
            <stop offset="25%" stopColor="#a67d3d" />
            <stop offset="50%" stopColor="#8b6c3e" />
            <stop offset="75%" stopColor="#6d4c2a" />
            <stop offset="100%" stopColor="#4a3420" />
          </radialGradient>

          {/* Wood section 2 - right piece */}
          <radialGradient id="wood2" cx="60%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#d4a957" />
            <stop offset="30%" stopColor="#b8873a" />
            <stop offset="60%" stopColor="#8b6c3e" />
            <stop offset="100%" stopColor="#5a3d24" />
          </radialGradient>

          {/* Wood section 3 - bottom center */}
          <radialGradient id="wood3" cx="45%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#c4963e" />
            <stop offset="35%" stopColor="#9e7630" />
            <stop offset="70%" stopColor="#7a5a28" />
            <stop offset="100%" stopColor="#4a3420" />
          </radialGradient>

          {/* Wood section 4 - bottom right */}
          <radialGradient id="wood4" cx="55%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#bfa04a" />
            <stop offset="40%" stopColor="#9a7a35" />
            <stop offset="100%" stopColor="#5c4020" />
          </radialGradient>

          {/* Smoky epoxy resin fill */}
          <radialGradient id="epoxyResin" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8a8878" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#6b6a5e" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#5a5950" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#4a4940" stopOpacity="0.65" />
          </radialGradient>

          {/* Glossy sheen overlay - top-left highlight */}
          <radialGradient id="glossSheen" cx="35%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Edge reflection - bottom right */}
          <radialGradient id="edgeReflection" cx="70%" cy="70%" r="40%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Depth shadow inside */}
          <radialGradient id="depthShadow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#000000" stopOpacity="0" />
            <stop offset="95%" stopColor="#000000" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </radialGradient>

          {/* Wood grain line pattern */}
          <pattern id="grainLines" patternUnits="userSpaceOnUse" width="200" height="200" patternTransform="rotate(15)">
            {Array.from({ length: 30 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1={i * 7 + Math.sin(i) * 3}
                x2="200"
                y2={i * 7 + Math.cos(i) * 4 + 2}
                stroke="#3a2510"
                strokeWidth={0.3 + Math.sin(i * 0.7) * 0.3}
                opacity={0.15 + Math.sin(i * 1.3) * 0.08}
              />
            ))}
          </pattern>

          {/* Burl swirl pattern */}
          <pattern id="burlSwirl" patternUnits="userSpaceOnUse" width="60" height="60">
            <circle cx="30" cy="30" r="20" fill="none" stroke="#5a3d20" strokeWidth="0.5" opacity="0.12" />
            <circle cx="30" cy="30" r="14" fill="none" stroke="#4a3018" strokeWidth="0.4" opacity="0.1" />
            <circle cx="30" cy="30" r="8" fill="none" stroke="#6b4e2e" strokeWidth="0.3" opacity="0.08" />
            <circle cx="28" cy="28" r="24" fill="none" stroke="#5a3d20" strokeWidth="0.3" opacity="0.06" />
          </pattern>

          {/* Clip path for the clock face */}
          <clipPath id="clockClip">
            <circle cx={CENTER} cy={CENTER} r={FACE_RADIUS} />
          </clipPath>

          {/* Gold metallic gradient for hands */}
          <linearGradient id="goldHand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8c44a" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b8942e" />
          </linearGradient>

          {/* Subtle hand shadow */}
          <filter id="handShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0.5" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* === CLOCK BODY === */}

        {/* Outer shadow ring for depth */}
        <circle cx={CENTER} cy={CENTER} r={FACE_RADIUS + 2} fill="none" stroke="#2a1a0e" strokeWidth="1.5" opacity="0.2" />

        {/* Main clock face group - clipped */}
        <g clipPath="url(#clockClip)">
          {/* Background - smoky epoxy base */}
          <circle cx={CENTER} cy={CENTER} r={FACE_RADIUS} fill="#6b6960" />

          {/* Epoxy resin translucent layer */}
          <circle cx={CENTER} cy={CENTER} r={FACE_RADIUS} fill="url(#epoxyResin)" />

          {/* === WOOD SECTIONS - organic irregular shapes === */}

          {/* Wood piece 1 - Large top-left burl (11 o'clock area) */}
          <path
            d="M 85 45 C 95 30, 130 20, 155 35 C 175 48, 180 70, 170 95 C 162 115, 145 125, 125 128 C 108 130, 90 122, 78 108 C 65 92, 60 70, 72 52 Z"
            fill="url(#wood1)"
          />
          <path
            d="M 85 45 C 95 30, 130 20, 155 35 C 175 48, 180 70, 170 95 C 162 115, 145 125, 125 128 C 108 130, 90 122, 78 108 C 65 92, 60 70, 72 52 Z"
            fill="url(#burlSwirl)"
          />
          <path
            d="M 85 45 C 95 30, 130 20, 155 35 C 175 48, 180 70, 170 95 C 162 115, 145 125, 125 128 C 108 130, 90 122, 78 108 C 65 92, 60 70, 72 52 Z"
            fill="url(#grainLines)"
          />

          {/* Wood piece 2 - Right side piece (2-3 o'clock area) */}
          <path
            d="M 225 90 C 245 100, 260 125, 265 150 C 268 170, 258 195, 242 210 C 228 222, 210 225, 195 218 C 182 212, 175 195, 178 178 C 180 165, 192 148, 202 135 C 210 124, 218 105, 225 90 Z"
            fill="url(#wood2)"
          />
          <path
            d="M 225 90 C 245 100, 260 125, 265 150 C 268 170, 258 195, 242 210 C 228 222, 210 225, 195 218 C 182 212, 175 195, 178 178 C 180 165, 192 148, 202 135 C 210 124, 218 105, 225 90 Z"
            fill="url(#burlSwirl)"
          />
          <path
            d="M 225 90 C 245 100, 260 125, 265 150 C 268 170, 258 195, 242 210 C 228 222, 210 225, 195 218 C 182 212, 175 195, 178 178 C 180 165, 192 148, 202 135 C 210 124, 218 105, 225 90 Z"
            fill="url(#grainLines)"
          />

          {/* Wood piece 3 - Bottom center burl (5-7 o'clock area) */}
          <path
            d="M 105 230 C 118 215, 140 205, 165 208 C 190 210, 210 225, 218 245 C 224 260, 220 278, 208 290 C 195 300, 172 305, 150 298 C 130 292, 112 275, 105 255 C 100 242, 100 238, 105 230 Z"
            fill="url(#wood3)"
          />
          <path
            d="M 105 230 C 118 215, 140 205, 165 208 C 190 210, 210 225, 218 245 C 224 260, 220 278, 208 290 C 195 300, 172 305, 150 298 C 130 292, 112 275, 105 255 C 100 242, 100 238, 105 230 Z"
            fill="url(#burlSwirl)"
          />
          <path
            d="M 105 230 C 118 215, 140 205, 165 208 C 190 210, 210 225, 218 245 C 224 260, 220 278, 208 290 C 195 300, 172 305, 150 298 C 130 292, 112 275, 105 255 C 100 242, 100 238, 105 230 Z"
            fill="url(#grainLines)"
          />

          {/* Wood piece 4 - Small left piece (8-9 o'clock) */}
          <path
            d="M 55 165 C 48 150, 52 130, 65 120 C 78 112, 95 115, 105 128 C 112 138, 110 158, 100 172 C 92 183, 78 190, 65 185 C 55 180, 52 175, 55 165 Z"
            fill="url(#wood4)"
          />
          <path
            d="M 55 165 C 48 150, 52 130, 65 120 C 78 112, 95 115, 105 128 C 112 138, 110 158, 100 172 C 92 183, 78 190, 65 185 C 55 180, 52 175, 55 165 Z"
            fill="url(#burlSwirl)"
          />

          {/* Wood edge details - bark-like rough edges */}
          <path
            d="M 85 45 C 82 48, 78 52, 72 52"
            fill="none" stroke="#3a2510" strokeWidth="0.8" opacity="0.2"
          />
          <path
            d="M 125 128 C 122 132, 118 135, 112 134"
            fill="none" stroke="#3a2510" strokeWidth="0.6" opacity="0.15"
          />

          {/* Depth/shadow overlay */}
          <circle cx={CENTER} cy={CENTER} r={FACE_RADIUS} fill="url(#depthShadow)" />

          {/* Glossy epoxy sheen - top highlight */}
          <circle cx={CENTER} cy={CENTER} r={FACE_RADIUS} fill="url(#glossSheen)" />

          {/* Edge reflection */}
          <circle cx={CENTER} cy={CENTER} r={FACE_RADIUS} fill="url(#edgeReflection)" />
        </g>

        {/* Outer glass edge ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={FACE_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={FACE_RADIUS - 1}
          fill="none"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="0.5"
        />

        {/* === GOLD STICK MARKERS === */}
        {stickMarkers.map((m, i) => (
          <line
            key={i}
            x1={m.x1}
            y1={m.y1}
            x2={m.x2}
            y2={m.y2}
            stroke="#d4af37"
            strokeWidth={m.width}
            strokeLinecap="round"
            opacity="0.9"
          />
        ))}

        {/* === CLOCK HANDS === */}

        {/* Hour hand */}
        <line
          x1={CENTER}
          y1={CENTER + 12}
          x2={CENTER}
          y2={CENTER - HOUR_LENGTH}
          stroke="url(#goldHand)"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${angles.h} ${CENTER} ${CENTER})`}
          filter="url(#handShadow)"
        />

        {/* Minute hand */}
        <line
          x1={CENTER}
          y1={CENTER + 14}
          x2={CENTER}
          y2={CENTER - MINUTE_LENGTH}
          stroke="url(#goldHand)"
          strokeWidth="2.8"
          strokeLinecap="round"
          transform={`rotate(${angles.m} ${CENTER} ${CENTER})`}
          filter="url(#handShadow)"
        />

        {/* Second hand with tail */}
        <g transform={`rotate(${angles.s} ${CENTER} ${CENTER})`}>
          <line
            x1={CENTER}
            y1={CENTER + SECOND_TAIL}
            x2={CENTER}
            y2={CENTER - SECOND_LENGTH}
            stroke="#c9a94e"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle
            cx={CENTER}
            cy={CENTER + SECOND_TAIL - 4}
            r="3"
            fill="#c9a94e"
          />
        </g>

        {/* Center pivot - gold with depth */}
        <circle cx={CENTER} cy={CENTER} r="7" fill="#d4af37" filter="url(#handShadow)" />
        <circle cx={CENTER} cy={CENTER} r="4" fill="#b8942e" />
        <circle cx={CENTER} cy={CENTER} r="2" fill="#e8c44a" opacity="0.6" />
      </svg>
    </div>
  );
};

export default HeroClock;
