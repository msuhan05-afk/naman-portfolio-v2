"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import GlassJourney from "@/components/GlassJourney";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import PhilosophySection from "@/components/PhilosophySection";

const LottieScene = dynamic(() => import("@/components/LottieScene"), { ssr: false });
const RiveHero    = dynamic(() => import("@/components/RiveHero"),    { ssr: false });

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Interaction Design", "UX Research", "Figma & Prototyping",
  "Motion Design", "Accessibility", "Design Systems",
];

export default function About() {
  const rootRef = useRef(null);

  useGSAP(() => {
    const words = gsap.utils.toArray(".ah-word");
    gsap.set(words, { yPercent: 110, opacity: 0 });
    gsap.to(words, { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.06, ease: "expo.out", delay: 0.2 });
    gsap.fromTo(".ah-meta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.1 });

    gsap.utils.toArray(".reveal-y").forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%" } });
    });
  }, { scope: rootRef });

  return (
    <main ref={rootRef}>

      {/* ── HERO ── */}
      <section className="section-dark relative min-h-[100svh] flex flex-col justify-end overflow-hidden px-6 md:px-10 pb-[12vh]">
        <div className="absolute inset-0 pointer-events-none">
          {/* Purple-pink gradient top-right — logo-inspired */}
          <div className="absolute right-0 top-0 w-[50vw] h-[50vw]"
            style={{ background: "radial-gradient(circle at 80% 10%, rgba(139,43,226,0.14) 0%, rgba(255,61,127,0.08) 50%, transparent 75%)", filter: "blur(80px)" }} />
          <div className="absolute left-[-5%] bottom-[-5%] w-[40vw] h-[40vw]"
            style={{ background: "radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 65%)", filter: "blur(90px)" }} />
        </div>

        {/* Ghost text */}
        <div className="absolute bottom-0 left-0 pointer-events-none select-none overflow-hidden w-full"
          style={{ fontSize: "clamp(7rem, 20vw, 20rem)", lineHeight: 0.82,
            fontFamily: "Space Grotesk, sans-serif", fontWeight: 700,
            color: "rgba(237,232,208,0.025)", letterSpacing: "-0.05em" }}>
          ABOUT
        </div>

        {/* Decorative swoosh SVG — logo-inspired */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#8b2be2" stopOpacity="0.4" />
              <stop offset="50%"  stopColor="#ff3d7f" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f5a623" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path d="M -80 0 Q 300 450 600 900" stroke="url(#hero-grad)" strokeWidth="200" fill="none" strokeLinecap="round" />
        </svg>

        <div className="relative z-10 max-w-[1440px] w-full mx-auto">
          <p className="ah-meta text-[10px] uppercase tracking-[0.32em] text-bone/35 mb-10">Naman Mehra</p>
          <h1 className="font-display font-semibold text-bone leading-[0.9] tracking-tightest"
            style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}>
            {["HCI Designer", "&", "Creative", "Technologist"].map((w, i) => (
              <span key={i} className="word-clip mr-[0.14em]" style={{ display: "inline-block" }}>
                <span className="ah-word inline-block"
                  style={i === 1 ? {
                    background: "linear-gradient(130deg, #8b2be2, #ff3d7f, #f5a623)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  } : {}}>
                  {w}
                </span>
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* ── MARQUEE 1 ── */}
      <MarqueeStrip />

      {/* ── BIO ── */}
      <section className="section-light px-6 md:px-10 py-24 md:py-40">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-6 reveal-y">
            <p className="text-[rgb(15,14,13)]/60 text-xl md:text-2xl leading-relaxed font-light">
              HCI practitioner shipping end-to-end product flows, design systems, and
              user-tested interfaces across health-tech, brand, and motion.
            </p>

            <div className="mt-16 grid grid-cols-3 gap-8">
              {[{ n: "4+", l: "Years" }, { n: "10+", l: "Projects" }, { n: "3", l: "Industries" }].map(({ n, l }) => (
                <div key={l}>
                  <p className="font-display font-semibold text-[rgb(15,14,13)] text-4xl md:text-5xl tracking-tightest">{n}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[rgb(15,14,13)]/35">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 reveal-y flex flex-col items-start gap-10">
            <LottieScene src="/lottie/orbit.json" className="w-[220px] h-[220px] opacity-55" />
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s}
                  className="px-4 py-2 text-[10px] uppercase tracking-[0.2em] rounded-full border border-[rgb(15,14,13)]/15 text-[rgb(15,14,13)]/50">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES — purple/pink/orange ── */}
      <CapabilitiesSection />

      {/* ── MARQUEE 2 (reverse) ── */}
      <MarqueeStrip reverse />

      {/* ── RIVE ── */}
      <RiveHero src="/rive/27611-52153-rive.riv" stateMachine="State Machine 1" label="Creative Motion" />

      {/* ── PHILOSOPHY ── */}
      <PhilosophySection />

      {/* ── JOURNEY (glassmorphism) ── */}
      <GlassJourney />

      {/* ── CONTACT ── */}
      <section className="section-light px-6 md:px-10 py-28 md:py-44">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="reveal-y font-display font-semibold text-[rgb(15,14,13)] leading-[0.92] tracking-tightest mb-12"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}>
            Let's work<br />
            <span className="font-serif italic font-light" style={{ color: "rgb(var(--amber))" }}>together</span>
          </h2>
          <p className="reveal-y text-[10px] uppercase tracking-[0.28em] text-[rgb(15,14,13)]/40">
            namanmehra.work@gmail.com · London, UK
          </p>
        </div>
      </section>

    </main>
  );
}
