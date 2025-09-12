import { Environment } from "@react-three/drei";
import { Suspense } from "react";

export function Env() {
  return (
    <Suspense>
      <Environment preset="city" background />
    </Suspense>
  );
}
