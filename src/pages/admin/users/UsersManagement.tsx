import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  IconButton,
  Tooltip
} from "@chakra-ui/react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Users,
  UserCheck,
  UserX
} from "lucide-react";
import { UserFormModal } from "./UserFormModal";
import { UserDetailsModal } from "./UserDetailsModal";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import { BaseTable } from "../../../components/base-table/BaseTable";
import { usersTableColumns } from "./config";
import { useUsersAdmin } from "./useUsersAdmin";
import type { AdminUser } from "../types";

/* AdminUser type moved to src/pages/admin/types.ts */
// using AdminUser from ../types
/*
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  birthday?: string;
  phone?: string;
  address?: string;
  logo?: string;
  gender: 'MALE' | 'FEMALE';
  permissions: 'ADMIN' | 'TEACHER' | 'PARENT' | 'STUDENT';
  createdAt: string;
  updatedAt: string;*/

interface UsersManagementProps {
  onBack: () => void;
}

export const UsersManagement: React.FC<UsersManagementProps> = ({ onBack }) => {
  const {
    filteredUsers,
    isLoading,
    isError,
    refetch,
    selectedUser,
    setSelectedUser,
    handleConfirmDelete,
    stats,
    dialog: { isOpen, key, open, close },
  } = useUsersAdmin();
  // Производные флаги диалогов
  const isFormOpen = isOpen && key === 'user.form';
  const isDetailsOpen = isOpen && key === 'user.details';
  const isDeleteOpen = isOpen && key === 'confirm.delete';

  // Открыть модал создания
  const handleCreateUser = () => { setSelectedUser(null); open('user.form'); };

  // Открыть модал редактирования
  const handleEditUser = (user: AdminUser) => { setSelectedUser(user); open('user.form'); };

  // Открыть модал просмотра
  const handleViewUser = (user: AdminUser) => { setSelectedUser(user); open('user.details'); };

  // Открыть диалог подтверждения удаления
  const handleDeleteUser = (user: AdminUser) => { setSelectedUser(user); open('confirm.delete'); };

  // Подтверждение удаления + закрытие диалога
  const handleConfirmDeleteLocal = () => { handleConfirmDelete(); close(); };

  return (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Box>
          <Button variant="ghost" onClick={onBack} mb={2}>
            ← Назад к панели
          </Button>
          <Text fontSize="2xl" fontWeight="bold">Управление пользователями</Text>
        </Box>
        <Button colorScheme="blue" leftIcon={<Plus size={16} />} onClick={handleCreateUser}>
          Добавить пользователя
        </Button>
      </HStack>

      {/* Клиентскую фильтрацию временно убрали до server-side фильтров */}

      {/* Статистика */}
      <HStack spacing={4}>
        <Card flex={1}>
          <CardBody>
            <HStack>
              <Users size={24} className="text-blue-500" />
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold">{stats.total}</Text>
                <Text fontSize="sm" color="gray.600">Всего пользователей</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
        <Card flex={1}>
          <CardBody>
            <HStack>
              <UserCheck size={24} className="text-green-500" />
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold">
                  {stats.teachers}
                </Text>
                <Text fontSize="sm" color="gray.600">Преподавателей</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
        <Card flex={1}>
          <CardBody>
            <HStack>
              <UserX size={24} className="text-purple-500" />
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold">
                  {stats.students}
                </Text>
                <Text fontSize="sm" color="gray.600">Студентов</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
      </HStack>

      {/* Таблица пользователей (через дженерик BaseTable) */}
      <Card>
        <CardBody>
          {/* Отображение ошибки загрузки */}
          {isError && (
            <Box mb={4} color="red.600">
              Произошла ошибка при загрузке списка пользователей.
              <Button ml={3} size="sm" onClick={() => refetch()}>Повторить</Button>
            </Box>
          )}
          {/* Унификация: используем заранее сконфигурированные колонки из config.tsx */}
          <BaseTable
            rows={filteredUsers}
            loading={isLoading}
            columns={usersTableColumns}
            renderActions={(user: AdminUser) => (
              <HStack spacing={2}>
                <Tooltip label="Просмотр">
                  <IconButton
                    size="sm"
                    variant="ghost"
                    icon={<Eye size={16} />}
                    onClick={() => handleViewUser(user)}
                    aria-label="Просмотр"
                  />
                </Tooltip>
                <Tooltip label="Редактировать">
                  <IconButton
                    size="sm"
                    variant="ghost"
                    icon={<Edit size={16} />}
                    onClick={() => handleEditUser(user)} // открыть модал редактирования
                    aria-label="Редактировать"
                  />
                </Tooltip>
                <Tooltip label="Удалить">
                  <IconButton
                    size="sm"
                    variant="ghost"
                    icon={<Trash2 size={16} />}
                    onClick={() => handleDeleteUser(user)} // запрос подтверждения удаления
                    aria-label="Удалить"
                    colorScheme="red"
                  />
                </Tooltip>
              </HStack>
            )}
          />
        </CardBody>
      </Card>

      {/* Модальные окна */}
      <UserFormModal
        isOpen={isFormOpen}
        onClose={close}
        user={selectedUser}
      />

      <UserDetailsModal
        isOpen={isDetailsOpen}
        onClose={close}
        user={selectedUser}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={close}
        onConfirm={handleConfirmDeleteLocal}
        title="Удаление пользователя"
        message={`Вы уверены, что хотите удалить пользователя ${selectedUser?.firstName} ${selectedUser?.lastName}?`}
      />
    </VStack>
  );
};
