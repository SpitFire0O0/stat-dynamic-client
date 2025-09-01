import type {StateCreator} from "zustand/vanilla";
import {create} from "zustand/react";

type activeMenuState = {
	activeMenuIndex: number;
	activeSubMenuIndex: number;
}

type activeMenuActions = {
	setActiveMenuIndex: (index: number) => void;
	resetActiveMenuIndex: () => void;
	setActiveSubMenuIndex: (index: number) => void;
	resetActiveSubMenuIndex: () => void;
}

const activeMenuSlice: StateCreator<activeMenuState & activeMenuActions> = (set) => ({
	// main menu
	activeMenuIndex: localStorage.getItem("active-menu-index") ? parseInt(localStorage.getItem("active-menu-index")!) : 0,
	setActiveMenuIndex: (index) => {
		localStorage.setItem("active-menu-index", index.toString());
		set({ activeMenuIndex: index })
	},
	resetActiveMenuIndex: () => set({ activeMenuIndex: 0 }),
	
	// sub menu
	activeSubMenuIndex: localStorage.getItem("active-sub-menu-index") ? parseInt(localStorage.getItem("active-sub-menu-index")!) : 0,
	setActiveSubMenuIndex: (index) => {
		localStorage.setItem("active-sub-menu-index", index.toString());
		set({ activeMenuIndex: index })
	},
	resetActiveSubMenuIndex: () => set({ activeMenuIndex: 0 }),
})

export const useActiveMenuStore = create<activeMenuState & activeMenuActions>(activeMenuSlice);