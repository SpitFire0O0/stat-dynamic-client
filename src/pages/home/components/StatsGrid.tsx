import React from "react";
import { Card, CardBody, HStack, VStack, Text, Box, Grid } from "@chakra-ui/react";

type StatItem = {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
};

interface StatsGridProps {
  stats: StatItem[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardBody>
            <HStack spacing={4}>
              <Box
                w={12}
                h={12}
                bg={`${stat.color}.100`}
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <stat.icon size={24} className={`text-${stat.color}-600`} />
              </Box>
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="bold">
                  {stat.value}{stat.label === "Средний балл" ? "" : "%"}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {stat.label}
                </Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
      ))}
    </Grid>
  );
};


