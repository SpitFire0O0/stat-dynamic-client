import React, {useEffect, useRef} from "react";
import module from "./sub-menu.module.css";
import {SubMenuItem} from "./sub-menu-item.tsx";
import {useActiveMenuStore} from "../../../store/active-menu.slice.ts";
import {ISubMenuItem, sidebar} from "../../../constants.tsx";
import {useSidebarStatus} from "../../../store/sidebar-status.slice.ts";

export const SubMenu: React.FC = () => {
	const { activeMenuIndex } = useActiveMenuStore();
	const { size, isMinimalistic, setIsMinimalistic, isMainMenuMinimalistic } = useSidebarStatus();
	
	const parentRef = useRef<HTMLDivElement | null>(null);
	
	useEffect(() => {
		const updateVisibility = () => {
			if (parentRef.current)
				setIsMinimalistic(parentRef.current?.offsetWidth < 160);
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
			<div className="flex flex-col w-full pl-[10px] relative">{sidebar[activeMenuIndex].sub.map((item: ISubMenuItem) => (
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