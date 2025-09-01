import React from "react";
import { Grid, Card, CardBody, VStack, Text } from "@chakra-ui/react";
import { Lesson } from "./LessonsGrid";

interface DayStatsProps {
  selectedDay: string;
  scheduleType: "student" | "teacher";
  selectedGroup: string;
  selectedTeacher: string;
  allLessons: Lesson[];
}

export const DayStats: React.FC<DayStatsProps> = ({
  selectedDay,
  scheduleType,
  selectedGroup,
  selectedTeacher,
  allLessons,
}) => {
  const getLessonsForDay = (day: string, group?: string, teacher?: string) => {
    if (scheduleType === "student") {
      return allLessons.filter(lesson => lesson.day === day && lesson.group === group);
    } else {
      return allLessons.filter(lesson => lesson.day === day && lesson.teacher === teacher);
    }
  };

  const dayLessons = getLessonsForDay(
    selectedDay, 
    scheduleType === "student" ? selectedGroup : undefined,
    scheduleType === "teacher" ? selectedTeacher : undefined
  );

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
      <Card>
        <CardBody>
          <VStack spacing={2}>
            <Text fontSize="lg" fontWeight="semibold">
              {dayLessons.length}
            </Text>
            <Text fontSize="sm" color="gray.600">Занятий сегодня</Text>
          </VStack>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <VStack spacing={2}>
            <Text fontSize="lg" fontWeight="semibold">
              {dayLessons.filter(l => l.homework).length}
            </Text>
            <Text fontSize="sm" color="gray.600">Домашних заданий</Text>
          </VStack>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <VStack spacing={2}>
            <Text fontSize="lg" fontWeight="semibold">
              {dayLessons.filter(l => l.type === "Контрольная").length}
            </Text>
            <Text fontSize="sm" color="gray.600">Контрольных работ</Text>
          </VStack>
        </CardBody>
      </Card>
    </Grid>
  );
};
