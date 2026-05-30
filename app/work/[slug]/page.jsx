"use client";
import { useRef } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProject, projects } from "@/lib/projects";
import dynamic from "next/dynamic";

const LottieScene = dynamic(() => import("@/components/LottieScene"), { ssr: false });

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CaseStudy() {
  const { slug } = useParams();
  const project  = getProject(slug);
  const rootRef  = useRef(null);

  if (!project) return notFound();

  useGSAP(() => {
    const words = gsap.utils.toArray(".cs-word");
    gsap.set(words, { yPercent: 110, opacity: 0 });
    gsap.to(words, { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.06, ease: "expo.out", delay: 0.25 });
    gsap.fromTo(".cs-meta", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.15 });
    gsap.fromTo(".cs-sub",  { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.7  });

    gsap.utils.toArray(".reveal-y").forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" } }
      );
    });

    // Section headings
    gsap.utils.toArray(".section-heading").forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" } }
      );
    });
  }, { scope: rootRef });

  // Siblings for prev/next
  const idx  = projects.findIndex(p => p.slug === slug);
  const prev = projects[idx - 1] ?? null;
  const next = projects[idx + 1] ?? null;

  return (
    <main ref={rootRef}>
      {/* ── Hero ── */}
      <section
        className="relative min-h-[100svh] flex flex-col justify-end px-6 md:px-10 pb-[12vh] overflow-hidden"
        style={{ background: project.color }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-[-10%] top-[-10%] w-[70vw] h-[70vw] rounded-full"
            style={{ background: `radial-gradient(circle, ${project.accent}30 0%, transparent 65%)`, filter: "blur(100px)" }} />
        </div>

        {/* Back */}
        <Link href="/work"
          className="cs-meta absolute top-20 left-6 md:left-10 text-[10px] uppercase tracking-[0.28em] text-white/40 hover:text-white/80 transition-colors duration-300 flex items-center gap-2">
          <span>←</span> Work
        </Link>

        <div className="relative z-10 max-w-[1440px] w-full mx-auto">
          <p className="cs-meta text-[10px] uppercase tracking-[0.32em] text-white/40 mb-8">{project.category} · {project.year}</p>

          <h1 className="font-display font-semibold text-white leading-[0.9] tracking-tightest mb-6"
            style={{ fontSize: "clamp(2.8rem, 8vw, 8.5rem)" }}>
            {project.title.split(" ").map((w, i) => (
              <span key={i} className="word-clip mr-[0.14em]" style={{ display: "inline-block" }}>
                <span className="cs-word inline-block">{w}</span>
              </span>
            ))}
          </h1>

          <div className="cs-meta mt-10 flex flex-wrap gap-6">
            {project.tags.map(t => (
              <span key={t} className="text-[10px] uppercase tracking-[0.22em] text-white/35">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case study sections ── */}
      {project.sections.map((sec, i) => (
        <section key={i}
          className={`px-6 md:px-10 py-20 md:py-28 ${i % 2 === 0 ? "section-light" : "section-dark"}`}>
          <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <h3 className={`section-heading font-display font-semibold leading-[0.92] tracking-tightest
                ${i % 2 === 0 ? "text-[rgb(15,14,13)]" : "text-bone"}`}
                style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)" }}>
                {sec.heading}
              </h3>
            </div>
            <div className="md:col-span-8">
              {/* Asset placeholder */}
              <div className={`reveal-y w-full aspect-video rounded-sm mb-8 flex items-center justify-center
                ${i % 2 === 0 ? "bg-[rgb(15,14,13)]/5" : "bg-bone/5"}`}>
                <span className={`text-[10px] uppercase tracking-[0.28em]
                  ${i % 2 === 0 ? "text-[rgb(15,14,13)]/18" : "text-bone/18"}`}>
                  Asset
                </span>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Lottie decoration break ── */}
      <section className="section-dark px-6 md:px-10 py-20 flex justify-center border-t border-bone/[0.07]">
        <LottieScene src="/lottie/wave.json" className="w-full max-w-[500px] opacity-60" />
      </section>

      {/* ── Prev / Next ── */}
      <section className="section-light px-6 md:px-10 py-16">
        <div className="max-w-[1440px] mx-auto flex justify-between gap-6">
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="group flex-1">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[rgb(15,14,13)]/35 mb-2">← Previous</p>
              <h4 className="font-display font-semibold text-[rgb(15,14,13)] text-xl md:text-2xl tracking-tight group-hover:text-amber transition-colors duration-300">{prev.title}</h4>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link href={`/work/${next.slug}`} className="group flex-1 text-right">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[rgb(15,14,13)]/35 mb-2">Next →</p>
              <h4 className="font-display font-semibold text-[rgb(15,14,13)] text-xl md:text-2xl tracking-tight group-hover:text-amber transition-colors duration-300">{next.title}</h4>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </section>
    </main>
  );
}
