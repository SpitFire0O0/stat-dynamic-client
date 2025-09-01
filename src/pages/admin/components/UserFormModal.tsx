import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Textarea,
  useToast,
  Avatar,
  Box,
  Text
} from "@chakra-ui/react";
import { AdminUser } from "./UsersManagement";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
  onSave: (userData: Partial<AdminUser>) => void;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<AdminUser>>({
    login: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    gender: "MALE",
    permissions: "STUDENT"
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (user) {
      setFormData({
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || "",
        address: user.address || "",
        gender: user.gender,
        permissions: user.permissions
      });
    } else {
      setFormData({
        login: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        gender: "MALE",
        permissions: "STUDENT"
      });
    }
  }, [user, isOpen]);

  const handleInputChange = (field: keyof AdminUser, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.login || !formData.firstName || !formData.lastName) {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, заполните все обязательные поля",
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
        title: user ? "Пользователь обновлен" : "Пользователь создан",
        description: user 
          ? "Данные пользователя успешно обновлены"
          : "Новый пользователь успешно создан",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      onClose();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при сохранении пользователя",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {user ? "Редактировать пользователя" : "Создать пользователя"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4}>
            {/* Аватар */}
            <Box textAlign="center">
              <Avatar 
                size="xl" 
                name={`${formData.firstName} ${formData.lastName}`}
                mb={2}
              />
              <Text fontSize="sm" color="gray.600">
                Аватар будет сгенерирован автоматически
              </Text>
            </Box>

            {/* Основная информация */}
            <HStack spacing={4} w="full">
              <FormControl isRequired>
                <FormLabel>Имя</FormLabel>
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Введите имя"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Фамилия</FormLabel>
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Введите фамилию"
                />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel>Email (логин)</FormLabel>
              <Input
                type="email"
                value={formData.login}
                onChange={(e) => handleInputChange("login", e.target.value)}
                placeholder="example@email.com"
              />
            </FormControl>

            <HStack spacing={4} w="full">
              <FormControl>
                <FormLabel>Телефон</FormLabel>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Пол</FormLabel>
                <Select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                >
                  <option value="MALE">Мужской</option>
                  <option value="FEMALE">Женский</option>
                </Select>
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>Адрес</FormLabel>
              <Textarea
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Введите адрес"
                rows={2}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Права доступа</FormLabel>
              <Select
                value={formData.permissions}
                onChange={(e) => handleInputChange("permissions", e.target.value)}
              >
                <option value="STUDENT">Студент</option>
                <option value="TEACHER">Преподаватель</option>
                <option value="PARENT">Родитель</option>
                <option value="ADMIN">Администратор</option>
              </Select>
            </FormControl>

            {/* Кнопки */}
            <HStack spacing={3} w="full" justify="flex-end" pt={4}>
              <Button onClick={onClose} variant="outline">
                Отмена
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleSubmit}
                isLoading={isLoading}
                loadingText="Сохранение..."
              >
                {user ? "Обновить" : "Создать"}
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
