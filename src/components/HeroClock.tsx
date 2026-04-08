import { useEffect, useRef, useState } from "react";
import clockFace from "@/assets/clock-face-epoxy.png";

const CLOCK_SIZE = 340;
const CENTER = CLOCK_SIZE / 2;
const HOUR_LENGTH = 72;
const MINUTE_LENGTH = 100;
const SECOND_LENGTH = 110;
const SECOND_TAIL = 24;

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

  return (
    <div className="hero-clock-wrapper relative" style={{ width: CLOCK_SIZE, height: CLOCK_SIZE }}>
      {/* Photorealistic clock face image */}
      <img
        src={clockFace}
        alt="Epoxy resin and wood clock face"
        width={CLOCK_SIZE}
        height={CLOCK_SIZE}
        className="absolute inset-0 w-full h-full rounded-full object-cover"
        style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.22))" }}
      />

      {/* Live SVG hands overlay */}
      <svg
        width={CLOCK_SIZE}
        height={CLOCK_SIZE}
        viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id="goldHand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8c44a" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b8942e" />
          </linearGradient>
          <filter id="handShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Hour hand */}
        <line
          x1={CENTER}
          y1={CENTER + 14}
          x2={CENTER}
          y2={CENTER - HOUR_LENGTH}
          stroke="url(#goldHand)"
          strokeWidth="4.5"
          strokeLinecap="round"
          transform={`rotate(${angles.h} ${CENTER} ${CENTER})`}
          filter="url(#handShadow)"
        />

        {/* Minute hand */}
        <line
          x1={CENTER}
          y1={CENTER + 16}
          x2={CENTER}
          y2={CENTER - MINUTE_LENGTH}
          stroke="url(#goldHand)"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${angles.m} ${CENTER} ${CENTER})`}
          filter="url(#handShadow)"
        />

        {/* Second hand */}
        <g transform={`rotate(${angles.s} ${CENTER} ${CENTER})`}>
          <line
            x1={CENTER}
            y1={CENTER + SECOND_TAIL}
            x2={CENTER}
            y2={CENTER - SECOND_LENGTH}
            stroke="#c9a94e"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx={CENTER} cy={CENTER + SECOND_TAIL - 4} r="3.5" fill="#c9a94e" />
        </g>

        {/* Center pivot */}
        <circle cx={CENTER} cy={CENTER} r="7" fill="#d4af37" filter="url(#handShadow)" />
        <circle cx={CENTER} cy={CENTER} r="4" fill="#b8942e" />
        <circle cx={CENTER} cy={CENTER} r="2" fill="#e8c44a" opacity="0.7" />
      </svg>
    </div>
  );
};

export default HeroClock;
