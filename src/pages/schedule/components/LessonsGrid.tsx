import React from "react";
import { Card, CardHeader, CardBody, Heading, VStack, Box, HStack, Text, Badge } from "@chakra-ui/react";
import { MapPin, User, Users } from "lucide-react";

export interface Lesson {
  id: number;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  type: string;
  description?: string;
  homework?: string;
  grade?: string;
  group: string;
  meetingId?: string;
}

interface LessonsGridProps {
  selectedDay: string;
  scheduleType: "student" | "teacher";
  selectedGroup: string;
  selectedTeacher: string;
  timeSlots: string[];
  allLessons: Lesson[];
  onLessonClick: (lesson: Lesson) => void;
}

export const LessonsGrid: React.FC<LessonsGridProps> = ({
  selectedDay,
  scheduleType,
  selectedGroup,
  selectedTeacher,
  timeSlots,
  allLessons,
  onLessonClick,
}) => {
  const getLessonAtTime = (day: string, time: string, group?: string, teacher?: string) => {
    if (scheduleType === "student") {
      return allLessons.find(lesson => lesson.day === day && lesson.time === time && lesson.group === group);
    } else {
      return allLessons.find(lesson => lesson.day === day && lesson.time === time && lesson.teacher === teacher);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Урок": return "blue";
      case "Контрольная": return "red";
      case "Лабораторная": return "green";
      case "Экзамен": return "purple";
      default: return "gray";
    }
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">
          {selectedDay} - {scheduleType === "student" ? selectedGroup : selectedTeacher}
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          {timeSlots.map(timeSlot => {
            const lesson = getLessonAtTime(
              selectedDay, 
              timeSlot, 
              scheduleType === "student" ? selectedGroup : undefined,
              scheduleType === "teacher" ? selectedTeacher : undefined
            );
            return (
              <Box 
                key={timeSlot}
                p={4}
                border="1px"
                borderColor={lesson ? "blue.200" : "gray.200"}
                borderRadius="md"
                bg={lesson ? "blue.50" : "gray.50"}
                cursor={lesson ? "pointer" : "default"}
                onClick={() => lesson && onLessonClick(lesson)}
                _hover={lesson ? { bg: "blue.100" } : {}}
              >
                <HStack justify="space-between" align="start">
                  <HStack spacing={4} flex={1}>
                    <VStack align="start" spacing={1} minW="120px">
                      <Text fontWeight="semibold" fontSize="sm">
                        {timeSlot}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {timeSlot.split(' - ')[0]}
                      </Text>
                    </VStack>
                    
                    {lesson ? (
                      <VStack align="start" spacing={1} flex={1}>
                        <HStack spacing={2}>
                          <Text fontWeight="semibold">{lesson.subject}</Text>
                          <Badge colorScheme={getTypeColor(lesson.type)} size="sm">
                            {lesson.type}
                          </Badge>
                        </HStack>
                        <HStack spacing={4} fontSize="sm" color="gray.600">
                          {scheduleType === "student" ? (
                            <HStack spacing={1}>
                              <User size={14} />
                              <span>{lesson.teacher}</span>
                            </HStack>
                          ) : (
                            <HStack spacing={1}>
                              <Users size={14} />
                              <span>{lesson.group}</span>
                            </HStack>
                          )}
                          <HStack spacing={1}>
                            <MapPin size={14} />
                            <span>каб. {lesson.room}</span>
                          </HStack>
                        </HStack>
                        {lesson.description && (
                          <Text fontSize="sm" color="gray.600" noOfLines={1}>
                            {lesson.description}
                          </Text>
                        )}
                      </VStack>
                    ) : (
                      <Text color="gray.400" fontStyle="italic">
                        Нет занятий
                      </Text>
                    )}
                  </HStack>
                  
                  {lesson && (
                    <HStack spacing={2}>
                      {lesson.homework && (
                        <Badge colorScheme="orange" variant="subtle" size="sm">
                          ДЗ
                        </Badge>
                      )}
                      {lesson.grade && (
                        <Badge colorScheme="green" variant="subtle" size="sm">
                          {lesson.grade}
                        </Badge>
                      )}
                    </HStack>
                  )}
                </HStack>
              </Box>
            );
          })}
        </VStack>
      </CardBody>
    </Card>
  );
};
