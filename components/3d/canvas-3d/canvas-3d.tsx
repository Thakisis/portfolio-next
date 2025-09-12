import { Canvas } from "@react-three/fiber";
import { Controls } from "@/3d/controls";
import { Env } from "@/3d/env";
import { MainScene } from "@/3d/scene/main-scene";
import useThreeStore from "@/store";

function Canvas3d() {
  const { setThreeParam } = useThreeStore((state) => state.actions);

  return (
    <Canvas
      shadows
      gl={{ preserveDrawingBuffer: true }}
      eventSource={document.body}
      eventPrefix="client"
      camera={{ position: [0, 0, 5], fov: 60 }}
      onCreated={setThreeParam}
    >
      <Env />
      <MainScene />
      <Controls />
      <ambientLight intensity={0.5} />
    </Canvas>
  );
}

export default Canvas3d;
