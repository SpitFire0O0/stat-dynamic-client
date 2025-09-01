import React from "react";

interface Props {
	className?: string;
	firstLineColor?: string;
	secondLineColor?: string;
	deg?: number;
	style?: React.CSSProperties;
}

export const LinearGround: React.FC<Props> = ({
	className,
	firstLineColor = "var(--primary-color)",
	secondLineColor = "transparent",
	deg = 45,
	style
}) => {
	return <div
		className={className}
		style={{
			background: `repeating-linear-gradient(
				${deg}deg,
				${firstLineColor},
			  ${firstLineColor} .5px,
			  ${secondLineColor} 1px,
			  ${secondLineColor} 8px
			 )`,
			...style
		}}
	/>
}