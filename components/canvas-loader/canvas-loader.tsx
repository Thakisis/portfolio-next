"use client";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("@/components/3d/canvas-3d"), {
  ssr: false,
});
export function CanvasLoader() {
  return (
    <div className="fixed inset-0 z-2">
      <Canvas />
    </div>
  );
}
