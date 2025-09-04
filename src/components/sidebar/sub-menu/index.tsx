import React, {useEffect, useLayoutEffect, useRef} from "react";
import module from "./sub-menu.module.css";
import {SubMenuItem} from "./sub-menu-item.tsx";
import {useActiveMenuStore} from "../../../store/active-menu.slice.ts";
// import type { ISubMenuItem } from "../../../constants.tsx";
import { getSidebar } from "../../../lib/nav";
import { useAuthStore } from "../../../store/auth.store";
import {useSidebarStatus} from "../../../store/sidebar-status.slice.ts";

export const SubMenu: React.FC = () => {
	const { activeMenuIndex } = useActiveMenuStore();
	const { size, isMinimalistic, setIsMinimalistic, isMainMenuMinimalistic } = useSidebarStatus();
	const { user } = useAuthStore();
	const role = (user?.permissions ?? 'STUDENT') as any;
	const sidebar = getSidebar(role);
	
	const parentRef = useRef<HTMLDivElement | null>(null);
	
	useLayoutEffect(() => {
		const updateVisibility = () => {
			if (parentRef.current)
				setIsMinimalistic(isMainMenuMinimalistic ? size <= 250 : size < 320)
		}
		
		updateVisibility();
		
		window.addEventListener("resize", updateVisibility);
		return () => window.removeEventListener("resize", updateVisibility);
	}, [setIsMinimalistic, size, activeMenuIndex, isMainMenuMinimalistic]);
	
	return (
		<div className={module.Container} ref={parentRef}>
			<div className={module.Navbar}>
				<span className={isMinimalistic ? "hidden" : ""}>{sidebar[activeMenuIndex].label}</span>
				<span>{sidebar[activeMenuIndex].icon}</span>
			</div>
			<div className="w-[calc(100%-20px)] bg-[var(--second-light-color)] h-[1px] mx-auto" />
				<div className="flex flex-col w-full pl-[10px] relative">{sidebar[activeMenuIndex].sub.map((item: any) => (
					<SubMenuItem
						key={item.id}
						icon={item.icon}
						label={item.label}
						iconHidden={isMinimalistic}
						url={item.url}
					/>
				)
			)}</div>
		</div>
	)
}
