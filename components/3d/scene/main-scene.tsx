import { useFrame } from "@react-three/fiber";
import { useLenis } from "lenis/react";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";
import { add, mix, positionLocal, smoothstep, uniform } from "three/tsl";
import { Color, MeshPhysicalNodeMaterial } from "three/webgpu";
export function MainScene() {
  const cubeRef = useRef<Mesh | null>(null);
  const progressRef = useRef<number>(0);
  const totalScroll = useRef<number>(0);
  useLenis(({ scroll, limit }: { scroll: number; limit: number }) => {
    progressRef.current = limit > 0 ? scroll / limit : 0;
    totalScroll.current = limit;
  });
  const progress = useRef(uniform(0));
  const colorA = useRef(uniform(new Color("white")));
  const colorB = useRef(uniform(new Color("black")));
  const material = useMemo(() => {
    const mat = new MeshPhysicalNodeMaterial({
      metalness: 1,
      roughness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0,
    });
    const yNorm = add(positionLocal.y, 0.5);
    const epsilon = 0.000001;
    const edge0 = progress.current.sub(epsilon);
    const edge1 = progress.current.add(epsilon);

    // smoothstep gives us a thin but robust transition
    const mask = smoothstep(edge0, edge1, yNorm);
    const finalColor = colorA.current
      .mul(mask.oneMinus())
      .add(colorB.current.mul(mask));
    mat.colorNode = mix(colorA.current, colorB.current, finalColor);
    return mat;
  }, []);

  useFrame((_, delta) => {
    if (cubeRef.current && progressRef.current) {
      const targetRotation = progressRef.current * Math.PI * 2;

      cubeRef.current.rotation.x +=
        (targetRotation - cubeRef.current.rotation.x) * 5 * delta;
      cubeRef.current.rotation.y +=
        (targetRotation - cubeRef.current.rotation.y) * 5 * delta;
      progress.current.value = progressRef.current;
    }
  });

  return (
    <mesh ref={cubeRef} material={material} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}
