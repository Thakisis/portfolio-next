import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useState } from "react";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode";
import { ao } from "three/examples/jsm/tsl/display/GTAONode";
import { smaa } from "three/examples/jsm/tsl/display/SMAANode";
import { ssr } from "three/examples/jsm/tsl/display/SSRNode";
import * as TSL from "three/tsl";
import * as THREE from "three/webgpu";

export function Effects() {
  const { gl, scene, camera } = useThree();
  const [postProcessing] = useState(() => new THREE.PostProcessing(gl));
  // Configure passes
  useLayoutEffect(() => {
    const scenePass = TSL.pass(scene, camera, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
    });
    scenePass.setMRT(
      TSL.mrt({
        output: TSL.output,
        normal: TSL.directionToColor(TSL.normalView),
        metalrough: TSL.vec2(TSL.metalness, TSL.roughness),
      }),
    );
    const scenePassColor = scenePass.getTextureNode("output");
    const scenePassNormal = scenePass.getTextureNode("normal");
    const scenePassDepth = scenePass.getTextureNode("depth");
    const scenePassMetalRough = scenePass.getTextureNode("metalrough");
    const sceneNormal = TSL.sample((uv) =>
      TSL.colorToDirection(scenePassNormal.sample(uv)),
    );
    const ssrPass = ssr(
      scenePassColor,
      scenePassDepth,
      sceneNormal,
      scenePassMetalRough.r,
      scenePassMetalRough.g,
    );
    ssrPass.maxDistance.value = 10;
    ssrPass.blurQuality.value = 1;
    ssrPass.thickness.value = 0.1;
    ssrPass.resolutionScale = 1;
    //const aoPass = ao(scenePassDepth, sceneNormal, camera);
    //aoPass.radius = 2;
    //aoPass.scale = 1;
    //aoPass.thickness = 10;
    //const bloomPass = bloom(scenePassColor, 0.1, 0.5, 0.9);
    //const blendPassAO = aoPass.getTextureNode().mul(scenePassColor);

    const outputNode = TSL.blendColor(scenePassColor, ssrPass);
    postProcessing.outputNode = outputNode;
  }, [scene, camera, postProcessing]);
  // Take over render queue
  useFrame(() => postProcessing.render(), 1);
  return null;
}
