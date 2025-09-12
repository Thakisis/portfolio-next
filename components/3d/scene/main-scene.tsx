import { useFrame } from "@react-three/fiber";
import { useLenis } from "lenis/react";
import { useRef } from "react";
import type { Mesh } from "three";

export function MainScene() {
  const cubeRef = useRef<Mesh>(null!);
  const progressRef = useRef<number>(0);

  // Escuchamos Lenis y guardamos el progreso normalizado [0,1]
  useLenis(({ scroll, limit }: { scroll: number; limit: number }) => {
    progressRef.current = limit > 0 ? scroll / limit : 0;
  });

  useFrame((_, delta) => {
    if (cubeRef.current) {
      const targetRotation = progressRef.current * Math.PI * 2; // una vuelta completa
      // Interpolamos suavemente hacia el valor objetivo
      cubeRef.current.rotation.x +=
        (targetRotation - cubeRef.current.rotation.x) * 5 * delta;
      cubeRef.current.rotation.y +=
        (targetRotation - cubeRef.current.rotation.y) * 5 * delta;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color="black"
        metalness={1}
        roughness={0}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </mesh>
  );
}
