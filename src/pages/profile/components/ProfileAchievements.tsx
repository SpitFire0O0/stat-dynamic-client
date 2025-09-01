import React from "react";
import { Badge } from "@chakra-ui/react";
import { Trophy } from "lucide-react";

export interface AchievementItem {
  id: number;
  title: string;
  description: string;
  grade: number;
  date: string;
}

interface ProfileAchievementsProps {
  achievements: AchievementItem[];
}

export const ProfileAchievements: React.FC<ProfileAchievementsProps> = ({ achievements }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-lg font-bold text-[var(--primary-color)] mb-4 flex items-center gap-2">
      <Trophy size={20} />
      Достижения
    </h2>
    <div className="space-y-3">
      {achievements.map((achievement) => (
        <div key={achievement.id} className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded border-l-4 border-[var(--primary-color)]">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-sm">{achievement.title}</h3>
            <Badge colorScheme="green" variant="subtle" fontSize="xs">
              {achievement.grade}%
            </Badge>
          </div>
          <p className="text-xs text-gray-600 mb-1">{achievement.description}</p>
          <span className="text-xs text-gray-500">{achievement.date}</span>
        </div>
      ))}
    </div>
  </div>
);
