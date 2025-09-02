import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Avatar,
  Tooltip
} from "@chakra-ui/react";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Users,
  UserCheck,
  UserX
} from "lucide-react";
import { UserFormModal } from "./UserFormModal";
import { UserDetailsModal } from "./UserDetailsModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { useUsers } from "../../../_api/hooks/useUsers";
import { useToast } from "@chakra-ui/react";

export interface AdminUser {
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
  updatedAt: string;
}

interface UsersManagementProps {
  onBack: () => void;
}

export const UsersManagement: React.FC<UsersManagementProps> = ({ onBack }) => {
  const toast = useToast();
  const { list, create, update, remove } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [permissionFilter, setPermissionFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose
  } = useDisclosure();

  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure();

  // Поддержка данных из API
  const users = (list.data as unknown as AdminUser[]) || [];
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    let filtered = users;

    // Фильтр по поиску
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.login.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по правам
    if (permissionFilter !== "all") {
      filtered = filtered.filter(user => user.permissions === permissionFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchQuery, permissionFilter]);

  const handleCreateUser = () => {
    setSelectedUser(null);
    onFormOpen();
  };

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user);
    onFormOpen();
  };

  const handleViewUser = (user: AdminUser) => {
    setSelectedUser(user);
    onDetailsOpen();
  };

  const handleDeleteUser = (user: AdminUser) => {
    setSelectedUser(user);
    onDeleteOpen();
  };

  const handleSaveUser = async (userData: Partial<AdminUser>) => {
    setIsLoading(true);
    try {
      if (selectedUser) {
        await update.mutateAsync({ id: selectedUser.id, dto: userData as any });
      } else {
        // Backend requires password & birthday; provide safe defaults if missing
        const payload: any = {
          login: userData.login,
          password: "Password123!",
          firstName: userData.firstName,
          lastName: userData.lastName,
          birthday: new Date(2010, 0, 1).toISOString(),
          phone: userData.phone || "",
          address: userData.address || "",
          gender: userData.gender,
          permissions: userData.permissions,
        };
        await create.mutateAsync(payload);
      }
      onFormClose();
      toast({ title: 'Сохранено', status: 'success', duration: 2000 });
    } catch (e: any) {
      toast({ title: 'Ошибка сохранения', description: e?.message || 'Ошибка', status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await remove.mutateAsync(selectedUser.id);
      onDeleteClose();
      toast({ title: 'Удалено', status: 'info', duration: 2000 });
    } catch (e: any) {
      toast({ title: 'Ошибка удаления', description: e?.message || 'Ошибка', status: 'error' });
    }
  };

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case "ADMIN": return "red";
      case "TEACHER": return "blue";
      case "PARENT": return "green";
      case "STUDENT": return "gray";
      default: return "gray";
    }
  };

  const getPermissionLabel = (permission: string) => {
    switch (permission) {
      case "ADMIN": return "Администратор";
      case "TEACHER": return "Преподаватель";
      case "PARENT": return "Родитель";
      case "STUDENT": return "Студент";
      default: return permission;
    }
  };

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

      {/* Фильтры и поиск */}
      <Card>
        <CardBody>
          <HStack spacing={4}>
            <InputGroup maxW="400px">
              <InputLeftElement>
                <Search size={16} className="text-gray-400" />
              </InputLeftElement>
              <Input
                placeholder="Поиск по имени, фамилии или email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <Select
              value={permissionFilter}
              onChange={(e) => setPermissionFilter(e.target.value)}
              maxW="200px"
            >
              <option value="all">Все права</option>
              <option value="ADMIN">Администраторы</option>
              <option value="TEACHER">Преподаватели</option>
              <option value="PARENT">Родители</option>
              <option value="STUDENT">Студенты</option>
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Статистика */}
      <HStack spacing={4}>
        <Card flex={1}>
          <CardBody>
            <HStack>
              <Users size={24} className="text-blue-500" />
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold">{users.length}</Text>
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
                  {users.filter(u => u.permissions === "TEACHER").length}
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
                  {users.filter(u => u.permissions === "STUDENT").length}
                </Text>
                <Text fontSize="sm" color="gray.600">Студентов</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
      </HStack>

      {/* Таблица пользователей */}
      <Card>
        <CardBody>
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Пользователь</Th>
                  <Th>Email</Th>
                  <Th>Телефон</Th>
                  <Th>Права</Th>
                  <Th>Дата создания</Th>
                  <Th>Действия</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredUsers.map((user) => (
                  <Tr key={user.id}>
                    <Td>
                      <HStack spacing={3}>
                        <Avatar size="sm" name={`${user.firstName} ${user.lastName}`} />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="semibold">
                            {user.firstName} {user.lastName}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {user.gender === "MALE" ? "Мужской" : "Женский"}
                          </Text>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td>{user.login}</Td>
                    <Td>{user.phone || "-"}</Td>
                    <Td>
                      <Badge colorScheme={getPermissionColor(user.permissions)}>
                        {getPermissionLabel(user.permissions)}
                      </Badge>
                    </Td>
                    <Td>
                      {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                    </Td>
                    <Td>
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
                            onClick={() => handleEditUser(user)}
                            aria-label="Редактировать"
                          />
                        </Tooltip>
                        <Tooltip label="Удалить">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<Trash2 size={16} />}
                            onClick={() => handleDeleteUser(user)}
                            aria-label="Удалить"
                            colorScheme="red"
                          />
                        </Tooltip>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>

      {/* Модальные окна */}
      <UserFormModal
        isOpen={isFormOpen}
        onClose={onFormClose}
        user={selectedUser}
        onSave={handleSaveUser}
      />

      <UserDetailsModal
        isOpen={isDetailsOpen}
        onClose={onDetailsClose}
        user={selectedUser}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={handleConfirmDelete}
        title="Удаление пользователя"
        message={`Вы уверены, что хотите удалить пользователя ${selectedUser?.firstName} ${selectedUser?.lastName}?`}
      />
    </VStack>
  );
};
