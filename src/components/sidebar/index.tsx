import React from "react";
import { MainMenu } from "./main-menu";
import { SubMenu } from "./sub-menu";
import { ProfileBar } from "./profile-bar";
import {PathBar} from "./path-bar";

const paths = [
	{ name: "Home", link: "/" },
	{ name: "Profile", link: "/profile" },
	{ name: "Settings", link: "/settings" },
]

export const Sidebar: React.FC = () => {
	return (
		<div className="flex flex-col h-full justify-between shadow-xl overflow-hidden">
			<div className="flex [&>*]:bg-white h-full border-2">
				<MainMenu />
				<SubMenu />
			</div>
			<div>
				<PathBar paths={paths} />
				<ProfileBar />
			</div>
		</div>
	)
}
