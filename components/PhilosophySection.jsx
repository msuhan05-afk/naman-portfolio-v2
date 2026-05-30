"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const rootRef = useRef(null);

  useGSAP(() => {
    const words = gsap.utils.toArray(".ph-w");
    gsap.fromTo(words,
      { opacity: 0, yPercent: 110 },
      { opacity: 1, yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.04,
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" } }
    );
    gsap.fromTo(".ph-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.6, ease: "expo.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" } }
    );
  }, { scope: rootRef });

  const statement = "Good design is invisible until it's missing.".split(" ");

  return (
    <section ref={rootRef}
      className="relative section-dark py-28 md:py-44 px-6 md:px-10 overflow-hidden">

      {/* Gradient swoosh — logo-inspired */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#8b2be2" />
              <stop offset="50%"  stopColor="#ff3d7f" />
              <stop offset="100%" stopColor="#f5a623" />
            </linearGradient>
          </defs>
          {/* Left ribbon arc */}
          <path d="M -60 0 Q 200 300 400 600" stroke="url(#sg1)" strokeWidth="120" fill="none" strokeLinecap="round" opacity="0.5" />
          {/* Right ribbon arc */}
          <path d="M 1500 0 Q 1200 300 1000 600" stroke="url(#sg1)" strokeWidth="90" fill="none" strokeLinecap="round" opacity="0.35" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">

        <div className="ph-line origin-left h-px mb-12 w-24"
          style={{ background: "linear-gradient(90deg, #8b2be2, #ff3d7f, #f5a623)" }} />

        <p className="text-[10px] uppercase tracking-[0.32em] text-bone/30 mb-10">Philosophy</p>

        <h2 className="font-display font-semibold tracking-tightest leading-[0.88]"
          style={{ fontSize: "clamp(2.5rem, 7.5vw, 8rem)" }}>
          {statement.map((w, i) => (
            <span key={i} className="word-clip mr-[0.2em]" style={{ display: "inline-block" }}>
              <span className="ph-w inline-block"
                style={{
                  background: i === 2 || i === 3
                    ? "linear-gradient(130deg, #8b2be2, #ff3d7f)"
                    : i === 5 || i === 6
                    ? "linear-gradient(130deg, #ff3d7f, #f5a623)"
                    : undefined,
                  WebkitBackgroundClip: i >= 2 && i <= 6 ? "text" : undefined,
                  WebkitTextFillColor: i >= 2 && i <= 6 ? "transparent" : undefined,
                  backgroundClip:      i >= 2 && i <= 6 ? "text" : undefined,
                  color: i >= 2 && i <= 6 ? undefined : "rgb(var(--bone))",
                }}>
                {w}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-14 flex flex-wrap gap-12 md:gap-24">
          {[
            { label: "Approach", value: "Research-led · Visually precise" },
            { label: "Focus",    value: "Human behaviour & interaction" },
            { label: "Base",     value: "London, UK · Open to relocation" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] uppercase tracking-[0.28em] text-bone/30 mb-2">{label}</p>
              <p className="text-bone/70 text-sm">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
