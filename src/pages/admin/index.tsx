import React, { useState } from "react";
import { 
  Box, 
  Flex, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Button, 
  Card, 
  CardBody,
  Grid,
  Icon,
  useColorModeValue
} from "@chakra-ui/react";
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  MessageSquare, 
  Award, 
  FileText, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import type { User } from "../../store/auth.store";
import { UsersManagement } from "./components/UsersManagement";
import { CoursesManagement } from "./components/CoursesManagement";
import { GroupsManagement } from "./components/GroupsManagement";
import { DisciplinesManagement } from "./components/DisciplinesManagement";

type AdminSection = 
  | "users" 
  | "courses" 
  | "groups" 
  | "disciplines" 
  | "themes" 
  | "grades" 
  | "homework" 
  | "meetings" 
  | "achievements" 
  | "feedback";

interface AdminMenuItem {
  id: AdminSection;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

const adminMenuItems: AdminMenuItem[] = [
  {
    id: "users",
    title: "Пользователи",
    description: "Управление пользователями системы",
    icon: Users,
    color: "blue"
  },
  {
    id: "courses",
    title: "Курсы",
    description: "Управление курсами и предметами",
    icon: BookOpen,
    color: "green"
  },
  {
    id: "groups",
    title: "Группы",
    description: "Управление группами студентов",
    icon: GraduationCap,
    color: "purple"
  },
  {
    id: "disciplines",
    title: "Дисциплины",
    description: "Управление учебными дисциплинами",
    icon: FileText,
    color: "orange"
  },
  {
    id: "themes",
    title: "Темы",
    description: "Управление темами курсов",
    icon: Calendar,
    color: "teal"
  },
  {
    id: "grades",
    title: "Оценки",
    description: "Управление оценками студентов",
    icon: Award,
    color: "yellow"
  },
  {
    id: "homework",
    title: "Домашние задания",
    description: "Управление домашними заданиями",
    icon: FileText,
    color: "cyan"
  },
  {
    id: "meetings",
    title: "Встречи",
    description: "Управление встречами и занятиями",
    icon: MessageSquare,
    color: "pink"
  },
  {
    id: "achievements",
    title: "Достижения",
    description: "Управление достижениями студентов",
    icon: Award,
    color: "red"
  },
  {
    id: "feedback",
    title: "Обратная связь",
    description: "Управление отзывами и обратной связью",
    icon: MessageSquare,
    color: "indigo"
  }
];

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedSection, setSelectedSection] = useState<AdminSection | null>(null);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Проверка прав администратора
  if ((user as User)?.permissions !== "ADMIN") {
    return (
      <Box p={6}>
        <Card>
          <CardBody>
            <VStack spacing={4}>
              <Heading size="lg" color="red.500">Доступ запрещен</Heading>
              <Text>У вас нет прав для доступа к админ панели</Text>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    );
  }

  const handleSectionSelect = (section: AdminSection) => {
    setSelectedSection(section);
  };

  const renderSectionContent = () => {
    if (!selectedSection) {
      return (
        <VStack spacing={6} align="stretch">
          <Box>
            <Heading size="lg" mb={2}>Панель администратора</Heading>
            <Text color="gray.600">
              Добро пожаловать в панель администратора. Выберите раздел для управления.
            </Text>
          </Box>
          
          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
            {adminMenuItems.map((item) => (
              <Card 
                key={item.id} 
                cursor="pointer" 
                _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                transition="all 0.2s"
                onClick={() => handleSectionSelect(item.id)}
              >
                <CardBody>
                  <HStack spacing={4}>
                    <Box
                      p={3}
                      borderRadius="lg"
                      bg={`${item.color}.100`}
                      color={`${item.color}.600`}
                    >
                      <item.icon size={24} />
                    </Box>
                    <VStack align="start" spacing={1} flex={1}>
                      <Text fontWeight="semibold" fontSize="lg">
                        {item.title}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {item.description}
                      </Text>
                    </VStack>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </VStack>
      );
    }

    // Рендерим компоненты для каждого раздела
    switch (selectedSection) {
      case "users":
        return <UsersManagement onBack={() => setSelectedSection(null)} />;
      case "courses":
        return <CoursesManagement onBack={() => setSelectedSection(null)} />;
      case "groups":
        return <GroupsManagement onBack={() => setSelectedSection(null)} />;
      case "disciplines":
        return <DisciplinesManagement onBack={() => setSelectedSection(null)} />;
      default:
        return (
          <VStack spacing={6} align="stretch">
            <HStack justify="space-between">
              <Box>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedSection(null)}
                  mb={2}
                >
                  ← Назад к панели
                </Button>
                <Heading size="lg">
                  {adminMenuItems.find(item => item.id === selectedSection)?.title}
                </Heading>
              </Box>
              <Button colorScheme="blue" leftIcon={<Plus size={16} />}>
                Добавить
              </Button>
            </HStack>
            
            <Card>
              <CardBody>
                <Text color="gray.600">
                  Компонент для управления {selectedSection} будет добавлен здесь.
                </Text>
              </CardBody>
            </Card>
          </VStack>
        );
    }
  };

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <Box maxW="1200px" mx="auto">
        {renderSectionContent()}
      </Box>
    </Box>
  );
};
