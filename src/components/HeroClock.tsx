import { useEffect, useRef, useState } from "react";
import clockFace from "@/assets/clock-face.png";

const HeroClock = () => {
  const rafRef = useRef<number>(0);
  const [angles, setAngles] = useState({ h: 0, m: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;
      setAngles({ h: hr * 30, m: min * 6 });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="relative w-[85vw] max-w-[420px] aspect-square rounded-full overflow-hidden mx-auto"
      style={{
        boxShadow:
          "0 20px 60px rgba(139, 94, 60, 0.25), 0 8px 20px rgba(0, 0, 0, 0.12), inset 0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      {/* Clock face image */}
      <img
        src={clockFace}
        alt="Oyrial epoxy resin wall clock"
        className="absolute inset-0 w-full h-full object-cover rounded-full"
        draggable={false}
      />

      {/* SVG hands overlay */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
      >
        {/* Hour hand */}
        <line
          x1="200"
          y1="200"
          x2="200"
          y2="130"
          stroke="#2a2a2a"
          strokeWidth="5"
          strokeLinecap="round"
          transform={`rotate(${angles.h} 200 200)`}
        />

        {/* Minute hand */}
        <line
          x1="200"
          y1="200"
          x2="200"
          y2="100"
          stroke="#2a2a2a"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${angles.m} 200 200)`}
        />

        {/* Center pivot */}
        <circle cx="200" cy="200" r="6" fill="#2a2a2a" />
        <circle cx="200" cy="200" r="2.5" fill="#5c4033" />
      </svg>
    </div>
  );
};

export default HeroClock;
