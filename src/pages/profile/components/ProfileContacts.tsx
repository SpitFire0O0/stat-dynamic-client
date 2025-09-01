import React from "react";
import { Badge } from "@chakra-ui/react";
import { MessageCircle } from "lucide-react";

export interface ContactItem {
  type: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface ProfileContactsProps {
  contacts: ContactItem[];
}

export const ProfileContacts: React.FC<ProfileContactsProps> = ({ contacts }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-lg font-bold text-[var(--primary-color)] mb-4 flex items-center gap-2">
      <MessageCircle size={20} />
      Контакты
    </h2>
    <div className="space-y-3">
      {contacts.map((contact, index) => (
        <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
          <contact.icon size={16} className="text-[var(--primary-color)]" />
          <div>
            <div className="text-xs text-gray-500">{contact.type}</div>
            <div className="text-sm font-medium">{contact.value}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
