import React, {type JSX} from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {useActiveMenuStore} from "../../../store/active-menu.slice.ts";

interface Props {
	key?: number,
	id: number,
	icon: JSX.Element,
	label: string,
	iconHidden: boolean,
	url?: string
}

export const SubMenuItem: React.FC<Props> = ({id, icon, label, iconHidden, url}) => {
	const {activeSubMenuIndex, setActiveSubMenuIndex} = useActiveMenuStore();
	
	const content = (
		<div className={clsx(
			"flex gap-4 p-2 w-full items-center uppercase text-sm text-[var(--primary-color)] rounded-l-[4px] " +
			"transition-all transition-300 hover:bg-[var(--primary-light-color)] hover:[&>span]:pl-1 cursor-pointer",
			activeSubMenuIndex === id ? "bg-[var(--primary-light-color)]" : "",
		)}>
			{icon}
			<span className={clsx(
				"transition-all font-[600] text-[12px]",
				iconHidden ? "hidden" : ""
			)}>{label}</span>
		</div>
	);

	if (url)
		return <Link to={url} onClick={() => setActiveSubMenuIndex(id)}>{content}</Link>;
	

	return content;
}