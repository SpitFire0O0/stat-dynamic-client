import React from "react";
import { Progress, Text } from "@chakra-ui/react";
import { Award } from "lucide-react";

export interface StatItem {
  label: string;
  value: number;
  color: string;
}

interface ProfileStatsProps {
  stats: StatItem[];
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-lg font-bold text-[var(--primary-color)] mb-4 flex items-center gap-2">
      <Award size={22} />
      Статистика
    </h2>
    <div className="space-y-4">
      {stats.map((stat, index) => (
        <div key={index}>
          <div className="flex justify-between text-sm mb-1">
            <span>{stat.label}</span>
            <span className="font-semibold">{stat.value}%</span>
          </div>
          <Progress value={stat.value} colorScheme={stat.color} size="sm" />
        </div>
      ))}
    </div>
  </div>
);
