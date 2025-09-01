import React from "react";
import { Card, CardBody, VStack, Box, Text } from "@chakra-ui/react";

export interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => (
  <Card>
    <CardBody flex={1} overflowY="auto" pt={0}>
      <VStack spacing={4} align="stretch">
        {messages.map(message => (
          <Box
            key={message.id}
            alignSelf={message.isOwn ? "flex-end" : "flex-start"}
            maxW="70%"
          >
            <Box
              bg={message.isOwn ? "blue.500" : "gray.100"}
              color={message.isOwn ? "white" : "black"}
              p={3}
              borderRadius="lg"
              borderBottomRightRadius={message.isOwn ? "sm" : "lg"}
              borderBottomLeftRadius={message.isOwn ? "lg" : "sm"}
            >
              <Text fontSize="sm">{message.text}</Text>
            </Box>
            <Text fontSize="xs" color="gray.500" mt={1} textAlign={message.isOwn ? "right" : "left"}>
              {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </Box>
        ))}
      </VStack>
    </CardBody>
  </Card>
);
