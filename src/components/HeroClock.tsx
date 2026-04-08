import { useEffect, useRef, useState } from "react";
import clockFace from "@/assets/clock-face-epoxy.png";

const SIZE = 340;
const C = SIZE / 2;
const HOUR_LEN = 68;
const MIN_LEN = 95;
const SEC_LEN = 108;
const SEC_TAIL = 22;

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
    <div className="relative inline-block" style={{ width: SIZE, height: SIZE }}>
      {/* Clock face image — no shadow, no extra styles */}
      <img
        src={clockFace}
        alt="Epoxy resin and wood clock"
        width={SIZE}
        height={SIZE}
        className="absolute inset-0 w-full h-full object-cover rounded-full"
        style={{ clipPath: "circle(48% at center)" }}
        draggable={false}
      />

      {/* SVG hands overlay — exactly same size, centered */}
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          <linearGradient id="goldH" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8c44a" />
            <stop offset="100%" stopColor="#b8942e" />
          </linearGradient>
          <filter id="hShadow">
            <feDropShadow dx="0.5" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Hour hand */}
        <line
          x1={C} y1={C + 12} x2={C} y2={C - HOUR_LEN}
          stroke="url(#goldH)" strokeWidth="5" strokeLinecap="round"
          transform={`rotate(${angles.h} ${C} ${C})`}
          filter="url(#hShadow)"
        />

        {/* Minute hand */}
        <line
          x1={C} y1={C + 14} x2={C} y2={C - MIN_LEN}
          stroke="url(#goldH)" strokeWidth="3.2" strokeLinecap="round"
          transform={`rotate(${angles.m} ${C} ${C})`}
          filter="url(#hShadow)"
        />

        {/* Second hand */}
        <g transform={`rotate(${angles.s} ${C} ${C})`}>
          <line
            x1={C} y1={C + SEC_TAIL} x2={C} y2={C - SEC_LEN}
            stroke="#c9a94e" strokeWidth="1.2" strokeLinecap="round"
          />
          <circle cx={C} cy={C + SEC_TAIL - 4} r="3" fill="#c9a94e" />
        </g>

        {/* Center pivot */}
        <circle cx={C} cy={C} r="6" fill="#d4af37" filter="url(#hShadow)" />
        <circle cx={C} cy={C} r="3" fill="#b8942e" />
        <circle cx={C} cy={C} r="1.5" fill="#e8c44a" opacity="0.7" />
      </svg>
    </div>
  );
};

export default HeroClock;
