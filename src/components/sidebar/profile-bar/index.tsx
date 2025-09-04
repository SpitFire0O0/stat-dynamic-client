import React from "react";
import module from "./profile-bar.module.css";
import {ProfileBarBtn} from "./profile-bar-btn.tsx";
import {Bell, Bolt} from "lucide-react";
import {Avatar} from "@chakra-ui/react";
import {NotifyIcon} from "../../notify-icon";
import {Link} from "react-router-dom";
import {useActiveMenuStore} from "../../../store/active-menu.slice.ts";
import clsx from "clsx";
import {useSidebarStatus} from "../../../store/sidebar-status.slice.ts";

export const ProfileBar: React.FC = () => {
	const { setActiveMenuIndex } = useActiveMenuStore();
	const { size }: number = useSidebarStatus();

	return (
		<div className={module.Container}>
			<div className="justify-start">
				<Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' className="max-w-[40px] max-h-[40px]" />
			</div>
			<div className="justify-between">
				<Link
					to={'/profile'}
					className={clsx("text-[14px] uppercase cursor-pointer", size < 250 ? "hidden" : "")}
					onClick={() => setActiveMenuIndex(1)}
				>
					А. Дмитрий
				</Link>
				<div className="flex gap-[10px]">
					<div className="relative">
						<ProfileBarBtn
							onClick={() => console.log('notify')}
							icon={<Bell size={16}/>}
						/>
						<NotifyIcon value={2}/>
					</div>
					{size > 160 ? (
						<Link to={'profile/settings'}>
							<ProfileBarBtn
								onClick={() => console.log('settings')}
								icon={<Bolt size={16}/>}
							/>
						</Link>
					) : ""}
				</div>
			</div>
		</div>
	);
};