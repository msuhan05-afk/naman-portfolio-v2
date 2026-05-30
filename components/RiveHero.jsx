"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const RiveScene = dynamic(() => import("@/components/RiveScene"), { ssr: false });

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Full-bleed dark section showcasing a Rive animation
// Swap src to any .riv file you export from rive.app
export default function RiveHero({ src = "/rive/vehicles.riv", stateMachine, label = "Rive Animation" }) {
  const rootRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".rh-canvas",
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1.4, ease: "expo.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" } }
    );
    gsap.fromTo(".rh-label",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" } }
    );
  }, { scope: rootRef });

  return (
    <section ref={rootRef}
      className="relative section-dark overflow-hidden py-0">

      {/* Gradient ambient — purple/pink/orange from logo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-1/2 h-full"
          style={{ background: "radial-gradient(ellipse at 10% 50%, rgba(139,43,226,0.18) 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div className="absolute right-0 top-0 w-1/2 h-full"
          style={{ background: "radial-gradient(ellipse at 90% 50%, rgba(245,166,35,0.12) 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div className="absolute inset-x-0 bottom-0 h-1/2"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,61,127,0.10) 0%, transparent 60%)", filter: "blur(60px)" }} />
      </div>

      {/* Rive canvas — full width, tall */}
      <div className="rh-canvas relative z-10 w-full"
        style={{ height: "clamp(420px, 55vw, 720px)" }}>
        <RiveScene
          src={src}
          stateMachine={stateMachine}
          className="w-full h-full"
        />
      </div>

      {/* Label */}
      <div className="rh-label relative z-10 px-6 md:px-10 py-6 flex items-center justify-between border-t border-bone/[0.07]">
        <span className="text-[10px] uppercase tracking-[0.32em] text-bone/30">{label}</span>
        <span className="text-[10px] uppercase tracking-[0.32em] text-bone/20">
          Drop your .riv into public/rive/
        </span>
      </div>
    </section>
  );
}
