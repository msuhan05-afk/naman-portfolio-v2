"use client";
import { useEffect } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

export default function RiveScene({
  src,
  stateMachine,
  animationName,
  className = "",
  style = {},
}) {
  const { rive, RiveComponent } = useRive({
    src,
    autoplay: true,
    stateMachines: stateMachine  || undefined,
    animations:    animationName || undefined,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });

  // Explicitly play once the Rive instance is ready
  useEffect(() => {
    if (rive) rive.play();
  }, [rive]);

  return (
    <RiveComponent
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    />
  );
}
