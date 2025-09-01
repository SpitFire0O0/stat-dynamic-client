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
  Button, 
  FormControl,
  Select,
  Textarea
} from "@chakra-ui/react";
import { Contact } from "./ContactsList";

interface NewMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: Contact[];
  newMessageText: string;
  onNewMessageChange: (text: string) => void;
}

export const NewMessageModal: React.FC<NewMessageModalProps> = ({
  isOpen,
  onClose,
  contacts,
  newMessageText,
  onNewMessageChange,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} size="md">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Новое сообщение</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <VStack spacing={4}>
          <FormControl>
            <Text mb={2} fontWeight="semibold">Кому:</Text>
            <Select placeholder="Выберите получателя">
              {contacts.map(contact => (
                <option key={contact.id} value={contact.id}>
                  {contact.name} - {contact.role}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Text mb={2} fontWeight="semibold">Сообщение:</Text>
            <Textarea
              placeholder="Введите текст сообщения..."
              value={newMessageText}
              onChange={(e) => onNewMessageChange(e.target.value)}
              rows={4}
            />
          </FormControl>
          <HStack spacing={3} w="full">
            <Button variant="outline" flex={1} onClick={onClose}>
              Отмена
            </Button>
            <Button colorScheme="blue" flex={1} isDisabled={!newMessageText.trim()}>
              Отправить
            </Button>
          </HStack>
        </VStack>
      </ModalBody>
    </ModalContent>
  </Modal>
);
