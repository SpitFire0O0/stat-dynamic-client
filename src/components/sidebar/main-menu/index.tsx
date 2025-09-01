import React, {useState} from "react";
import module from "./main-menu.module.css";
import {
	ArrowLeftFromLine,
	ArrowRightFromLine,
} from "lucide-react";
import {MainMenuItem} from "./main-menu-item.tsx";
import clsx from "clsx";
import {CompanyLogo} from "../../decors";
import {sidebar} from "../../../constants.tsx";
import {Link} from "react-router-dom";
import {useSidebarStatus} from "../../../store/sidebar-status.slice.ts";


export const MainMenu: React.FC = () => {
	const { isMainMenuMinimalistic, setIsMainMenuMinimalistic } = useSidebarStatus();
	const { size } = useSidebarStatus();
	
	return (
		<div className={clsx(
			!isMainMenuMinimalistic && "min-w-[180px]",
			module.Container,
		)}>
			<div className="flex items-center gap-2 w-full pr-[10px] hover:cursor-pointer">
				<Link to={'/'} className="w-[40px] min-h-[40px] flex items-center justify-center pl-1 pb-8">
					<CompanyLogo />
				</Link>
				{/*<div*/}
				{/*	className="bg-[var(--primary-color)] text-white w-[40px] min-h-[40px] flex items-center justify-center text-[12px] rounded-sm">LOGO*/}
				{/*</div>*/}
				{!isMainMenuMinimalistic && (
					<div className="font-bold text-[20px] leading-4 text-[var(--primary-color)]">
						<div>STAT</div><div>DYNAMIC</div>
					</div>
				)}
			</div>
			<div className={clsx(
				"w-[40px] bg-[var(--second-light-color)] h-[1px] mr-[10px]",
				isMainMenuMinimalistic ? "w-[40px]" : "w-[160px]",
			)}/>
			<div className="flex flex-col justify-between h-full">
				<div className="flex flex-col gap-2 items-center">
					{sidebar?.slice(0, sidebar.length-1).map((item) => (
						<MainMenuItem
							key={item.id}
							id={item.id}
							url={item.url}
							label={item.label}
							icon={item.icon}
							isMinimalistic={isMainMenuMinimalistic}
						/>
					))}
				</div>
				<div className="flex flex-col gap-[10px]">
						<MainMenuItem
							id={sidebar[sidebar.length-1].id}
							url={sidebar[sidebar.length-1].url}
							label={sidebar[sidebar.length-1].label}
							icon={sidebar[sidebar.length-1].icon}
							isMinimalistic={isMainMenuMinimalistic}
						/>
					<div
						className={clsx(
							module.Item,
							isMainMenuMinimalistic ? "min-w-[40px]" : "min-w-[160px]",
						)}
						onClick={size >= 240 ? (() => setIsMainMenuMinimalistic(!isMainMenuMinimalistic)) : (() => {})}
					>
						{!isMainMenuMinimalistic ? (
							<><ArrowLeftFromLine size={20} />Скрыть</>
						) : <ArrowRightFromLine size={20} className={size < 240 ? "text-stone-500" : ""}/>}
					</div>
				</div>
			</div>
		</div>
	)
}