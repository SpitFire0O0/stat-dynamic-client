import React from "react";
import { Card, CardHeader, CardBody, HStack, VStack, Heading, Text, Badge, Box, InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";
import { Search, MessageCircle } from "lucide-react";

export interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: 'online' | 'offline' | 'away';
  role: string;
}

interface ContactsListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  searchQuery: string;
  onContactSelect: (contact: Contact) => void;
  onSearchChange: (query: string) => void;
  onNewMessage: () => void;
}

export const ContactsList: React.FC<ContactsListProps> = ({
  contacts,
  selectedContact,
  searchQuery,
  onContactSelect,
  onSearchChange,
  onNewMessage,
}) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes} мин`;
    if (hours < 24) return `${hours} ч`;
    return `${days} дн`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'green';
      case 'away': return 'yellow';
      case 'offline': return 'gray';
      default: return 'gray';
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r border-gray-200 flex flex-col">
      <Card>
        <CardHeader pb={4}>
          <HStack justify="space-between">
            <Heading size="md">Сообщения</Heading>
            <Button size="sm" variant="ghost" onClick={onNewMessage}>
              <MessageCircle size={16} />
            </Button>
          </HStack>
          <InputGroup mt={4}>
            <Input
              placeholder="Поиск контактов..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <InputRightElement>
              <Search size={16} className="text-gray-400" />
            </InputRightElement>
          </InputGroup>
        </CardHeader>

        <CardBody pt={0} flex={1} overflowY="auto">
          <VStack spacing={2} align="stretch">
            {filteredContacts.map(contact => (
              <Box
                key={contact.id}
                p={3}
                borderRadius="md"
                cursor="pointer"
                bg={selectedContact?.id === contact.id ? "blue.50" : "transparent"}
                border={selectedContact?.id === contact.id ? "1px solid" : "1px solid transparent"}
                borderColor={selectedContact?.id === contact.id ? "blue.200" : "transparent"}
                onClick={() => onContactSelect(contact)}
                _hover={{ bg: "gray.50" }}
              >
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
                      {contact.name.charAt(0)}
                    </Box>
                    <Box
                      position="absolute"
                      bottom="0"
                      right="0"
                      w={3}
                      h={3}
                      bg={getStatusColor(contact.status)}
                      borderRadius="full"
                      border="2px solid white"
                    />
                  </Box>
                  <VStack align="start" spacing={1} flex={1} minW={0}>
                    <HStack justify="space-between" w="full">
                      <Text fontWeight="semibold" fontSize="sm" noOfLines={1}>
                        {contact.name}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {formatTime(contact.lastMessageTime)}
                      </Text>
                    </HStack>
                    <Text fontSize="xs" color="gray.600" noOfLines={1}>
                      {contact.role}
                    </Text>
                    <Text fontSize="sm" color="gray.600" noOfLines={1}>
                      {contact.lastMessage}
                    </Text>
                  </VStack>
                  {contact.unreadCount > 0 && (
                    <Badge colorScheme="blue" borderRadius="full" minW={5} h={5} display="flex" alignItems="center" justifyContent="center">
                      {contact.unreadCount}
                    </Badge>
                  )}
                </HStack>
              </Box>
            ))}
          </VStack>
        </CardBody>
      </Card>
    </div>
  );
};
