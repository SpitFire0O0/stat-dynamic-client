import React from "react";
import { MessageCircle } from "lucide-react";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileStats } from "./components/ProfileStats";
import { ProfileContacts } from "./components/ProfileContacts";
import { ProfileAchievements } from "./components/ProfileAchievements";

export const ProfilePage: React.FC = () => {
  const achievements = [
    { id: 1, title: "Олимпиада по математике", description: "1 место в городской олимпиаде", grade: 95, date: "2024" },
    { id: 2, title: "Конкурс программирования", description: "2 место в региональном конкурсе", grade: 88, date: "2024" },
    { id: 3, title: "Научная конференция", description: "Лучший доклад на конференции", grade: 92, date: "2023" },
  ];

  const contacts = [
    { type: "Telegram", value: "@alexandrov_d", icon: MessageCircle },
    { type: "Discord", value: "alexandrov#1234", icon: MessageCircle },
    { type: "VK", value: "vk.com/alexandrov", icon: MessageCircle },
  ];

  const stats = [
    { label: "Посещаемость", value: 95, color: "green" },
    { label: "Средний балл", value: 4.8, color: "blue" },
    { label: "Домашние задания", value: 87, color: "orange" },
  ];

  return (
    <div className="p-6 space-y-6">
      <ProfileHeader
        name="Александров Дмитрий"
        role="Студент"
        avatar="https://bit.ly/dan-abramov"
        phone="+7 (928) 738-32-12"
        email="alexandrov.d@example.com"
        address="Россия, г. Москва, ул. Ленина, д. 17, кв. 43"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileStats stats={stats} />
        <ProfileContacts contacts={contacts} />
        <ProfileAchievements achievements={achievements} />
      </div>
    </div>
  );
};
