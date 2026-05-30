"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const LottieScene  = dynamic(() => import("@/components/LottieScene"),  { ssr: false });
const ImageTrail   = dynamic(() => import("@/components/ImageTrail").then(m => ({ default: m.ImageTrail })), { ssr: false });

// Picsum images for the trail — replace with your own photos
const TRAIL_IMAGES = [
  "https://picsum.photos/id/287/600/600",
  "https://picsum.photos/id/1001/600/600",
  "https://picsum.photos/id/1025/600/600",
  "https://picsum.photos/id/1026/600/600",
  "https://picsum.photos/id/1027/600/600",
  "https://picsum.photos/id/1028/600/600",
  "https://picsum.photos/id/1029/600/600",
  "https://picsum.photos/id/1030/600/600",
  "https://picsum.photos/id/1031/600/600",
  "https://picsum.photos/id/1032/600/600",
];

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Placeholder photo data — swap in real images
const photos = [
  { id: 1, cols: 1, rows: 2, hue: 210, sat: 18, lig: 22, caption: "London Streets" },
  { id: 2, cols: 1, rows: 1, hue:  30, sat: 20, lig: 28, caption: "Geometric Study" },
  { id: 3, cols: 2, rows: 1, hue: 180, sat: 12, lig: 20, caption: "Architecture" },
  { id: 4, cols: 1, rows: 1, hue:  50, sat: 22, lig: 25, caption: "Portrait" },
  { id: 5, cols: 1, rows: 2, hue: 340, sat: 15, lig: 22, caption: "Bokeh" },
  { id: 6, cols: 2, rows: 1, hue:  90, sat: 10, lig: 18, caption: "Nature" },
  { id: 7, cols: 1, rows: 1, hue: 260, sat: 14, lig: 20, caption: "Urban Texture" },
  { id: 8, cols: 1, rows: 1, hue:  15, sat: 25, lig: 26, caption: "Golden Hour" },
  { id: 9, cols: 1, rows: 1, hue: 200, sat: 16, lig: 24, caption: "Blue Hour" },
];

const films = [
  { title: "Urban Motion Study",   duration: "3:42", year: "2023", type: "Short Film",  hue: 220 },
  { title: "Earth Hour Campaign",  duration: "1:15", year: "2022", type: "Campaign",    hue: 120 },
  { title: "Cheesecake Reel",      duration: "0:45", year: "2022", type: "Brand Reel",  hue:  45 },
  { title: "Wild Wisdom Sequence", duration: "2:10", year: "2023", type: "Motion",      hue: 160 },
];

export default function Lens() {
  const rootRef   = useRef(null);
  const [tab, setTab] = useState("Photo");

  useGSAP(() => {
    const words = gsap.utils.toArray(".ln-word");
    gsap.set(words, { yPercent: 110, opacity: 0 });
    gsap.to(words, { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.06, ease: "expo.out", delay: 0.2 });
    gsap.fromTo(".ln-meta", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.1 });

    gsap.utils.toArray(".reveal-y").forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" } }
      );
    });

    // Staggered photo grid reveal
    gsap.fromTo(".photo-cell",
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.9, ease: "expo.out", stagger: 0.06,
        scrollTrigger: { trigger: ".photo-grid", start: "top 85%" } }
    );

    // Film cards
    gsap.fromTo(".film-card",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: ".film-grid", start: "top 85%" } }
    );
  }, { scope: rootRef });

  return (
    <main ref={rootRef}>
      {/* ── Hero — dark, full-bleed ImageTrail ── */}
      <section className="section-dark relative overflow-hidden" style={{ height: "100svh" }}>

        {/* ImageTrail fills the full hero */}
        <div className="absolute inset-0 z-10">
          <ImageTrail items={TRAIL_IMAGES} variant={3} threshold={70} />
        </div>

        {/* Ghost text */}
        <div className="absolute bottom-0 left-0 pointer-events-none select-none overflow-hidden"
          style={{ fontSize: "clamp(5rem, 16vw, 16rem)", lineHeight: 0.85, fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700, color: "rgba(237,232,208,0.03)", letterSpacing: "-0.05em" }}>
          LENS
        </div>

        {/* Heading overlaid bottom-left, above trail */}
        <div className="absolute bottom-[10vh] left-6 md:left-10 z-20 pointer-events-none">
          <p className="ln-meta text-[10px] uppercase tracking-[0.32em] text-bone/40 mb-4">Photography & Film</p>
          <h1 className="font-display font-semibold text-bone leading-[0.9] tracking-tightest"
            style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}>
            <span className="word-clip" style={{ display: "inline-block" }}>
              <span className="ln-word inline-block">Lens</span>
            </span>
          </h1>
        </div>

        {/* Hint */}
        <p className="ln-meta absolute bottom-6 right-6 md:right-10 z-20 text-[10px] uppercase tracking-[0.28em] text-bone/25 pointer-events-none">
          Move to reveal
        </p>
      </section>

      {/* ── Tab toggle ── */}
      <section className="section-light px-6 md:px-10 pt-16 pb-0">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex gap-1 border-b border-[rgb(15,14,13)]/10">
            {["Photo", "Film"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-6 py-3 text-[11px] uppercase tracking-[0.24em] border-b-2 transition-all duration-300
                  ${tab === t
                    ? "border-[rgb(15,14,13)] text-[rgb(15,14,13)]"
                    : "border-transparent text-[rgb(15,14,13)]/35 hover:text-[rgb(15,14,13)]/65"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo grid ── */}
      {tab === "Photo" && (
        <section className="section-light px-6 md:px-10 py-12 md:py-16">
          <div className="max-w-[1440px] mx-auto">
            {/* Masonry-style CSS grid */}
            <div className="photo-grid grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3">
              {photos.map((p) => (
                <PhotoCell key={p.id} p={p} />
              ))}
            </div>

            <p className="reveal-y mt-8 text-[10px] uppercase tracking-[0.28em] text-[rgb(15,14,13)]/30 text-center">
              Placeholder images — add real photos to public/photos/
            </p>
          </div>
        </section>
      )}

      {/* ── Film grid ── */}
      {tab === "Film" && (
        <section className="section-light px-6 md:px-10 py-12 md:py-16">
          <div className="max-w-[1440px] mx-auto">
            <div className="film-grid grid md:grid-cols-2 gap-6">
              {films.map((f) => (
                <FilmCard key={f.title} f={f} />
              ))}
            </div>

            <p className="reveal-y mt-8 text-[10px] uppercase tracking-[0.28em] text-[rgb(15,14,13)]/30 text-center">
              Placeholder cards — add YouTube/Vimeo embeds
            </p>
          </div>
        </section>
      )}

      {/* ── Lottie divider ── */}
      <section className="section-dark px-6 md:px-10 py-20 flex justify-center border-t border-bone/[0.07]">
        <div className="flex flex-col items-center gap-6">
          <LottieScene src="/lottie/orbit.json" className="w-[160px] h-[160px] opacity-50" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-bone/30">Naman Mehra · Lens</p>
        </div>
      </section>
    </main>
  );
}

function PhotoCell({ p }) {
  const [hovered, setHovered] = useState(false);
  const style = {
    background: `hsl(${p.hue}, ${p.sat}%, ${p.lig}%)`,
    gridColumn: `span ${p.cols}`,
    gridRow: `span ${p.rows}`,
  };

  return (
    <div
      className="photo-cell relative overflow-hidden rounded-sm cursor-pointer"
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient texture */}
      <div className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, transparent 40%, hsl(${p.hue},${p.sat + 10}%,${p.lig - 8}%) 100%)`,
          opacity: hovered ? 0.8 : 0.4,
        }} />

      {/* Caption on hover */}
      <div className={`absolute inset-0 flex items-end p-4 transition-opacity duration-400 ${hovered ? "opacity-100" : "opacity-0"}`}>
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/70">{p.caption}</p>
      </div>

      {/* Expand icon */}
      <div className={`absolute top-3 right-3 text-white/40 text-xs transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
        ⊕
      </div>
    </div>
  );
}

function FilmCard({ f }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="film-card group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail placeholder */}
      <div className="relative w-full aspect-video rounded-sm overflow-hidden mb-4"
        style={{ background: `hsl(${f.hue}, 15%, 18%)` }}>
        <div className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 40% 50%, hsl(${f.hue},25%,30%) 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0.5,
          }} />

        {/* Play button */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${hovered ? "scale-110" : "scale-100"}`}>
          <div className="w-14 h-14 rounded-full border border-white/25 flex items-center justify-center">
            <span className="text-white/70 text-lg ml-1">▶</span>
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-white/70 font-mono">
          {f.duration}
        </div>
      </div>

      {/* Film meta */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[rgb(15,14,13)]/35 mb-1">{f.type}</p>
          <h3 className="font-display font-semibold text-[rgb(15,14,13)] text-lg tracking-tight group-hover:text-amber transition-colors duration-300">
            {f.title}
          </h3>
        </div>
        <span className="text-xs text-[rgb(15,14,13)]/30 font-mono mt-1">{f.year}</span>
      </div>
    </div>
  );
}
