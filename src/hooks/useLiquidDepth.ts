import { useEffect } from "react";

const MAX_ROTATION = 8;

function handleMouseMove(e: MouseEvent) {
  const btn = e.currentTarget as HTMLElement;
  const rect = btn.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  const rotateY = (x - 0.5) * 2 * MAX_ROTATION;
  const rotateX = (0.5 - y) * 2 * MAX_ROTATION;
  btn.style.transform = `perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.97)`;
}

function handleMouseEnter(e: MouseEvent) {
  const btn = e.currentTarget as HTMLElement;
  btn.style.willChange = "transform";
}

function handleMouseLeave(e: MouseEvent) {
  const btn = e.currentTarget as HTMLElement;
  btn.style.transform = "";
  // Clear will-change after transition completes
  setTimeout(() => { btn.style.willChange = ""; }, 200);
}

function attach(btn: HTMLElement) {
  if ((btn as any).__liquidDepth) return; // prevent double-attach
  (btn as any).__liquidDepth = true;
  btn.style.transition = "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)";
  btn.addEventListener("mouseenter", handleMouseEnter, { passive: true });
  btn.addEventListener("mousemove", handleMouseMove, { passive: true });
  btn.addEventListener("mouseleave", handleMouseLeave, { passive: true });
}

function detach(btn: HTMLElement) {
  (btn as any).__liquidDepth = false;
  btn.style.transition = "";
  btn.style.willChange = "";
  btn.style.transform = "";
  btn.removeEventListener("mouseenter", handleMouseEnter);
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

    // Debounced MutationObserver
    let timer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(run, 150);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.querySelectorAll<HTMLElement>(selector).forEach(detach);
    };
  }, []);
}
