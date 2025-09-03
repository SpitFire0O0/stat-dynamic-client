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
  Avatar,
  Divider,
  Box,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield,
  Clock
} from "lucide-react";
import type { AdminUser } from "../types";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  user
}) => {
  if (!user) return null;

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Информация о пользователе</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={6} align="stretch">
            {/* Заголовок с аватаром */}
            <Box textAlign="center">
              <Avatar 
                size="2xl" 
                name={`${user.firstName} ${user.lastName}`}
                mb={4}
              />
              <Text fontSize="xl" fontWeight="bold">
                {user.firstName} {user.lastName}
              </Text>
              <Badge 
                colorScheme={getPermissionColor(user.permissions)}
                fontSize="md"
                p={2}
                mt={2}
              >
                {getPermissionLabel(user.permissions)}
              </Badge>
            </Box>

            <Divider />

            {/* Основная информация */}
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" fontWeight="semibold" mb={2}>
                Основная информация
              </Text>
              
              <Grid templateColumns="1fr 1fr" gap={4}>
                <GridItem>
                  <HStack spacing={3}>
                    <User size={16} className="text-gray-500" />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" color="gray.600">Пол</Text>
                      <Text fontWeight="medium">
                        {user.gender === "MALE" ? "Мужской" : "Женский"}
                      </Text>
                    </VStack>
                  </HStack>
                </GridItem>

                <GridItem>
                  <HStack spacing={3}>
                    <Mail size={16} className="text-gray-500" />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" color="gray.600">Email</Text>
                      <Text fontWeight="medium">{user.login}</Text>
                    </VStack>
                  </HStack>
                </GridItem>

                {user.phone && (
                  <GridItem>
                    <HStack spacing={3}>
                      <Phone size={16} className="text-gray-500" />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" color="gray.600">Телефон</Text>
                        <Text fontWeight="medium">{user.phone}</Text>
                      </VStack>
                    </HStack>
                  </GridItem>
                )}

                {user.address && (
                  <GridItem>
                    <HStack spacing={3}>
                      <MapPin size={16} className="text-gray-500" />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" color="gray.600">Адрес</Text>
                        <Text fontWeight="medium">{user.address}</Text>
                      </VStack>
                    </HStack>
                  </GridItem>
                )}
              </Grid>
            </VStack>

            <Divider />

            {/* Системная информация */}
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" fontWeight="semibold" mb={2}>
                Системная информация
              </Text>
              
              <VStack spacing={3} align="stretch">
                <HStack spacing={3}>
                  <Shield size={16} className="text-gray-500" />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" color="gray.600">ID пользователя</Text>
                    <Text fontWeight="medium" fontFamily="mono">{user.id}</Text>
                  </VStack>
                </HStack>

                <HStack spacing={3}>
                  <Calendar size={16} className="text-gray-500" />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" color="gray.600">Дата создания</Text>
                    <Text fontWeight="medium">{formatDate(user.createdAt)}</Text>
                  </VStack>
                </HStack>

                <HStack spacing={3}>
                  <Clock size={16} className="text-gray-500" />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" color="gray.600">Последнее обновление</Text>
                    <Text fontWeight="medium">{formatDate(user.updatedAt)}</Text>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
