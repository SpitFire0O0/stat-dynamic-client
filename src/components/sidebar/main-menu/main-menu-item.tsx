import {JSX, FC} from "react";
import {Link} from "react-router-dom";
import module from "./main-menu.module.css";
import {useActiveMenuStore} from "../../../store/active-menu.slice.ts";
import clsx from "clsx";
import {useSidebarStatus} from "../../../store/sidebar-status.slice.ts";

interface Props {
	label: string,
	url: string,
	icon: JSX.Element,
	key?: number,
	id: number,
	isMinimalistic: boolean,
}

export const MainMenuItem: FC<Props> = ({
	label,
	url,
	icon,
	id,
	isMinimalistic
}) => {
	const {activeMenuIndex, setActiveMenuIndex} = useActiveMenuStore();
	
	return (
		<Link to={url}>
			<div
				className={clsx(
					module.Item,
					activeMenuIndex === id ? "after:block" : "after:hidden",
					isMinimalistic ? "min-w-[40px] after:left-[19px]" : "min-w-[160px] after:left-[139px]",
				)}
				onClick={() => setActiveMenuIndex(id)}
			>
				{icon}
				<span className={isMinimalistic ? "hidden" : ""}>{label}</span>
			</div>
		</Link>
	)
}