"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

function SmoothScrolling() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    lenis.stop();
    return lenis.start();
  }, [lenis]);
  return <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }} />;
}

export default SmoothScrolling;
