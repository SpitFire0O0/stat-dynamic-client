import React from "react";
import { Card, CardBody, HStack, Text, Select } from "@chakra-ui/react";

interface ScheduleFiltersProps {
  scheduleType: "student" | "teacher";
  selectedGroup: string;
  selectedTeacher: string;
  selectedDay: string;
  groups: string[];
  teachers: string[];
  days: string[];
  onGroupChange: (group: string) => void;
  onTeacherChange: (teacher: string) => void;
  onDayChange: (day: string) => void;
}

export const ScheduleFilters: React.FC<ScheduleFiltersProps> = ({
  scheduleType,
  selectedGroup,
  selectedTeacher,
  selectedDay,
  groups,
  teachers,
  days,
  onGroupChange,
  onTeacherChange,
  onDayChange,
}) => (
  <>
    <Card>
      <CardBody>
        <HStack spacing={4}>
          <Text fontWeight="semibold">
            {scheduleType === "student" ? "Группа/Класс:" : "Преподаватель:"}
          </Text>
          <Select 
            value={scheduleType === "student" ? selectedGroup : selectedTeacher} 
            onChange={(e) => {
              if (scheduleType === "student") {
                onGroupChange(e.target.value);
              } else {
                onTeacherChange(e.target.value);
              }
            }}
            w="200px"
          >
            {(scheduleType === "student" ? groups : teachers).map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </Select>
        </HStack>
      </CardBody>
    </Card>

    <Card>
      <CardBody>
        <HStack spacing={4}>
          <Text fontWeight="semibold">День недели:</Text>
          <Select 
            value={selectedDay} 
            onChange={(e) => onDayChange(e.target.value)}
            w="200px"
          >
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </Select>
        </HStack>
      </CardBody>
    </Card>
  </>
);
