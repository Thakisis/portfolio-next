import type { RootState } from "@react-three/fiber";
import { create } from "zustand";
import type { ThreeParams } from "./store.d";

interface Store {
	threeParams: Partial<RootState> | null;
	actions: {
		setThreeParam: (threeParams: RootState) => void;
	};
}

const useThreeStore = create<Store>((set, get) => ({
	threeParams: null,
	actions: {
		setThreeParam(threeParams: RootState) {
			const { gl, scene, camera, size, clock, viewport } = threeParams;
			set({ threeParams: { gl, scene, camera, size, clock, viewport } });
			const params = get().threeParams;
			console.log("Three params set:", params);
		},
	},
}));

export default useThreeStore;
