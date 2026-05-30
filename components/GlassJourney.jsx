"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const steps = [
  { year: "2024–26", title: "MSc Human Computer Interaction", place: "University for the Creative Arts, London", icon: "◎" },
  { year: "2023",    title: "Product Designer",               place: "Metalane (now Illumina)",                 icon: "◈" },
  { year: "2022–23", title: "Visual Communicator",            place: "WWF India",                               icon: "◉" },
  { year: "2022",    title: "Video Editor Intern",            place: "Genesis BCW (now Burson)",                icon: "◌" },
  { year: "2021–22", title: "Founder & Creative Director",    place: "Cheesecake Studios",                      icon: "◆" },
  { year: "2019–23", title: "B.Tech Computer Science",        place: "AKTU, India",                             icon: "◇" },
];

// Sphere definitions — position, size, color stops, float params
const SPHERES = [
  { w: 260, h: 260, top: "-6%",  left: "2%",   c1: "#ffb89a", c2: "#ff6040", dur: 5.5, delay: 0,   yAmt: 28 },
  { w: 110, h: 110, top: "8%",   left: "43%",  c1: "#ffcab0", c2: "#ff8060", dur: 4.2, delay: 0.6, yAmt: 18 },
  { w: 300, h: 300, top: "-4%",  right: "3%",  c1: "#ff9070", c2: "#ff3a18", dur: 6.0, delay: 1.0, yAmt: 22 },
  { w: 90,  h: 90,  top: "42%",  left: "1%",   c1: "#ffcab0", c2: "#ff7050", dur: 4.8, delay: 0.4, yAmt: 30 },
  { w: 220, h: 220, bottom:"2%", left: "30%",  c1: "#ff8060", c2: "#ff2c0a", dur: 5.2, delay: 0.8, yAmt: 24 },
  { w: 140, h: 140, top: "35%",  right: "4%",  c1: "#ffb090", c2: "#ff6040", dur: 4.6, delay: 1.3, yAmt: 20 },
  { w: 70,  h: 70,  bottom:"10%",right:"20%",  c1: "#ffcab0", c2: "#ff9070", dur: 3.8, delay: 0.2, yAmt: 16 },
];

export default function GlassJourney() {
  const rootRef = useRef(null);

  useGSAP(() => {
    // ── Sphere entrance ─────────────────────────────────────────────
    const spheres = gsap.utils.toArray(".gj-sphere");
    gsap.fromTo(spheres,
      { scale: 0, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
      }
    );

    // ── Sphere float loops ──────────────────────────────────────────
    spheres.forEach((el, i) => {
      const s = SPHERES[i];
      gsap.to(el, {
        y: -s.yAmt,
        duration: s.dur,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: s.delay,
      });
    });

    // ── Glass card stagger reveal ───────────────────────────────────
    gsap.fromTo(".gj-card",
      { opacity: 0, y: 60, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "expo.out", stagger: 0.12,
        scrollTrigger: { trigger: ".gj-grid", start: "top 82%" },
      }
    );

    // ── Heading entrance ───────────────────────────────────────────
    gsap.fromTo(".gj-heading",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" } }
    );
  }, { scope: rootRef });

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden py-28 md:py-40 px-6 md:px-10"
      style={{ background: "linear-gradient(135deg, #fde0d2 0%, #f8c5ae 50%, #f5b09a 100%)" }}
    >
      {/* ── Floating spheres ─────────────────────────────────────── */}
      {SPHERES.map((s, i) => (
        <div
          key={i}
          className="gj-sphere absolute rounded-full pointer-events-none will-change-transform"
          style={{
            width:  s.w,
            height: s.h,
            top:    s.top    ?? undefined,
            bottom: s.bottom ?? undefined,
            left:   s.left   ?? undefined,
            right:  s.right  ?? undefined,
            background: `radial-gradient(circle at 35% 35%, ${s.c1}, ${s.c2})`,
            filter: "blur(2px)",
            opacity: 0,
            transformOrigin: "center",
          }}
        />
      ))}

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1440px] mx-auto">
        <h2
          className="gj-heading font-display font-semibold tracking-tightest leading-[0.9] mb-14 md:mb-20"
          style={{
            fontSize: "clamp(2.8rem, 6vw, 6rem)",
            color: "#3d1a0a",
          }}
        >
          My Journey
        </h2>

        {/* ── Glass cards grid ─────────────────────────────────── */}
        <div className="gj-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {steps.map((s, i) => (
            <GlassCard key={i} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GlassCard({ step, index }) {
  const cardRef = useRef(null);

  // Tilt on mouse move
  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const r   = card.getBoundingClientRect();
    const cx  = r.left + r.width  / 2;
    const cy  = r.top  + r.height / 2;
    const rx  = ((e.clientY - cy) / (r.height / 2)) * 6;
    const ry  = ((e.clientX - cx) / (r.width  / 2)) * -6;
    gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.4, ease: "power2.out", transformPerspective: 800 });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "expo.out" });
  };

  return (
    <div
      ref={cardRef}
      className="gj-card relative rounded-2xl p-7 cursor-default will-change-transform"
      style={{
        background:       "rgba(255, 255, 255, 0.22)",
        backdropFilter:   "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border:           "1px solid rgba(255, 255, 255, 0.45)",
        boxShadow:        "0 8px 40px rgba(220, 90, 50, 0.10), inset 0 1px 0 rgba(255,255,255,0.5)",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Index */}
      <span
        className="block text-[10px] uppercase tracking-[0.3em] mb-5"
        style={{ color: "rgba(100, 40, 20, 0.45)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Year badge */}
      <div
        className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] mb-5"
        style={{
          background: "rgba(255,255,255,0.35)",
          border:     "1px solid rgba(255,255,255,0.55)",
          color:      "#c44820",
        }}
      >
        {step.year}
      </div>

      {/* Title */}
      <h3
        className="font-display font-semibold leading-tight mb-2"
        style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", color: "#2e1208" }}
      >
        {step.title}
      </h3>

      {/* Place */}
      <p
        className="text-[11px] uppercase tracking-[0.2em]"
        style={{ color: "rgba(80, 30, 10, 0.5)" }}
      >
        {step.place}
      </p>

      {/* Decorative icon */}
      <div
        className="absolute bottom-5 right-6 text-2xl select-none"
        style={{ color: "rgba(200, 80, 40, 0.2)" }}
      >
        {step.icon}
      </div>
    </div>
  );
}
