"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const CAPS = [
  {
    num:   "01",
    title: "Product & Interaction",
    tags:  ["UX Research", "Wireframing", "Prototyping", "Design Systems"],
    grad:  ["#8b2be2", "#6d0fc8"],
    blob:  "radial-gradient(ellipse at 30% 40%, #8b2be299 0%, #6d0fc844 45%, transparent 70%)",
    glow:  "#8b2be2",
  },
  {
    num:   "02",
    title: "Motion & Visual",
    tags:  ["After Effects", "Lottie", "Brand Identity", "Social Content"],
    grad:  ["#ff3d7f", "#c4155c"],
    blob:  "radial-gradient(ellipse at 70% 60%, #ff3d7f99 0%, #c4155c44 45%, transparent 70%)",
    glow:  "#ff3d7f",
  },
  {
    num:   "03",
    title: "Research & Access",
    tags:  ["User Interviews", "WCAG 2.2", "Usability Testing", "IA"],
    grad:  ["#f5a623", "#d4810a"],
    blob:  "radial-gradient(ellipse at 50% 30%, #f5a62399 0%, #d4810a44 45%, transparent 70%)",
    glow:  "#f5a623",
  },
];

export default function CapabilitiesSection() {
  const rootRef = useRef(null);

  useGSAP(() => {
    // Blobs float
    gsap.utils.toArray(".cap-blob").forEach((el, i) => {
      gsap.to(el, {
        y: -30, scale: 1.08,
        duration: 5 + i * 0.8,
        ease: "sine.inOut",
        repeat: -1, yoyo: true,
        delay: i * 0.6,
      });
    });

    // Cards reveal
    gsap.fromTo(".cap-card",
      { opacity: 0, y: 70 },
      { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.15,
        scrollTrigger: { trigger: ".cap-grid", start: "top 82%" } }
    );

    // Heading
    gsap.fromTo(".cap-heading",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 82%" } }
    );

    // Sweep line
    gsap.fromTo(".cap-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.6, ease: "expo.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 82%" } }
    );
  }, { scope: rootRef });

  return (
    <section ref={rootRef} className="relative overflow-hidden section-dark py-28 md:py-44 px-6 md:px-10">

      {/* Large ambient swooshes — purple left, pink right, orange center-bottom */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="cap-blob absolute -left-40 top-[-10%] w-[55vw] h-[55vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,43,226,0.18) 0%, transparent 65%)", filter: "blur(90px)" }} />
        <div className="cap-blob absolute -right-32 top-[20%] w-[45vw] h-[45vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,61,127,0.15) 0%, transparent 65%)", filter: "blur(100px)" }} />
        <div className="cap-blob absolute left-[35%] bottom-[-5%] w-[40vw] h-[40vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">

        {/* Header row */}
        <div className="flex items-end justify-between mb-4">
          <h2 className="cap-heading font-display font-semibold text-bone tracking-tightest leading-[0.9]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 6.5rem)" }}>
            What I Do
          </h2>
          <span className="cap-heading text-[10px] uppercase tracking-[0.32em] text-bone/30 hidden md:block">
            Capabilities
          </span>
        </div>

        {/* Sweep line */}
        <div className="cap-line origin-left h-px mb-16 md:mb-24"
          style={{ background: "linear-gradient(90deg, #8b2be2, #ff3d7f, #f5a623)" }} />

        {/* Cards */}
        <div className="cap-grid grid md:grid-cols-3 gap-5">
          {CAPS.map((c) => (
            <CapCard key={c.num} c={c} />
          ))}
        </div>

      </div>
    </section>
  );
}

function CapCard({ c }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const r  = ref.current.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const rx = ((e.clientY - cy) / (r.height / 2)) * 7;
    const ry = ((e.clientX - cx) / (r.width  / 2)) * -7;
    gsap.to(ref.current, { rotateX: rx, rotateY: ry, duration: 0.4, ease: "power2.out", transformPerspective: 900 });
    gsap.to(ref.current.querySelector(".cc-glow"), { opacity: 0.35, duration: 0.3 });
  };

  const onLeave = () => {
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "expo.out" });
    gsap.to(ref.current.querySelector(".cc-glow"), { opacity: 0, duration: 0.5 });
  };

  return (
    <div ref={ref}
      className="cap-card relative rounded-2xl p-8 md:p-10 overflow-hidden cursor-default will-change-transform"
      style={{
        background: "rgba(255,255,255,0.03)",
        border:     "1px solid rgba(255,255,255,0.08)",
        minHeight:  "360px",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Blob inside card */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: c.blob, filter: "blur(60px)", opacity: 0.5 }} />

      {/* Mouse-follow glow */}
      <div className="cc-glow absolute inset-0 pointer-events-none rounded-2xl opacity-0 transition-opacity"
        style={{ boxShadow: `inset 0 0 80px ${c.glow}40` }} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.32em] text-bone/30">{c.num}</span>
          <h3 className="mt-4 font-display font-semibold text-bone tracking-tightest leading-[0.92]"
            style={{
              fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)",
              background: `linear-gradient(130deg, #ffffff, ${c.grad[0]})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
            {c.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 mt-10">
          {c.tags.map(t => (
            <span key={t}
              className="px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] rounded-full"
              style={{ background: `${c.glow}18`, border: `1px solid ${c.glow}35`, color: c.grad[0] }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
