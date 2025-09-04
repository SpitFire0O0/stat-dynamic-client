import type {StateCreator} from "zustand/vanilla";
import {create} from "zustand/react";

type sidebarStatusState = {
	size: number;
	isMinimalistic: boolean;
	isMainMenuMinimalistic: boolean;
}

type sidebarStatusActions = {
	setSize: (size: number) => void;
	setIsMinimalistic: (isMinimalistic: boolean) => void;
	resetSidebar: () => void;
	setIsMainMenuMinimalistic: (isMainMenuMinimalistic: boolean) => void;
}

const sidebarStatusSlice: StateCreator<sidebarStatusState & sidebarStatusActions> = (set, get) => ({
	isMinimalistic: false,
	isMainMenuMinimalistic: localStorage.getItem("isMainMenuMinimalistic")
		? ( localStorage.getItem("sidebar-size") === "true" ) : true,
	size: localStorage.getItem("sidebar-size") ? parseInt(localStorage.getItem("sidebar-size")!) : 280,
	
	setSize: (size: number) => {
		const { isMainMenuMinimalistic }: boolean = get();
		
		if ((isMainMenuMinimalistic && size <= 60) || (!isMainMenuMinimalistic && size <= 240))
			set({ isMinimalistic: true });
		
		set({ size })
	},
	
	setIsMinimalistic: (isMinimalistic: boolean) => set({ isMinimalistic }),
	
	setIsMainMenuMinimalistic: (isMainMenuMinimalistic: boolean) => {
		localStorage.setItem("isMainMenuMinimalistic", String(isMainMenuMinimalistic))
		
		set({ isMainMenuMinimalistic })
	},
	
	resetSidebar: () => set({
		isMainMenuMinimalistic: true,
		isMinimalistic: false,
		size: 280,
	}),
})

export const useSidebarStatus = create<sidebarStatusState & sidebarStatusActions>(sidebarStatusSlice);