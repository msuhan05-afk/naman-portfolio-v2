"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const links = [
  { href: "/work",  label: "Work"  },
  { href: "/lens",  label: "Lens"  },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const navRef   = useRef(null);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Entrance fade-in
    gsap.fromTo(nav, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.2 });

    // Color flip when crossing from dark hero into light sections
    ScrollTrigger.create({
      trigger: ".section-light",
      start: "top 80px",
      end: "bottom 80px",
      onEnter:      () => nav.setAttribute("data-light", "true"),
      onLeaveBack:  () => nav.removeAttribute("data-light"),
      onEnterBack:  () => nav.setAttribute("data-light", "true"),
      onLeave:      () => nav.removeAttribute("data-light"),
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [pathname]);

  return (
    <>
      <nav
        ref={navRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16
          transition-colors duration-500
          data-[light]:text-[rgb(15,14,13)]
          text-[rgb(237,232,208)]"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-semibold text-sm tracking-[0.18em] uppercase link-underline"
        >
          NM
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-[11px] uppercase tracking-[0.28em] link-underline transition-opacity duration-300
                  ${pathname === href ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-[5px] w-6"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[rgb(10,10,10)] flex flex-col items-center justify-center gap-10 transition-all duration-500
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-5xl text-[rgb(237,232,208)] tracking-tightest uppercase"
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}
