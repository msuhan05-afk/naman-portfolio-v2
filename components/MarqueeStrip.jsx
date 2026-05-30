"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const WORDS = [
  "HCI Designer", "·", "Creative Technologist", "·",
  "UX Research", "·", "Motion Design", "·",
  "Interaction Design", "·", "Accessibility", "·",
  "Product Design", "·", "Visual Craft", "·",
];

export default function MarqueeStrip({ reverse = false }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const total  = track.scrollWidth / 2;
    const tween  = gsap.to(track, {
      x: reverse ? total : -total,
      duration: 28,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % total}px`,
      },
    });
    return () => tween.kill();
  }, [reverse]);

  const doubled = [...WORDS, ...WORDS];

  return (
    <div className="overflow-hidden py-5 border-y"
      style={{
        background: "#0a0a0a",
        borderColor: "rgba(255,255,255,0.06)",
      }}>
      <div ref={trackRef} className="flex gap-8 whitespace-nowrap will-change-transform w-max">
        {doubled.map((w, i) => (
          <span key={i}
            className="text-[11px] uppercase tracking-[0.32em] shrink-0"
            style={{
              color: w === "·"
                ? "rgba(255,255,255,0.15)"
                : i % 8 === 0 ? "#8b2be2"
                : i % 8 === 2 ? "#ff3d7f"
                : i % 8 === 4 ? "#f5a623"
                : "rgba(255,255,255,0.35)",
            }}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
