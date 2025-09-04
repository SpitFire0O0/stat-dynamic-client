import { Outlet } from "react-router-dom";
import React, {useEffect} from "react";
import { Sidebar } from "../";
import {LinearGround} from "../decors";
import { DevPanel } from "../dev/dev-panel";
import {Splitter} from "antd";
import {useSidebarStatus} from "../../store/sidebar-status.slice.ts";

export const Layout: React.FC = () => {
	const { size, setSize, isMainMenuMinimalistic, setIsMainMenuMinimalistic } = useSidebarStatus();
	
	const sidebarChangeSize = (size: number): void => {
		localStorage.setItem("sidebar-size", size.toString());
		setSize(size);
	}
	
	useEffect(() => {
		const sidebarHotkeyEvent = (e) => {
			switch (e.key) {
				case "`": {
					e.preventDefault();
					sidebarChangeSize(size <= 120 ? 400 : 120);
				}
				
				case "Tab": {
					e.preventDefault();
					setIsMainMenuMinimalistic(!isMainMenuMinimalistic);
				}
			}
		}
		window.addEventListener("keydown", sidebarHotkeyEvent);
		
		return () => window.removeEventListener("keydown", sidebarHotkeyEvent);
	}, [size, isMainMenuMinimalistic])
	
	return (
		<div className="flex h-full w-full">
			<DevPanel />
			<Splitter
				layout="horizontal"
				onResize={(sizes: number[]) => sidebarChangeSize(sizes[0])}
			>
				<Splitter.Panel
					defaultSize={localStorage.getItem("sidebar-size") ? parseInt(localStorage.getItem("sidebar-size")!) : 280}
					min={isMainMenuMinimalistic ? 124 : 244}
					max={400}
					size={size}
				>
					<Sidebar />
				</Splitter.Panel>
				<Splitter.Panel
					className={"flex"}
				>
					<LinearGround
						className={"w-[40px] h-[100%]"}
						style={{
							borderRight: `1px solid var(--second-light-color)`,
						}}
						deg={-45}
						firstLineColor={"var(--primary-color)"}
						secondLineColor={"transparent"}
					/>
					<div className="w-full">
						<Outlet />
					</div>
					<LinearGround
						className={"w-[40px] h-[100%]"}
						style={{
							borderLeft: `1px solid var(--second-light-color)`,
						}}
						deg={-45}
						firstLineColor={"var(--primary-color)"}
						secondLineColor={"transparent"}
					/>
			</Splitter.Panel>
			</Splitter>
		</div>
	)
}
