import React from "react";
import { Card, CardHeader, CardBody, HStack, VStack, Heading, Text, Badge, Box } from "@chakra-ui/react";
import { BookOpen, CheckCircle, AlertCircle } from "lucide-react";

export interface HomeworkItem {
  subject: string;
  task: string;
  due: string;
  status: "pending" | "completed";
}

interface HomeworkListProps {
  items: HomeworkItem[];
}

export const HomeworkList: React.FC<HomeworkListProps> = ({ items }) => (
  <Card>
    <CardHeader>
      <HStack>
        <BookOpen size={20} className="text-[var(--primary-color)]" />
        <Heading size="md">Домашние задания</Heading>
      </HStack>
    </CardHeader>
    <CardBody>
      <VStack spacing={4} align="stretch">
        {items.map((task, index) => (
          <Box
            key={index}
            p={4}
            border="1px solid"
            borderColor={task.status === "completed" ? "green.200" : "orange.200"}
            borderRadius="md"
            bg={task.status === "completed" ? "green.50" : "orange.50"}
          >
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <HStack spacing={2}>
                  <Text fontWeight="semibold">{task.subject}</Text>
                  {task.status === "completed" ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : (
                    <AlertCircle size={16} className="text-orange-600" />
                  )}
                </HStack>
                <Text fontSize="sm">{task.task}</Text>
              </VStack>
              <VStack align="end" spacing={1}>
                <Text fontSize="sm" fontWeight="semibold">
                  Сдать до: {task.due}
                </Text>
                <Badge 
                  colorScheme={task.status === "completed" ? "green" : "orange"}
                  size="sm"
                >
                  {task.status === "completed" ? "Выполнено" : "В работе"}
                </Badge>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </CardBody>
  </Card>
);


