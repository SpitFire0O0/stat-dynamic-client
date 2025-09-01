import React from "react";

interface Props {
	value: number
}

export const NotifyIcon: React.FC<Props> = ({ value }) => {
	return <div className="
		absolute left-5 top-5 bg-[var(--danger-color)] w-[16px] h-[16px] rounded-xl text-[10px]
		flex justify-center items-center text-[var(--light-color)] cursor-pointer
	">{value}</div>
}