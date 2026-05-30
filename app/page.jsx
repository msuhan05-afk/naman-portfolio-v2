"use client";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { projects } from "@/lib/projects";

const LottieScene  = dynamic(() => import("@/components/LottieScene"),  { ssr: false });
const RiveHero     = dynamic(() => import("@/components/RiveHero"),     { ssr: false });

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const WORDS = ["Designing", "for", "human", "behaviour"];

export default function Home() {
  const heroRef = useRef(null);

  useGSAP(() => {
    const words = gsap.utils.toArray(".hw");
    gsap.set(words,          { yPercent: 110, opacity: 0 });
    gsap.set(".hero-meta",   { opacity: 0, y: 16 });
    gsap.set(".hero-badge",  { opacity: 0, scale: 0.9 });
    gsap.set(".hero-scroll", { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(".hero-meta",   { opacity: 1, y: 0, duration: 1.1, stagger: 0.06 }, 0.1)
      .to(words,          { yPercent: 0, opacity: 1, duration: 1.5, stagger: 0.07 }, 0.25)
      .to(".hero-badge",  { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" }, 0.85)
      .to(".hero-scroll", { opacity: 1, duration: 1 }, 1.1);

    gsap.to(".hero-stage", {
      yPercent: -10, opacity: 0, ease: "none",
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 0.8 },
    });
    gsap.to(".blob-a", { yPercent: -40, ease: "none",
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.2 } });
    gsap.to(".blob-b", { yPercent: -25, ease: "none",
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.8 } });

    gsap.utils.toArray(".work-card").forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: i * 0.07,
        scrollTrigger: { trigger: card, start: "top 88%" },
      });
    });

    gsap.utils.toArray(".reveal-y").forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }, { scope: heroRef });

  return (
    <main>
      {/* ── HERO ── */}
      <section ref={heroRef} className="section-dark relative min-h-[100svh] flex flex-col justify-end overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">
          <div className="blob-a absolute -left-32 top-[10%] w-[50vw] h-[50vw] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(214,169,95,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
          <div className="blob-b absolute right-[-15%] bottom-[5%] w-[55vw] h-[55vw] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(237,232,208,0.05) 0%, transparent 65%)", filter: "blur(100px)" }} />
        </div>

        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[26vw] max-w-[320px] pointer-events-none opacity-50 hidden md:block">
          <LottieScene src="/lottie/orbit.json" className="w-full h-full" />
        </div>

        <div className="hero-meta absolute top-20 left-6 md:left-10 right-6 md:right-10 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-bone/35">
          <span>London, UK</span>
          <span className="hidden md:block">2026</span>
        </div>

        <div className="hero-stage relative z-10 px-6 md:px-10 pb-[12vh] max-w-[1440px] w-full mx-auto">
          <h1 className="font-display font-semibold leading-[0.9] tracking-tightest text-bone"
            style={{ fontSize: "clamp(3.2rem, 10.5vw, 10rem)" }}>
            {WORDS.map((word, i) => (
              <span key={i} className="word-clip mr-[0.14em] align-bottom" style={{ display: "inline-block" }}>
                <span className="hw inline-block will-change-transform">
                  {word === "human" ? (
                    <span style={{
                      background: "linear-gradient(130deg, #ede8d0 0%, #D6A95F 50%, #ede8d0 100%)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                      fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                    }}>{word}</span>
                  ) : word}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-8 flex items-center gap-4">
            <div className="hero-badge inline-flex items-center gap-3 border border-bone/15 rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-bone/50">
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
              Open to roles
            </div>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-10 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bone/40 to-transparent"
              style={{ animation: "scrollLine 2.2s ease-in-out infinite" }} />
          </div>
        </div>

        <style>{`@keyframes scrollLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }`}</style>
      </section>

      {/* ── WORK ── */}
      <section className="section-light px-6 md:px-10 py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <span className="reveal-y text-[10px] uppercase tracking-[0.32em] text-[rgb(15,14,13)]/35">Selected Work</span>
            <Link href="/work"
              className="reveal-y text-[10px] uppercase tracking-[0.28em] text-[rgb(15,14,13)]/35 hover:text-[rgb(15,14,13)] transition-colors duration-300 hidden md:block">
              All projects →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {projects.slice(0, 4).map((p, i) => (
              <Link key={p.slug} href={`/work/${p.slug}`} className="work-card group block">
                <div className="relative w-full overflow-hidden mb-4"
                  style={{ aspectRatio: i === 0 ? "16/9" : "4/3", background: p.color, borderRadius: "3px" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `radial-gradient(circle at 60% 40%, ${p.accent}35 0%, transparent 70%)` }} />
                  <div className="absolute inset-0 transition-transform duration-700 ease-cinema group-hover:scale-[1.04]"
                    style={{ background: `linear-gradient(135deg, ${p.color} 0%, ${p.accent}18 100%)` }} />
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs">↗</span>
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display font-semibold text-[rgb(15,14,13)] text-lg md:text-xl tracking-tight">
                    {p.title}
                  </h3>
                  <span className="text-xs text-[rgb(15,14,13)]/30 font-mono ml-4 shrink-0">{p.year}</span>
                </div>
                <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[rgb(15,14,13)]/35">{p.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RIVE ANIMATION ── */}
      <RiveHero src="/rive/27611-52153-rive.riv" stateMachine="State Machine 1" label="Motion · Interactive" />

      {/* ── ABOUT STRIP ── */}
      <section className="section-dark px-6 md:px-10 py-20 md:py-32 border-t border-bone/[0.07]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          <h2 className="reveal-y font-display font-semibold text-bone leading-[0.92] tracking-tightest"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)" }}>
            Craft meets<br />
            <span className="font-serif italic font-light" style={{ color: "rgb(var(--amber))" }}>research</span>
          </h2>
          <div className="reveal-y flex flex-col gap-6 items-start">
            <LottieScene src="/lottie/orbit.json" className="w-[180px] h-[180px] opacity-60" />
            <Link href="/about"
              className="text-[10px] uppercase tracking-[0.28em] text-bone/40 hover:text-bone transition-colors duration-300">
              About me →
            </Link>
          </div>
        </div>
      </section>

      {/* ── LENS STRIP ── */}
      <section className="section-light px-6 md:px-10 py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <span className="reveal-y text-[10px] uppercase tracking-[0.32em] text-[rgb(15,14,13)]/35">Photography & Film</span>
            <Link href="/lens"
              className="reveal-y text-[10px] uppercase tracking-[0.28em] text-[rgb(15,14,13)]/35 hover:text-[rgb(15,14,13)] transition-colors duration-300 hidden md:block">
              View Lens →
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 reveal-y">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-sm overflow-hidden"
                style={{ background: `hsl(${30 + i * 15}, ${14 + i * 3}%, ${80 - i * 5}%)` }}>
                <div className="w-full h-full" style={{ background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 100%)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="section-dark px-6 md:px-10 py-12 border-t border-bone/[0.07]">
        <div className="max-w-[1440px] mx-auto flex items-end justify-between">
          <span className="font-display font-semibold text-bone/10 tracking-tightest"
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 1 }}>NM</span>
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.28em] text-bone/35">
            {["Email", "LinkedIn", "Behance"].map(item => (
              <span key={item} className="link-underline cursor-pointer hover:text-bone/70 transition-colors duration-300">{item}</span>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
