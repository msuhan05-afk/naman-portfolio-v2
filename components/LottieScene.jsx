"use client";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function LottieScene({ src, className = "", loop = true, autoplay = true }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop,
      autoplay,
      path: src,
    });
    return () => anim.destroy();
  }, [src, loop, autoplay]);

  return <div ref={container} className={className} aria-hidden="true" />;
}
