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
  Tooltip
} from "@chakra-ui/react";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  FileText,
  BookOpen,
  Calendar
} from "lucide-react";
import { useDisciplines } from "../../../_api/hooks/useDisciplines";

export interface AdminDiscipline {
  id: string;
  title: string;
  description?: string;
  code: string;
  credits: number;
  hours: number;
  createdAt: string;
  updatedAt: string;
}

interface DisciplinesManagementProps {
  onBack: () => void;
}

export const DisciplinesManagement: React.FC<DisciplinesManagementProps> = ({ onBack }) => {
  const { list } = useDisciplines();
  const disciplines = (list.data as unknown as AdminDiscipline[]) || [];
  const [filteredDisciplines, setFilteredDisciplines] = useState<AdminDiscipline[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [creditsFilter, setCreditsFilter] = useState<string>("all");
  const [selectedDiscipline, setSelectedDiscipline] = useState<AdminDiscipline | null>(null);

  useEffect(() => {
    setFilteredDisciplines(disciplines);
  }, [disciplines]);

  useEffect(() => {
    let filtered = disciplines;

    // Фильтр по поиску
    if (searchQuery) {
      filtered = filtered.filter(discipline =>
        discipline.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discipline.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discipline.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по кредитам
    if (creditsFilter !== "all") {
      filtered = filtered.filter(discipline => discipline.credits === parseInt(creditsFilter));
    }

    setFilteredDisciplines(filtered);
  }, [disciplines, searchQuery, creditsFilter]);

  const handleCreateDiscipline = () => {
    setSelectedDiscipline(null);
    // Здесь будет открытие модального окна создания дисциплины
  };

  const handleEditDiscipline = (discipline: AdminDiscipline) => {
    setSelectedDiscipline(discipline);
    // Здесь будет открытие модального окна редактирования дисциплины
  };

  const handleViewDiscipline = (discipline: AdminDiscipline) => {
    setSelectedDiscipline(discipline);
    // Здесь будет открытие модального окна просмотра дисциплины
  };

  const handleDeleteDiscipline = (discipline: AdminDiscipline) => {
    setSelectedDiscipline(discipline);
    // Здесь будет открытие модального окна подтверждения удаления
  };

  const creditsOptions = [3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Box>
          <Button variant="ghost" onClick={onBack} mb={2}>
            ← Назад к панели
          </Button>
          <Text fontSize="2xl" fontWeight="bold">Управление дисциплинами</Text>
        </Box>
        <Button colorScheme="blue" leftIcon={<Plus size={16} />} onClick={handleCreateDiscipline}>
          Добавить дисциплину
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
                placeholder="Поиск по названию, описанию или коду..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <Select
              value={creditsFilter}
              onChange={(e) => setCreditsFilter(e.target.value)}
              maxW="150px"
            >
              <option value="all">Все кредиты</option>
              {creditsOptions.map(credits => (
                <option key={credits} value={credits}>
                  {credits} кредитов
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
              <FileText size={24} className="text-orange-500" />
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold">{disciplines.length}</Text>
                <Text fontSize="sm" color="gray.600">Всего дисциплин</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
        <Card flex={1}>
          <CardBody>
            <HStack>
              <BookOpen size={24} className="text-blue-500" />
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold">
                  {disciplines.reduce((total, discipline) => total + discipline.credits, 0)}
                </Text>
                <Text fontSize="sm" color="gray.600">Общее количество кредитов</Text>
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
                  {disciplines.reduce((total, discipline) => total + discipline.hours, 0)}
                </Text>
                <Text fontSize="sm" color="gray.600">Общее количество часов</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
      </HStack>

      {/* Таблица дисциплин */}
      <Card>
        <CardBody>
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Название дисциплины</Th>
                  <Th>Код</Th>
                  <Th>Описание</Th>
                  <Th>Кредиты</Th>
                  <Th>Часы</Th>
                  <Th>Дата создания</Th>
                  <Th>Действия</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredDisciplines.map((discipline) => (
                  <Tr key={discipline.id}>
                    <Td>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="semibold">{discipline.title}</Text>
                        <Text fontSize="sm" color="gray.600">ID: {discipline.id}</Text>
                      </VStack>
                    </Td>
                    <Td>
                      <Badge colorScheme="purple" variant="subtle">
                        {discipline.code}
                      </Badge>
                    </Td>
                    <Td>
                      <Text fontSize="sm" noOfLines={2}>
                        {discipline.description || "Описание отсутствует"}
                      </Text>
                    </Td>
                    <Td>
                      <Badge colorScheme="blue">
                        {discipline.credits}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge colorScheme="green">
                        {discipline.hours}
                      </Badge>
                    </Td>
                    <Td>
                      {new Date(discipline.createdAt).toLocaleDateString('ru-RU')}
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <Tooltip label="Просмотр">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<Eye size={16} />}
                            onClick={() => handleViewDiscipline(discipline)}
                            aria-label="Просмотр"
                          />
                        </Tooltip>
                        <Tooltip label="Редактировать">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<Edit size={16} />}
                            onClick={() => handleEditDiscipline(discipline)}
                            aria-label="Редактировать"
                          />
                        </Tooltip>
                        <Tooltip label="Удалить">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<Trash2 size={16} />}
                            onClick={() => handleDeleteDiscipline(discipline)}
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
