import React from "react";
import {LinearGround} from "../../components/decors";
import {Link} from "react-router-dom";

export const ErrorPage: React.FC = ()  => {
	return (
		<div className="flex items-center h-[100vh]">
			<div className="flex justify-between items-center w-full h-[180px] bg-[var(--primary-color)]">
				<LinearGround
					className={"w-[200px] h-[100%]"}
					deg={-45}
					firstLineColor={"var(--light-color)"}
					secondLineColor={"transparent"}
				/>
				<div className="text-[var(--light-color)] font-[700] flex flex-col items-center leading-none">
					<div className="text-[96px]">404</div>
					<div className="text-[38px]">ОШИБКА</div>
					<Link to={"/"} className="mt-2 font-[300] underline">На главную</Link>
				</div>
				<LinearGround
					className={"w-[200px] h-[100%]"}
					deg={-45}
					firstLineColor={"var(--light-color)"}
					secondLineColor={"transparent"}
				/>
			</div>
		</div>
	)
}
