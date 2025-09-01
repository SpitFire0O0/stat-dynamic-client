import React from "react";
import { Card, CardHeader, CardBody, HStack, VStack, Heading, Text, Badge, Box } from "@chakra-ui/react";
import { Calendar, MapPin, User } from "lucide-react";

export interface LessonItem {
  id: number;
  subject: string;
  teacher: string;
  time: string;
  room: string;
  type: string;
}

interface UpcomingLessonsProps {
  lessons: LessonItem[];
}

export const UpcomingLessons: React.FC<UpcomingLessonsProps> = ({ lessons }) => (
  <Card>
    <CardHeader>
      <HStack>
        <Calendar size={20} className="text-[var(--primary-color)]" />
        <Heading size="md">Ближайшие занятия</Heading>
      </HStack>
    </CardHeader>
    <CardBody>
      <VStack spacing={4} align="stretch">
        {lessons.map((lesson) => (
          <Box
            key={lesson.id}
            p={4}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            _hover={{ bg: "gray.50" }}
          >
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <HStack spacing={2}>
                  <Text fontWeight="semibold">{lesson.subject}</Text>
                  <Badge colorScheme="blue" size="sm">
                    {lesson.type}
                  </Badge>
                </HStack>
                <HStack spacing={4} fontSize="sm" color="gray.600">
                  <HStack spacing={1}>
                    <User size={14} />
                    <span>{lesson.teacher}</span>
                  </HStack>
                  <HStack spacing={1}>
                    <MapPin size={14} />
                    <span>каб. {lesson.room}</span>
                  </HStack>
                </HStack>
              </VStack>
              <VStack align="end" spacing={1}>
                <Text fontWeight="semibold" fontSize="sm">
                  {lesson.time}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Сегодня
                </Text>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </CardBody>
  </Card>
);


