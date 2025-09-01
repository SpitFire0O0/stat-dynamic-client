import React from "react";
import { Card, CardBody, HStack, VStack, Text, Button } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeekNavigationProps {
  currentWeek: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

export const WeekNavigation: React.FC<WeekNavigationProps> = ({
  currentWeek,
  onPrevWeek,
  onNextWeek,
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <Card>
      <CardBody>
        <HStack justify="space-between" align="center">
          <Button 
            leftIcon={<ChevronLeft size={16} />} 
            variant="outline"
            onClick={onPrevWeek}
          >
            Предыдущая неделя
          </Button>
          <VStack spacing={1}>
            <Text fontWeight="semibold">
              {formatDate(currentWeek)}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Неделя {Math.ceil((currentWeek.getDate() + currentWeek.getDay()) / 7)}
            </Text>
          </VStack>
          <Button 
            rightIcon={<ChevronRight size={16} />} 
            variant="outline"
            onClick={onNextWeek}
          >
            Следующая неделя
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
};
