"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/projects";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const FILTERS = ["All", "Product Design", "UX / UI", "Motion / Brand", "Creative Direction"];

export default function Work() {
  const rootRef = useRef(null);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter(p => p.category === active);

  useGSAP(() => {
    const words = gsap.utils.toArray(".ph-word");
    gsap.set(words, { yPercent: 110, opacity: 0 });
    gsap.to(words, { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.06, ease: "expo.out", delay: 0.2 });
    gsap.fromTo(".ph-meta", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.1 });

    gsap.utils.toArray(".reveal-y").forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" } }
      );
    });
  }, { scope: rootRef });

  return (
    <main ref={rootRef}>
      {/* ── Hero ── */}
      <section className="section-dark relative min-h-[65svh] flex flex-col justify-end px-6 md:px-10 pb-[10vh] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-10%] bottom-[-10%] w-[60vw] h-[60vw]"
            style={{ background: "radial-gradient(circle, rgba(214,169,95,0.07) 0%, transparent 60%)", filter: "blur(80px)" }} />
        </div>

        <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden"
          style={{ fontSize: "clamp(6rem, 18vw, 18rem)", lineHeight: 0.85, fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700, color: "rgba(237,232,208,0.03)", letterSpacing: "-0.05em" }}>
          WORK
        </div>

        <div className="relative z-10 max-w-[1440px] w-full mx-auto">
          <p className="ph-meta text-[10px] uppercase tracking-[0.32em] text-bone/40 mb-8">Selected Projects</p>
          <h1 className="font-display font-semibold text-bone leading-[0.9] tracking-tightest"
            style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}>
            {["Work"].map((w, i) => (
              <span key={i} className="word-clip mr-[0.14em]" style={{ display: "inline-block" }}>
                <span className="ph-word inline-block">{w}</span>
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* ── Filter + Grid — light ── */}
      <section className="section-light px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto">

          {/* Filter tabs */}
          <div className="reveal-y flex flex-wrap gap-2 mb-14">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.22em] rounded-full border transition-all duration-300
                  ${active === f
                    ? "border-[rgb(15,14,13)] bg-[rgb(15,14,13)] text-[rgb(245,242,235)]"
                    : "border-[rgb(15,14,13)]/20 text-[rgb(15,14,13)]/50 hover:border-[rgb(15,14,13)]/50 hover:text-[rgb(15,14,13)]/80"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Project list */}
          <div className="space-y-0">
            {filtered.map((p, i) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group flex items-center justify-between py-7 border-t border-[rgb(15,14,13)]/10 transition-colors duration-300 hover:border-[rgb(15,14,13)]/30"
              >
                <div className="flex items-center gap-6 md:gap-10 flex-1 min-w-0">
                  {/* Index */}
                  <span className="shrink-0 text-[11px] uppercase tracking-[0.22em] text-[rgb(15,14,13)]/25 font-mono w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Color swatch */}
                  <div className="shrink-0 w-12 h-12 rounded-sm hidden md:block transition-transform duration-500 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${p.color}, ${p.accent})` }} />

                  <h2 className="font-display font-semibold text-[rgb(15,14,13)] text-xl md:text-2xl tracking-tight truncate min-w-0">
                    {p.title}
                  </h2>
                </div>

                <div className="flex items-center gap-8 shrink-0 ml-6">
                  <span className="hidden md:block text-[10px] uppercase tracking-[0.22em] text-[rgb(15,14,13)]/35">{p.category}</span>
                  <span className="text-xs text-[rgb(15,14,13)]/30 font-mono">{p.year}</span>
                  <span className="text-[rgb(15,14,13)]/30 text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </div>
              </Link>
            ))}
            {/* Last border */}
            <div className="border-t border-[rgb(15,14,13)]/10" />
          </div>
        </div>
      </section>
    </main>
  );
}
