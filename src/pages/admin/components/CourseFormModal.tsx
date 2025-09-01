import React, { useState, useEffect } from "react";
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
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast
} from "@chakra-ui/react";
import type { AdminCourse, AdminDiscipline } from "./CoursesManagement";

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: AdminCourse | null;
  disciplines: AdminDiscipline[];
  onSave: (courseData: Partial<AdminCourse>) => void;
}

export const CourseFormModal: React.FC<CourseFormModalProps> = ({
  isOpen,
  onClose,
  course,
  disciplines,
  onSave
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    academicYear: new Date().getFullYear(),
    disciplineId: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const isEdit = !!course;

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description || "",
        academicYear: course.academicYear,
        disciplineId: course.disciplineId
      });
    } else {
      setFormData({
        title: "",
        description: "",
        academicYear: new Date().getFullYear(),
        disciplineId: ""
      });
    }
  }, [course]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Ошибка",
        description: "Название курса обязательно для заполнения",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    if (!formData.disciplineId) {
      toast({
        title: "Ошибка",
        description: "Выберите дисциплину",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    setIsLoading(true);
    try {
      await onSave(formData);
      toast({
        title: "Успешно",
        description: isEdit ? "Курс обновлен" : "Курс создан",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      onClose();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при сохранении",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentYear = () => new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => getCurrentYear() - 2 + i);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEdit ? "Редактировать курс" : "Создать новый курс"}
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Название курса</FormLabel>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Введите название курса"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Описание</FormLabel>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Введите описание курса"
                rows={3}
              />
            </FormControl>

            <HStack spacing={4} w="full">
              <FormControl isRequired>
                <FormLabel>Дисциплина</FormLabel>
                <Select
                  value={formData.disciplineId}
                  onChange={(e) => handleInputChange("disciplineId", e.target.value)}
                  placeholder="Выберите дисциплину"
                >
                  {disciplines.map(discipline => (
                    <option key={discipline.id} value={discipline.id}>
                      {discipline.title}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Учебный год</FormLabel>
                <Select
                  value={formData.academicYear}
                  onChange={(e) => handleInputChange("academicYear", parseInt(e.target.value))}
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={3}>
            <Button variant="ghost" onClick={onClose}>
              Отмена
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Сохранение..."
            >
              {isEdit ? "Обновить" : "Создать"}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
