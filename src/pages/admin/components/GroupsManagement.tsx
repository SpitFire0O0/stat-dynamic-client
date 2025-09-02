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
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Tooltip,
  Avatar,
  AvatarGroup
} from "@chakra-ui/react";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  GraduationCap,
  Users,
  Calendar,
  UserPlus
} from "lucide-react";
import { useGroups } from "../../../_api/hooks/useGroups";
import { useCourses } from "../../../_api/hooks/useCourses";

export interface AdminGroup {
  id: string;
  name: string;
  description?: string;
  academicYear: number;
  courseId: string;
  course: {
    id: string;
    title: string;
  };
  students: AdminUser[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  login: string;
  permissions: string;
}

interface GroupsManagementProps {
  onBack: () => void;
}

export const GroupsManagement: React.FC<GroupsManagementProps> = ({ onBack }) => {
  const { list: groupsQuery } = useGroups();
  const { list: coursesQuery } = useCourses();
  const groups = (groupsQuery.data as unknown as AdminGroup[]) || [];
  const courses = (coursesQuery.data as unknown as any[]) || [];
  const [filteredGroups, setFilteredGroups] = useState<AdminGroup[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [selectedGroup, setSelectedGroup] = useState<AdminGroup | null>(null);

  useEffect(() => {
    setFilteredGroups(groups);
  }, [groups]);

  useEffect(() => {
    let filtered = groups;

    // Фильтр по поиску
    if (searchQuery) {
      filtered = filtered.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по курсу
    if (courseFilter !== "all") {
      filtered = filtered.filter(group => group.courseId === courseFilter);
    }

    // Фильтр по году
    if (yearFilter !== "all") {
      filtered = filtered.filter(group => group.academicYear === parseInt(yearFilter));
    }

    setFilteredGroups(filtered);
  }, [groups, searchQuery, courseFilter, yearFilter]);

  const handleCreateGroup = () => {
    setSelectedGroup(null);
    // Здесь будет открытие модального окна создания группы
  };

  const handleEditGroup = (group: AdminGroup) => {
    setSelectedGroup(group);
    // Здесь будет открытие модального окна редактирования группы
  };

  const handleViewGroup = (group: AdminGroup) => {
    setSelectedGroup(group);
    // Здесь будет открытие модального окна просмотра группы
  };

  const handleDeleteGroup = (group: AdminGroup) => {
    setSelectedGroup(group);
    // Здесь будет открытие модального окна подтверждения удаления
  };

  const handleManageStudents = (group: AdminGroup) => {
    setSelectedGroup(group);
    // Здесь будет открытие модального окна управления студентами
  };

  const getCurrentYear = () => new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => getCurrentYear() - 2 + i);

  return (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Box>
          <Button variant="ghost" onClick={onBack} mb={2}>
            ← Назад к панели
          </Button>
          <Text fontSize="2xl" fontWeight="bold">Управление группами</Text>
        </Box>
        <Button colorScheme="blue" leftIcon={<Plus size={16} />} onClick={handleCreateGroup}>
          Добавить группу
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
                placeholder="Поиск по названию или описанию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <Select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              maxW="250px"
            >
              <option value="all">Все курсы</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </Select>
            <Select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              maxW="150px"
            >
              <option value="all">Все годы</option>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </HStack>
        </CardBody>
      </Card>

      {/* Статистика */}
      <HStack spacing={4}>
        <Card flex={1}>
          <CardBody>
            <HStack>
              <GraduationCap size={24} className="text-purple-500" />
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold">{groups.length}</Text>
                <Text fontSize="sm" color="gray.600">Всего групп</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
        <Card flex={1}>
          <CardBody>
            <HStack>
              <Users size={24} className="text-blue-500" />
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold">
                  {groups.reduce((total, group) => total + group.students.length, 0)}
                </Text>
                <Text fontSize="sm" color="gray.600">Всего студентов</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
        <Card flex={1}>
          <CardBody>
            <HStack>
              <Calendar size={24} className="text-green-500" />
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold">
                  {groups.filter(g => g.academicYear === getCurrentYear()).length}
                </Text>
                <Text fontSize="sm" color="gray.600">Групп в этом году</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
      </HStack>

      {/* Таблица групп */}
      <Card>
        <CardBody>
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Название группы</Th>
                  <Th>Курс</Th>
                  <Th>Описание</Th>
                  <Th>Студенты</Th>
                  <Th>Учебный год</Th>
                  <Th>Дата создания</Th>
                  <Th>Действия</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredGroups.map((group) => (
                  <Tr key={group.id}>
                    <Td>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="semibold">{group.name}</Text>
                        <Text fontSize="sm" color="gray.600">ID: {group.id}</Text>
                      </VStack>
                    </Td>
                    <Td>
                      <Badge colorScheme="blue" variant="subtle">
                        {group.course.title}
                      </Badge>
                    </Td>
                    <Td>
                      <Text fontSize="sm" noOfLines={2}>
                        {group.description || "Описание отсутствует"}
                      </Text>
                    </Td>
                    <Td>
                      <VStack align="start" spacing={1}>
                        <AvatarGroup size="sm" max={3}>
                          {group.students.map(student => (
                            <Avatar 
                              key={student.id} 
                              name={`${student.firstName} ${student.lastName}`}
                              size="sm"
                            />
                          ))}
                        </AvatarGroup>
                        <Text fontSize="xs" color="gray.600">
                          {group.students.length} студентов
                        </Text>
                      </VStack>
                    </Td>
                    <Td>
                      <Badge colorScheme="green">
                        {group.academicYear}
                      </Badge>
                    </Td>
                    <Td>
                      {new Date(group.createdAt).toLocaleDateString('ru-RU')}
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <Tooltip label="Просмотр">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<Eye size={16} />}
                            onClick={() => handleViewGroup(group)}
                            aria-label="Просмотр"
                          />
                        </Tooltip>
                        <Tooltip label="Управление студентами">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<UserPlus size={16} />}
                            onClick={() => handleManageStudents(group)}
                            aria-label="Управление студентами"
                            colorScheme="purple"
                          />
                        </Tooltip>
                        <Tooltip label="Редактировать">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<Edit size={16} />}
                            onClick={() => handleEditGroup(group)}
                            aria-label="Редактировать"
                          />
                        </Tooltip>
                        <Tooltip label="Удалить">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<Trash2 size={16} />}
                            onClick={() => handleDeleteGroup(group)}
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
    </VStack>
  );
};
