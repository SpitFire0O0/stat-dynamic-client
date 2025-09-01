import React from "react";
import module from "./company-logo.module.css";

export const CompanyLogo: React.FC = () => {
	return (
		<div className={module.Container}>
			<div className={module.FirstFigure}/>
			<div className={module.SecondFigure}/>
			<div className={module.Pointer}/>
		</div>
	)
}