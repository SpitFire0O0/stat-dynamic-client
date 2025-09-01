import React from "react";
import { Card, CardHeader, CardBody, HStack, VStack, Heading, Text, Badge, Box } from "@chakra-ui/react";
import { Bell } from "lucide-react";

export interface NotificationItem {
  id: number;
  text: string;
  time: string;
  type: "homework" | "grade" | "schedule";
}

interface NotificationsListProps {
  notifications: NotificationItem[];
}

export const NotificationsList: React.FC<NotificationsListProps> = ({ notifications }) => (
  <Card>
    <CardHeader>
      <HStack>
        <Bell size={20} className="text-[var(--primary-color)]" />
        <Heading size="md">Уведомления</Heading>
      </HStack>
    </CardHeader>
    <CardBody>
      <VStack spacing={4} align="stretch">
        {notifications.map((notification) => (
          <Box
            key={notification.id}
            p={3}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: "gray.50" }}
          >
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="sm">{notification.text}</Text>
                <Text fontSize="xs" color="gray.500">{notification.time}</Text>
              </VStack>
              <Badge 
                colorScheme={
                  notification.type === "homework" ? "orange" :
                  notification.type === "grade" ? "green" : "blue"
                }
                size="sm"
              >
                {notification.type === "homework" ? "ДЗ" :
                 notification.type === "grade" ? "Оценка" : "Расписание"}
              </Badge>
            </HStack>
          </Box>
        ))}
      </VStack>
    </CardBody>
  </Card>
);


