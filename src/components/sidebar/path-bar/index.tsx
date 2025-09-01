import React from "react";
import {ChevronRight} from "lucide-react";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink} from "@chakra-ui/react";
import module from "./path-bar.module.css";
import {useSidebarStatus} from "../../../store/sidebar-status.slice.ts";

interface Path {
	link: string;
	name: string;
}

interface Props {
	paths: Path[];
}

export const PathBar: React.FC<Props> = ({ paths }) => {
	const { size } = useSidebarStatus();
	
	return (
		<div className={module.Container}>
			<Breadcrumb
				spacing='8px'
				separator={<ChevronRight size={12}/>}
			>
				{(
					size > 250 ? paths
						: size > 140 ? paths.slice(paths.length-2)
						: paths.slice(paths.length-1)).map((path: Path) => (
					<BreadcrumbItem key={path.link}>
						<BreadcrumbLink href={path.link}>{path.name}</BreadcrumbLink>
					</BreadcrumbItem>
				))}
			</Breadcrumb>
		</div>
	)
}