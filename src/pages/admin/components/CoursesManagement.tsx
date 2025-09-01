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
  Tooltip
} from "@chakra-ui/react";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  BookOpen,
  Calendar,
  Users
} from "lucide-react";

export interface AdminCourse {
  id: string;
  title: string;
  description?: string;
  academicYear: number;
  disciplineId: string;
  discipline: {
    id: string;
    title: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AdminDiscipline {
  id: string;
  title: string;
}

interface CoursesManagementProps {
  onBack: () => void;
}

export const CoursesManagement: React.FC<CoursesManagementProps> = ({ onBack }) => {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [disciplines, setDisciplines] = useState<AdminDiscipline[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<AdminCourse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [disciplineFilter, setDisciplineFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<AdminCourse | null>(null);

  // Моковые данные
  useEffect(() => {
    const mockDisciplines: AdminDiscipline[] = [
      { id: "1", title: "Математика" },
      { id: "2", title: "Физика" },
      { id: "3", title: "Химия" },
      { id: "4", title: "История" },
      { id: "5", title: "Литература" }
    ];

    const mockCourses: AdminCourse[] = [
      {
        id: "1",
        title: "Алгебра и начала анализа",
        description: "Курс по алгебре для 10-11 классов",
        academicYear: 2024,
        disciplineId: "1",
        discipline: mockDisciplines[0],
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z"
      },
      {
        id: "2",
        title: "Механика",
        description: "Основы механики для 10 класса",
        academicYear: 2024,
        disciplineId: "2",
        discipline: mockDisciplines[1],
        createdAt: "2024-01-02T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z"
      },
      {
        id: "3",
        title: "Органическая химия",
        description: "Курс органической химии",
        academicYear: 2024,
        disciplineId: "3",
        discipline: mockDisciplines[2],
        createdAt: "2024-01-03T00:00:00Z",
        updatedAt: "2024-01-03T00:00:00Z"
      }
    ];

    setDisciplines(mockDisciplines);
    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Фильтр по поиску
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по дисциплине
    if (disciplineFilter !== "all") {
      filtered = filtered.filter(course => course.disciplineId === disciplineFilter);
    }

    // Фильтр по году
    if (yearFilter !== "all") {
      filtered = filtered.filter(course => course.academicYear === parseInt(yearFilter));
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery, disciplineFilter, yearFilter]);

  const handleCreateCourse = () => {
    setSelectedCourse(null);
    // Здесь будет открытие модального окна создания курса
  };

  const handleEditCourse = (course: AdminCourse) => {
    setSelectedCourse(course);
    // Здесь будет открытие модального окна редактирования курса
  };

  const handleViewCourse = (course: AdminCourse) => {
    setSelectedCourse(course);
    // Здесь будет открытие модального окна просмотра курса
  };

  const handleDeleteCourse = (course: AdminCourse) => {
    setSelectedCourse(course);
    // Здесь будет открытие модального окна подтверждения удаления
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
          <Text fontSize="2xl" fontWeight="bold">Управление курсами</Text>
        </Box>
        <Button colorScheme="blue" leftIcon={<Plus size={16} />} onClick={handleCreateCourse}>
          Добавить курс
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
              value={disciplineFilter}
              onChange={(e) => setDisciplineFilter(e.target.value)}
              maxW="200px"
            >
              <option value="all">Все дисциплины</option>
              {disciplines.map(discipline => (
                <option key={discipline.id} value={discipline.id}>
                  {discipline.title}
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
              <BookOpen size={24} className="text-blue-500" />
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold">{courses.length}</Text>
                <Text fontSize="sm" color="gray.600">Всего курсов</Text>
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
                  {courses.filter(c => c.academicYear === getCurrentYear()).length}
                </Text>
                <Text fontSize="sm" color="gray.600">Курсов в этом году</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
        <Card flex={1}>
          <CardBody>
            <HStack>
              <Users size={24} className="text-purple-500" />
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold">{disciplines.length}</Text>
                <Text fontSize="sm" color="gray.600">Дисциплин</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
      </HStack>

      {/* Таблица курсов */}
      <Card>
        <CardBody>
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Название курса</Th>
                  <Th>Дисциплина</Th>
                  <Th>Описание</Th>
                  <Th>Учебный год</Th>
                  <Th>Дата создания</Th>
                  <Th>Действия</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredCourses.map((course) => (
                  <Tr key={course.id}>
                    <Td>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="semibold">{course.title}</Text>
                        <Text fontSize="sm" color="gray.600">ID: {course.id}</Text>
                      </VStack>
                    </Td>
                    <Td>
                      <Badge colorScheme="blue" variant="subtle">
                        {course.discipline.title}
                      </Badge>
                    </Td>
                    <Td>
                      <Text fontSize="sm" noOfLines={2}>
                        {course.description || "Описание отсутствует"}
                      </Text>
                    </Td>
                    <Td>
                      <Badge colorScheme="green">
                        {course.academicYear}
                      </Badge>
                    </Td>
                    <Td>
                      {new Date(course.createdAt).toLocaleDateString('ru-RU')}
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <Tooltip label="Просмотр">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<Eye size={16} />}
                            onClick={() => handleViewCourse(course)}
                            aria-label="Просмотр"
                          />
                        </Tooltip>
                        <Tooltip label="Редактировать">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<Edit size={16} />}
                            onClick={() => handleEditCourse(course)}
                            aria-label="Редактировать"
                          />
                        </Tooltip>
                        <Tooltip label="Удалить">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<Trash2 size={16} />}
                            onClick={() => handleDeleteCourse(course)}
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
