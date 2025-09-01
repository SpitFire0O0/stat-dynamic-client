import React from "react";
import { Card, CardHeader, CardBody, HStack, VStack, Heading, Text, Badge } from "@chakra-ui/react";
import { Star } from "lucide-react";

export interface GradeItem {
  subject: string;
  grade: string;
  type: string;
  date: string;
}

interface RecentGradesProps {
  grades: GradeItem[];
}

export const RecentGrades: React.FC<RecentGradesProps> = ({ grades }) => (
  <Card>
    <CardHeader>
      <HStack>
        <Star size={20} className="text-[var(--primary-color)]" />
        <Heading size="md">Последние оценки</Heading>
      </HStack>
    </CardHeader>
    <CardBody>
      <VStack spacing={4} align="stretch">
        {grades.map((grade, index) => (
          <HStack key={index} justify="space-between" p={3} bg="gray.50" borderRadius="md">
            <VStack align="start" spacing={1}>
              <Text fontWeight="semibold">{grade.subject}</Text>
              <Text fontSize="sm" color="gray.600">{grade.type}</Text>
            </VStack>
            <VStack align="end" spacing={1}>
              <Badge 
                colorScheme={grade.grade === "5" ? "green" : grade.grade === "4" ? "blue" : "orange"}
                size="lg"
              >
                {grade.grade}
              </Badge>
              <Text fontSize="xs" color="gray.500">{grade.date}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </CardBody>
  </Card>
);


