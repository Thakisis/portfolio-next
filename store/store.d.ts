import type { Camera, Clock, Scene, Vector4, WebGLRenderer } from "three";
import type { WebGPURenderer } from "three/webgpu";

type Size = {
	width: number;
	height: number;
	top: number;
	left: number;
	bottom: number;
};
type GetCurrentViewport = {
	(target?: Vector4): Vector4;
	(distance?: number, target?: Vector4): Vector4;
	(camera?: Camera, target?: Vector4): Vector4;
};

export type Viewport = {
	width: number; // ancho en unidades del mundo (ej. 11.63)
	height: number; // alto en unidades del mundo (ej. 5.77)
	top: number;
	left: number;
	initialDpr: number;
	dpr: number; // devicePixelRatio
	factor: number; // pixels -> world units factor
	aspect: number;
	distance: number; // distancia de la cámara usada para calcular el viewport
	getCurrentViewport: GetCurrentViewport;
};

export type ThreeParams = {
	gl: WebGLRenderer | WebGPURenderer;
	scene: Scene;
	camera: Camera;
	size: Size;
	aspect: number;
	clock: Clock;
	invalidated: boolean;
	viewport: Viewport;
};
