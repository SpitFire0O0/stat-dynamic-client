import { Outlet } from "react-router-dom";
import React from "react";
import { Sidebar } from "../";
import {LinearGround} from "../decors";
import {Splitter} from "antd";
import {useSidebarStatus} from "../../store/sidebar-status.slice.ts";

export const Layout: React.FC = () => {
	const { setSize, size, isMinimalistic } = useSidebarStatus();
	
	// Временная отладка
	console.log('Layout render:', { size, isMinimalistic });
	
	const sidebarChangeSize = (size: number): void => {
		localStorage.setItem("sidebar-size", size.toString());
		setSize(size);
	}
	
	return (
		<div className="flex h-full w-full">
			<Splitter
				layout="horizontal"
				onResize={(sizes: number[]) => sidebarChangeSize(sizes[0])}
			>
				<Splitter.Panel defaultSize={localStorage.getItem("sidebar-size") ? parseInt(localStorage.getItem("sidebar-size")!) : 280} min={124} max={400}>
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
