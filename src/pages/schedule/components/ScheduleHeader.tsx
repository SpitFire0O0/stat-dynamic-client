import React from "react";
import { Calendar } from "lucide-react";

interface ScheduleHeaderProps {
  scheduleType: "student" | "teacher";
}

export const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ scheduleType }) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-[var(--primary-color)] flex items-center gap-2">
      <Calendar size={24} />
      Расписание {scheduleType === "student" ? "студентов" : "преподавателей"}
    </h1>
    <p className="text-gray-600">Расписание занятий на неделю</p>
  </div>
);
