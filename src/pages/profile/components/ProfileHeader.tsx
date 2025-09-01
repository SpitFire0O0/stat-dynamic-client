import React from "react";
import { Avatar, Badge } from "@chakra-ui/react";
import { Phone, Mail, MapPin } from "lucide-react";
import { HorizontalSep } from "../../../components/decors";
import module from "../profile.module.css";

export interface ProfileHeaderProps {
  name: string;
  role: string;
  avatar: string;
  phone: string;
  email: string;
  address: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  role,
  avatar,
  phone,
  email,
  address,
}) => (
  <div className={module.HeaderContainer}>
    <div className={module.Header}>
      <div className={module.MainInfo}>
        <Avatar name={name} src={avatar} width={150} height={150} />
        <div className="mt-[48px] leading-5 flex flex-col gap-2">
          <div className="bg-[var(--primary-color)] w-fit py-0.5 px-2 rounded-sm cursor-pointer font-[500] uppercase tracking-[2px] text-[var(--light-color)] text-[10px]">
            {role}
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-[170px] py-[10px] px-[20px] leading-5">
        <div>
          <div className="text-[var(--primary-color)] font-[800] text-[22px]">{name}</div>
          <div className="text-[#aaa] font-[800] text-[14px]">10Б</div>
        </div>
        <HorizontalSep className={"mt-[10px]"} />
        <table className={module.HeaderInfo}>
          <tr>
            <td>
              <Phone size={14} /> телефон
            </td>
            <td>{phone}</td>
          </tr>
          <tr>
            <td>
              <Mail size={14} /> почта
            </td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>
              <MapPin size={14} /> адрес
            </td>
            <td>{address}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
);
