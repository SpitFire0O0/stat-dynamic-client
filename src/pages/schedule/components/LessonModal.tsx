import React from "react";
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalCloseButton,
  VStack, 
  HStack, 
  Text, 
  Badge, 
  Divider,
  Alert,
  AlertIcon,
  Button,
  HStack as CHStack,
  useToast
} from "@chakra-ui/react";
import { BookOpen, Users, User, MapPin, Calendar, Info } from "lucide-react";
import { Lesson } from "./LessonsGrid";
import { useAuth } from "../../../hooks/useAuth";
import { useMeetings } from "../../../_api/hooks/useMeetings";

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLesson: Lesson | null;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  isOpen,
  onClose,
  selectedLesson,
}) => {
  const toast = useToast();
  const { user } = useAuth();
  const { remove } = useMeetings();
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
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <BookOpen size={20} className="text-[var(--primary-color)]" />
            <Text>{selectedLesson?.subject}</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {selectedLesson && (
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Text fontWeight="semibold">{selectedLesson.time}</Text>
                <Badge colorScheme={getTypeColor(selectedLesson.type)}>
                  {selectedLesson.type}
                </Badge>
              </HStack>
              
              <Divider />
              
              <VStack align="start" spacing={3}>
                <HStack spacing={2}>
                  <Users size={16} className="text-gray-500" />
                  <Text><strong>Группа:</strong> {selectedLesson.group}</Text>
                </HStack>
                <HStack spacing={2}>
                  <User size={16} className="text-gray-500" />
                  <Text><strong>Преподаватель:</strong> {selectedLesson.teacher}</Text>
                </HStack>
                <HStack spacing={2}>
                  <MapPin size={16} className="text-gray-500" />
                  <Text><strong>Кабинет:</strong> {selectedLesson.room}</Text>
                </HStack>
                <HStack spacing={2}>
                  <Calendar size={16} className="text-gray-500" />
                  <Text><strong>День:</strong> {selectedLesson.day}</Text>
                </HStack>
              </VStack>
              
              {selectedLesson.description && (
                <>
                  <Divider />
                  <VStack align="start" spacing={2}>
                    <HStack spacing={2}>
                      <Info size={16} className="text-gray-500" />
                      <Text fontWeight="semibold">Описание:</Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.600">
                      {selectedLesson.description}
                    </Text>
                  </VStack>
                </>
              )}
              
              {selectedLesson.homework && (
                <>
                  <Divider />
                  <VStack align="start" spacing={2}>
                    <HStack spacing={2}>
                      <BookOpen size={16} className="text-gray-500" />
                      <Text fontWeight="semibold">Домашнее задание:</Text>
                    </HStack>
                    <Alert status="info" borderRadius="md">
                      <AlertIcon />
                      {selectedLesson.homework}
                    </Alert>
                  </VStack>
                </>
              )}
              
              {selectedLesson.grade && (
                <>
                  <Divider />
                  <HStack justify="space-between">
                    <Text fontWeight="semibold">Оценка:</Text>
                    <Badge colorScheme="green" size="lg">
                      {selectedLesson.grade}
                    </Badge>
                  </HStack>
                </>
              )}

              {(user?.permissions === 'ADMIN' || user?.permissions === 'TEACHER') && selectedLesson.meetingId && (
                <>
                  <Divider />
                  <CHStack justify="flex-end" pt={2}>
                    {/* В дальнейшем можно добавить кнопку Редактировать */}
                    <Button
                      colorScheme="red"
                      variant="outline"
                      onClick={async () => {
                        try {
                          await remove.mutateAsync(selectedLesson.meetingId as any);
                          toast({ title: 'Занятие удалено', status: 'info' });
                          onClose();
                        } catch (e: any) {
                          toast({ title: 'Ошибка удаления', description: e?.message || 'Ошибка', status: 'error' });
                        }
                      }}
                    >
                      Удалить занятие
                    </Button>
                  </CHStack>
                </>
              )}
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
