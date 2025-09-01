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

const sidebarStatusSlice: StateCreator<sidebarStatusState & sidebarStatusActions> = (set) => ({
	size: 240,
	isMinimalistic: false,
	isMainMenuMinimalistic: true,
	
	setSize: (size: number) => {
		if (size <= 60)
			set({ isMinimalistic: true });
		
		set({ size })
	},
	
	setIsMinimalistic: (isMinimalistic: boolean) => set({
		isMinimalistic
	}),
	
	setIsMainMenuMinimalistic: (isMainMenuMinimalistic: boolean) => set({
		isMainMenuMinimalistic
	}),
	
	resetSidebar: () => set({
		isMainMenuMinimalistic: true,
		isMinimalistic: false,
		size: 240,
	}),
})

export const useSidebarStatus = create<sidebarStatusState & sidebarStatusActions>(sidebarStatusSlice);