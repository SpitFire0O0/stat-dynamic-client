import React from "react";
import clsx from "clsx";

interface Props {
	className?: string;
}

export const HorizontalSep: React.FC<Props> = ({ className }) => {
	return <div className={clsx(
		className,
		"w-full bg-[var(--second-light-color)] h-[1px] mx-auto",
	)}/>
}