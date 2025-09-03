import React, { useEffect } from "react";
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
import type { AdminUser } from "../types";
import { useCreateUserForm } from './useCreateUserForm';
import { useEditUserForm } from './useEditUserForm';

// Пропсы модалки формы пользователя
interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const isEdit = Boolean(user);
  const createForm = useCreateUserForm();
  const editForm = useEditUserForm();
  const toast = useToast();

  // При открытии/смене выбранного пользователя заполняем форму
  useEffect(() => {
    if (user) editForm.beginEdit(user);
    else createForm.reset();
  }, [user, isOpen]);

  const handleInputChangeCreate = (field: Parameters<typeof createForm.setField>[0], value: string) => createForm.setField(field, value as any);
  const handleInputChangeEdit = (field: Parameters<typeof editForm.setField>[0], value: string) => editForm.setField(field, value as any);

  const handleSubmit = async () => {
    try {
      if (isEdit) await editForm.submit();
      else await createForm.submit();
      toast({
        title: isEdit ? 'Пользователь обновлен' : 'Пользователь создан',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (e) {
      toast({
        title: 'Ошибка',
        description: 'Проверьте введенные данные',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
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
                name={`${(isEdit ? editForm.form.firstName : createForm.form.firstName) ?? ''} ${(isEdit ? editForm.form.lastName : createForm.form.lastName) ?? ''}`}
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
                  value={isEdit ? editForm.form.firstName : createForm.form.firstName}
                  onChange={(e) => (isEdit ? handleInputChangeEdit('firstName', e.target.value) : handleInputChangeCreate('firstName', e.target.value))}
                  placeholder="Введите имя"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Фамилия</FormLabel>
                <Input
                  value={isEdit ? editForm.form.lastName : createForm.form.lastName}
                  onChange={(e) => (isEdit ? handleInputChangeEdit('lastName', e.target.value) : handleInputChangeCreate('lastName', e.target.value))}
                  placeholder="Введите фамилию"
                />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel>Email (логин)</FormLabel>
              <Input
                type="email"
                value={isEdit ? editForm.form.login : createForm.form.login}
                onChange={(e) => (isEdit ? handleInputChangeEdit('login', e.target.value) : handleInputChangeCreate('login', e.target.value))}
                placeholder="example@email.com"
              />
            </FormControl>

            {/* Пароль (только при создании) */}
            {!isEdit && (
              <FormControl isRequired>
                <FormLabel>Пароль</FormLabel>
                <Input
                  type="password"
                  value={createForm.form.password}
                  onChange={(e) => handleInputChangeCreate('password', e.target.value)}
                  placeholder="Введите пароль"
                />
              </FormControl>
            )}

            {/* Дата рождения */}
            {/* Дата рождения */}
            <FormControl isRequired>
              <FormLabel>Дата рождения</FormLabel>
              <Input
                type="date"
                value={isEdit ? editForm.form.birthday : createForm.form.birthday}
                onChange={(e) => (isEdit ? handleInputChangeEdit('birthday', e.target.value) : handleInputChangeCreate('birthday', e.target.value))}
              />
            </FormControl>

            <HStack spacing={4} w="full">
              <FormControl>
                <FormLabel>Телефон</FormLabel>
                <Input
                  value={isEdit ? editForm.form.phone : createForm.form.phone}
                  onChange={(e) => (isEdit ? handleInputChangeEdit('phone', e.target.value) : handleInputChangeCreate('phone', e.target.value))}
                  placeholder="+7 (999) 123-45-67"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Пол</FormLabel>
                <Select
                  value={isEdit ? editForm.form.gender : createForm.form.gender}
                  onChange={(e) => (isEdit ? handleInputChangeEdit('gender', e.target.value as any) : handleInputChangeCreate('gender', e.target.value as any))}
                >
                  <option value="MALE">Мужской</option>
                  <option value="FEMALE">Женский</option>
                </Select>
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>Адрес</FormLabel>
              <Textarea
                value={isEdit ? editForm.form.address : createForm.form.address}
                onChange={(e) => (isEdit ? handleInputChangeEdit('address', e.target.value) : handleInputChangeCreate('address', e.target.value))}
                placeholder="Введите адрес"
                rows={2}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Права доступа</FormLabel>
              <Select
                value={isEdit ? editForm.form.permissions : createForm.form.permissions}
                onChange={(e) => (isEdit ? handleInputChangeEdit('permissions', e.target.value as any) : handleInputChangeCreate('permissions', e.target.value as any))}
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
                isLoading={isEdit ? editForm.isSubmitting : createForm.isSubmitting}
                loadingText="Сохранение..."
                isDisabled={!(isEdit ? editForm.canSubmit : createForm.canSubmit)}
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
