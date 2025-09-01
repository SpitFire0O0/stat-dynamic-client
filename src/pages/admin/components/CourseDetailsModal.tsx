import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  HStack,
  Text,
  Badge,
  Divider,
  Box
} from "@chakra-ui/react";
import { Calendar, BookOpen, FileText, Clock } from "lucide-react";
import type { AdminCourse } from "./CoursesManagement";

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: AdminCourse | null;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  isOpen,
  onClose,
  course
}) => {
  if (!course) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <VStack align="start" spacing={2}>
            <Text fontSize="xl" fontWeight="bold">{course.title}</Text>
            <HStack spacing={2}>
              <Badge colorScheme="blue" variant="subtle">
                {course.discipline.title}
              </Badge>
              <Badge colorScheme="green">
                {course.academicYear}
              </Badge>
            </HStack>
          </VStack>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Box>
              <HStack mb={2}>
                <FileText size={16} className="text-gray-500" />
                <Text fontWeight="semibold">Описание</Text>
              </HStack>
              <Text color="gray.700" fontSize="sm">
                {course.description || "Описание отсутствует"}
              </Text>
            </Box>

            <Divider />

            <Box>
              <HStack mb={2}>
                <BookOpen size={16} className="text-gray-500" />
                <Text fontWeight="semibold">Дисциплина</Text>
              </HStack>
              <Text color="gray.700">{course.discipline.title}</Text>
            </Box>

            <Box>
              <HStack mb={2}>
                <Calendar size={16} className="text-gray-500" />
                <Text fontWeight="semibold">Учебный год</Text>
              </HStack>
              <Text color="gray.700">{course.academicYear}</Text>
            </Box>

            <Divider />

            <Box>
              <HStack mb={2}>
                <Clock size={16} className="text-gray-500" />
                <Text fontWeight="semibold">Дата создания</Text>
              </HStack>
              <Text color="gray.700">
                {new Date(course.createdAt).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            </Box>

            <Box>
              <HStack mb={2}>
                <Clock size={16} className="text-gray-500" />
                <Text fontWeight="semibold">Последнее обновление</Text>
              </HStack>
              <Text color="gray.700">
                {new Date(course.updatedAt).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            </Box>

            <Divider />

            <Box>
              <Text fontWeight="semibold" mb={2}>Техническая информация</Text>
              <VStack align="start" spacing={1} fontSize="sm" color="gray.600">
                <Text>ID: {course.id}</Text>
                <Text>Discipline ID: {course.disciplineId}</Text>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
