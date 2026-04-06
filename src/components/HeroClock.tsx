import { useEffect, useRef, useState } from "react";

const CLOCK_SIZE = 320;
const CENTER = CLOCK_SIZE / 2;
const FACE_RADIUS = 130;
const WOOD_WIDTH = 22;
const OUTER_RADIUS = FACE_RADIUS + WOOD_WIDTH;
const MARKER_RADIUS = 112;
const MARKER_SIZE = 4;
const HOUR_LENGTH = 70;
const MINUTE_LENGTH = 95;
const SECOND_LENGTH = 105;
const SECOND_TAIL = 28;

const woodGrainLines = Array.from({ length: 18 }, (_, i) => ({
  offset: (i / 18) * 100,
  opacity: 0.08 + Math.random() * 0.12,
  width: 0.5 + Math.random() * 1.2,
}));

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
      setAngles({
        h: hr * 30,
        m: min * 6,
        s: sec * 6,
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const markers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    return {
      cx: CENTER + MARKER_RADIUS * Math.cos(angle),
      cy: CENTER + MARKER_RADIUS * Math.sin(angle),
    };
  });

  return (
    <div className="hero-clock-wrapper">
      <svg
        width={CLOCK_SIZE}
        height={CLOCK_SIZE}
        viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
        className="hero-clock"
      >
        <defs>
          {/* Wood grain pattern */}
          <pattern id="woodGrain" patternUnits="userSpaceOnUse" width="40" height="40">
            <rect width="40" height="40" fill="#5C3D2E" />
            {woodGrainLines.map((l, i) => (
              <line
                key={i}
                x1="0"
                y1={`${l.offset}%`}
                x2="40"
                y2={`${l.offset + 2}%`}
                stroke="#3E2723"
                strokeWidth={l.width}
                opacity={l.opacity}
              />
            ))}
          </pattern>

          {/* Epoxy sheen gradient */}
          <radialGradient id="epoxySheen" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Dark mode center glow */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#d4af37" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </radialGradient>

          {/* Dark mode epoxy inner glow */}
          <radialGradient id="epoxyDarkGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a4a4a" stopOpacity="0.15" />
            <stop offset="70%" stopColor="#0d2f2f" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>

          {/* Gold marker glow filter */}
          <filter id="markerGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Hand glow filter */}
          <filter id="handGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Wood frame ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={OUTER_RADIUS}
          fill="url(#woodGrain)"
          className="clock-wood-frame"
        />
        {/* Wood frame inner shadow */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={OUTER_RADIUS}
          fill="none"
          stroke="#2a1a0e"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Epoxy face */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={FACE_RADIUS}
          fill="#0a0a0a"
          className="clock-epoxy-face"
        />
        {/* Dark mode epoxy glow overlay */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={FACE_RADIUS}
          fill="url(#epoxyDarkGlow)"
          className="clock-epoxy-dark-glow"
        />
        {/* Wet sheen highlight */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={FACE_RADIUS}
          fill="url(#epoxySheen)"
        />

        {/* Dark mode center radial glow */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={FACE_RADIUS}
          fill="url(#centerGlow)"
          className="clock-center-glow"
        />

        {/* Hour markers */}
        {markers.map((m, i) => (
          <circle
            key={i}
            cx={m.cx}
            cy={m.cy}
            r={i % 3 === 0 ? MARKER_SIZE + 0.5 : MARKER_SIZE}
            fill="#d4af37"
            className="clock-marker"
          />
        ))}

        {/* Hour hand */}
        <line
          x1={CENTER}
          y1={CENTER}
          x2={CENTER}
          y2={CENTER - HOUR_LENGTH}
          stroke="#d4af37"
          strokeWidth="3.5"
          strokeLinecap="round"
          transform={`rotate(${angles.h} ${CENTER} ${CENTER})`}
          className="clock-hand"
        />

        {/* Minute hand */}
        <line
          x1={CENTER}
          y1={CENTER}
          x2={CENTER}
          y2={CENTER - MINUTE_LENGTH}
          stroke="#d4af37"
          strokeWidth="2.2"
          strokeLinecap="round"
          transform={`rotate(${angles.m} ${CENTER} ${CENTER})`}
          className="clock-hand"
        />

        {/* Second hand with counterweight tail */}
        <g transform={`rotate(${angles.s} ${CENTER} ${CENTER})`} className="clock-hand clock-second-hand">
          <line
            x1={CENTER}
            y1={CENTER + SECOND_TAIL}
            x2={CENTER}
            y2={CENTER - SECOND_LENGTH}
            stroke="#c9a94e"
            strokeWidth="1"
            strokeLinecap="round"
          />
          {/* Counterweight */}
          <circle
            cx={CENTER}
            cy={CENTER + SECOND_TAIL - 4}
            r="3"
            fill="#c9a94e"
          />
        </g>

        {/* Center pivot */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r="5"
          fill="#d4af37"
          className="clock-pivot"
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r="2.5"
          fill="#0a0a0a"
        />

        {/* Outer ring highlight */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={OUTER_RADIUS}
          fill="none"
          stroke="#8B6914"
          strokeWidth="0.5"
          opacity="0.2"
          className="clock-outer-ring"
        />
      </svg>
    </div>
  );
};

export default HeroClock;
