import React from "react";
import { Card, CardHeader, HStack, VStack, Text, Button, Box } from "@chakra-ui/react";
import { Phone, Video, MoreVertical } from "lucide-react";
import { Contact } from "./ContactsList";

interface ChatHeaderProps {
  selectedContact: Contact;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedContact }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'green';
      case 'away': return 'yellow';
      case 'offline': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <Card>
      <CardHeader pb={4}>
        <HStack justify="space-between">
          <HStack spacing={3}>
            <Box position="relative">
              <Box
                w={10}
                h={10}
                borderRadius="full"
                bg="gray.300"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="sm"
                fontWeight="semibold"
              >
                {selectedContact.name.charAt(0)}
              </Box>
              <Box
                position="absolute"
                bottom="0"
                right="0"
                w={3}
                h={3}
                bg={getStatusColor(selectedContact.status)}
                borderRadius="full"
                border="2px solid white"
              />
            </Box>
            <VStack align="start" spacing={0}>
              <Text fontWeight="semibold">{selectedContact.name}</Text>
              <Text fontSize="sm" color="gray.600">{selectedContact.role}</Text>
            </VStack>
          </HStack>
          <HStack spacing={2}>
            <Button size="sm" variant="ghost">
              <Phone size={16} />
            </Button>
            <Button size="sm" variant="ghost">
              <Video size={16} />
            </Button>
            <Button size="sm" variant="ghost">
              <MoreVertical size={16} />
            </Button>
          </HStack>
        </HStack>
      </CardHeader>
    </Card>
  );
};
