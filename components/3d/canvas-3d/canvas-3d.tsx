import { Canvas, extend } from "@react-three/fiber";
import type { WebGPURendererParameters } from "three/src/renderers/webgpu/WebGPURenderer.js";
import * as THREE from "three/webgpu";
import { Controls } from "@/3d/controls";
import { Env } from "@/3d/env";
import { MainScene } from "@/3d/scene/main-scene";
import useThreeStore from "@/store";
import { Effects } from "../effects";

function Canvas3d() {
  const { setThreeParam } = useThreeStore((state) => state.actions);
  return (
    <Canvas
      shadows
      gl={async (props) => {
        // @ts-expect-error
        // Disabled TS Linter due to error with threejs types
        extend(THREE);
        const newProps = props as WebGPURendererParameters;
        const renderer = new THREE.WebGPURenderer({
          ...newProps,
        });
        return renderer.init().then(() => renderer);
      }}
      eventSource={document.body}
      eventPrefix="client"
      camera={{ position: [0, 0, 5], fov: 60 }}
      onCreated={setThreeParam}
      style={{ zIndex: 10, backgroundColor: "red" }}
    >
      <color attach="background" args={["#00f"]} />
      <Effects />
      <Env />
      <MainScene />
      <Controls />
      <ambientLight intensity={0.5} />
    </Canvas>
  );
}

export default Canvas3d;
