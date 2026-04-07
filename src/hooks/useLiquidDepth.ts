import { useEffect } from "react";

const MAX_ROTATION = 8; // degrees
const TRANSITION = "transform 0.15s ease-out";

function handleMouseMove(e: MouseEvent) {
  const btn = e.currentTarget as HTMLElement;
  const rect = btn.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;   // 0..1
  const y = (e.clientY - rect.top) / rect.height;    // 0..1
  const rotateY = (x - 0.5) * 2 * MAX_ROTATION;     // -8..8
  const rotateX = (0.5 - y) * 2 * MAX_ROTATION;     // -8..8
  btn.style.transform = `perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.97)`;
}

function handleMouseLeave(e: MouseEvent) {
  const btn = e.currentTarget as HTMLElement;
  btn.style.transform = "";
}

function attach(btn: HTMLElement) {
  btn.style.transition = TRANSITION;
  btn.style.willChange = "transform";
  btn.addEventListener("mousemove", handleMouseMove);
  btn.addEventListener("mouseleave", handleMouseLeave);
}

function detach(btn: HTMLElement) {
  btn.style.transition = "";
  btn.style.willChange = "";
  btn.style.transform = "";
  btn.removeEventListener("mousemove", handleMouseMove);
  btn.removeEventListener("mouseleave", handleMouseLeave);
}

export function useLiquidDepth() {
  useEffect(() => {
    const selector = 'button, a[class*="btn"], [role="button"]';

    function run() {
      document.querySelectorAll<HTMLElement>(selector).forEach(attach);
    }

    run();

    const observer = new MutationObserver(run);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.querySelectorAll<HTMLElement>(selector).forEach(detach);
    };
  }, []);
}
