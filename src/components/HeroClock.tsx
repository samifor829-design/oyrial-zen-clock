import { useEffect, useRef, useState } from "react";
import clockFace from "@/assets/clock-face-epoxy.png";

const VIEWBOX_SIZE = 460;
const CENTER = VIEWBOX_SIZE / 2;
const MARKER_Y = 44;
const MARKER_WIDTH = 12;
const MARKER_HEIGHT = 36;

const HOUR_HAND = `
  M ${CENTER - 12} ${CENTER + 18}
  C ${CENTER - 13} ${CENTER - 8}, ${CENTER - 18} ${CENTER - 40}, ${CENTER - 17} ${CENTER - 68}
  C ${CENTER - 15} ${CENTER - 94}, ${CENTER - 11} ${CENTER - 118}, ${CENTER - 7} ${CENTER - 142}
  L ${CENTER - 1} ${CENTER - 154}
  L ${CENTER + 7} ${CENTER - 143}
  C ${CENTER + 12} ${CENTER - 118}, ${CENTER + 16} ${CENTER - 94}, ${CENTER + 17} ${CENTER - 68}
  C ${CENTER + 18} ${CENTER - 40}, ${CENTER + 13} ${CENTER - 8}, ${CENTER + 12} ${CENTER + 18}
  Z
  M ${CENTER + 10} ${CENTER - 96}
  L ${CENTER + 31} ${CENTER - 115}
  L ${CENTER + 17} ${CENTER - 79}
  Z
`;

const MINUTE_HAND = `
  M ${CENTER - 9} ${CENTER + 20}
  C ${CENTER - 11} ${CENTER - 10}, ${CENTER - 14} ${CENTER - 64}, ${CENTER - 14} ${CENTER - 118}
  C ${CENTER - 13} ${CENTER - 150}, ${CENTER - 9} ${CENTER - 178}, ${CENTER - 5} ${CENTER - 202}
  L ${CENTER} ${CENTER - 216}
  L ${CENTER + 7} ${CENTER - 202}
  C ${CENTER + 11} ${CENTER - 178}, ${CENTER + 14} ${CENTER - 150}, ${CENTER + 14} ${CENTER - 118}
  C ${CENTER + 14} ${CENTER - 64}, ${CENTER + 11} ${CENTER - 10}, ${CENTER + 9} ${CENTER + 20}
  Z
  M ${CENTER - 12} ${CENTER - 144}
  L ${CENTER - 38} ${CENTER - 168}
  L ${CENTER - 18} ${CENTER - 126}
  Z
`;

const SECOND_HAND = `
  M ${CENTER - 2} ${CENTER + 18}
  L ${CENTER - 1} ${CENTER - 178}
  L ${CENTER} ${CENTER - 196}
  L ${CENTER + 2} ${CENTER - 178}
  L ${CENTER + 3} ${CENTER + 18}
  Z
`;

const markerAngles = Array.from({ length: 12 }, (_, index) => index * 30);

const HeroClock = () => {
  const rafRef = useRef<number>(0);
  const [angles, setAngles] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const milliseconds = now.getMilliseconds();
      const seconds = now.getSeconds() + milliseconds / 1000;
      const minutes = now.getMinutes() + seconds / 60;
      const hours = (now.getHours() % 12) + minutes / 60;

      setAngles({
        h: hours * 30,
        m: minutes * 6,
        s: seconds * 6,
      });

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
          <linearGradient id="woodFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(24 47% 48%)" />
            <stop offset="45%" stopColor="hsl(20 43% 35%)" />
            <stop offset="100%" stopColor="hsl(18 39% 24%)" />
          </linearGradient>

          <linearGradient id="woodSheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(34 52% 58% / 0.45)" />
            <stop offset="100%" stopColor="hsl(18 36% 16% / 0.1)" />
          </linearGradient>

          <filter id="woodDepth" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0.4" dy="1.6" stdDeviation="1.4" floodColor="hsl(18 28% 14% / 0.32)" />
          </filter>

          <filter id="pivotDepth" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0.5" dy="1.2" stdDeviation="1.2" floodColor="hsl(20 22% 12% / 0.28)" />
          </filter>
        </defs>

        {markerAngles.map((angle) => (
          <g key={angle} transform={`rotate(${angle} ${CENTER} ${CENTER})`} filter="url(#woodDepth)">
            <rect
              x={CENTER - MARKER_WIDTH / 2}
              y={MARKER_Y}
              width={MARKER_WIDTH}
              height={MARKER_HEIGHT}
              rx="2.5"
              fill="url(#woodFill)"
              stroke="hsl(18 34% 18% / 0.5)"
              strokeWidth="1.1"
            />
            <path
              d={`M ${CENTER} ${MARKER_Y + 6} L ${CENTER} ${MARKER_Y + MARKER_HEIGHT - 6}`}
              stroke="hsl(18 32% 18% / 0.25)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        ))}

        <g transform={`rotate(${angles.h} ${CENTER} ${CENTER})`} filter="url(#woodDepth)">
          <path d={HOUR_HAND} fill="url(#woodFill)" stroke="hsl(18 38% 16% / 0.58)" strokeWidth="1.2" strokeLinejoin="round" />
          <path d={HOUR_HAND} fill="url(#woodSheen)" opacity="0.55" />
          <path
            d={`M ${CENTER} ${CENTER + 4} C ${CENTER + 4} ${CENTER - 20}, ${CENTER + 5} ${CENTER - 82}, ${CENTER + 4} ${CENTER - 136}`}
            fill="none"
            stroke="hsl(18 34% 18% / 0.18)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        <g transform={`rotate(${angles.m} ${CENTER} ${CENTER})`} filter="url(#woodDepth)">
          <path d={MINUTE_HAND} fill="url(#woodFill)" stroke="hsl(18 38% 16% / 0.58)" strokeWidth="1.2" strokeLinejoin="round" />
          <path d={MINUTE_HAND} fill="url(#woodSheen)" opacity="0.5" />
          <path
            d={`M ${CENTER - 1} ${CENTER + 8} C ${CENTER - 3} ${CENTER - 32}, ${CENTER - 3} ${CENTER - 104}, ${CENTER} ${CENTER - 198}`}
            fill="none"
            stroke="hsl(18 34% 18% / 0.18)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        <g transform={`rotate(${angles.s} ${CENTER} ${CENTER})`} filter="url(#woodDepth)">
          <path d={SECOND_HAND} fill="url(#woodFill)" stroke="hsl(18 38% 16% / 0.45)" strokeWidth="0.8" strokeLinejoin="round" />
        </g>

        <circle cx={CENTER} cy={CENTER} r="12" fill="hsl(41 50% 59%)" filter="url(#pivotDepth)" />
        <circle cx={CENTER} cy={CENTER} r="7" fill="hsl(41 43% 43%)" />
        <circle cx={CENTER} cy={CENTER} r="3" fill="hsl(44 58% 76%)" opacity="0.75" />
      </svg>
    </div>
  );
};

export default HeroClock;
