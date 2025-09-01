import React, { useState } from "react";
import { VStack, Text } from "@chakra-ui/react";
import { MessageCircle } from "lucide-react";
import { ContactsList, type Contact } from "./components/ContactsList";
import { ChatHeader } from "./components/ChatHeader";
import { ChatMessages, type Message } from "./components/ChatMessages";
import { ChatInput } from "./components/ChatInput";
import { NewMessageModal } from "./components/NewMessageModal";

export const MessagesPage: React.FC = () => {
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessageText, setNewMessageText] = useState("");

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Иванов А.Д.",
      avatar: "https://bit.ly/dan-abramov",
      lastMessage: "Доброе утро! Как дела с домашним заданием?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 минут назад
      unreadCount: 2,
      status: 'online',
      role: 'Преподаватель математики'
    },
    {
      id: 2,
      name: "Петров В.С.",
      avatar: "https://bit.ly/ryan-florence",
      lastMessage: "Лабораторная работа готова",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 часа назад
      unreadCount: 0,
      status: 'away',
      role: 'Преподаватель физики'
    },
    {
      id: 3,
      name: "Сидорова Е.М.",
      avatar: "https://bit.ly/prosper-baba",
      lastMessage: "Отличная работа на контрольной!",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 день назад
      unreadCount: 1,
      status: 'offline',
      role: 'Преподаватель истории'
    },
    {
      id: 4,
      name: "Козлов И.П.",
      avatar: "https://bit.ly/code-beast",
      lastMessage: "Подготовьтесь к завтрашнему уроку",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 дня назад
      unreadCount: 0,
      status: 'offline',
      role: 'Преподаватель химии'
    }
  ];

  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0]);

  const messages: Message[] = [
    {
      id: 1,
      text: "Доброе утро! Как дела с домашним заданием?",
      sender: "Иванов А.Д.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isOwn: false
    },
    {
      id: 2,
      text: "Доброе утро! Почти закончил, осталось решить последние 2 задачи",
      sender: "Вы",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      isOwn: true
    },
    {
      id: 3,
      text: "Отлично! Если будут вопросы, обращайтесь",
      sender: "Иванов А.Д.",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      isOwn: false
    },
    {
      id: 4,
      text: "Спасибо! Обязательно",
      sender: "Вы",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      isOwn: true
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim() && selectedContact) {
      // Здесь будет логика отправки сообщения
      console.log('Отправка сообщения:', messageText);
      setMessageText("");
    }
  };

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleNewMessage = () => {
    // Логика открытия модального окна нового сообщения
    console.log('Открытие нового сообщения');
  };

  return (
    <div className="h-full flex gap-4">
      <ContactsList
        contacts={contacts}
        selectedContact={selectedContact}
        searchQuery={searchQuery}
        onContactSelect={handleContactSelect}
        onSearchChange={setSearchQuery}
        onNewMessage={handleNewMessage}
      />

      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            <ChatHeader selectedContact={selectedContact} />
            <ChatMessages messages={messages} />
            <ChatInput
              messageText={messageText}
              onMessageChange={setMessageText}
              onSendMessage={handleSendMessage}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <VStack spacing={4}>
              <MessageCircle size={64} className="text-gray-300" />
              <Text fontSize="lg" color="gray.500">Выберите контакт для начала чата</Text>
            </VStack>
          </div>
        )}
      </div>

      <NewMessageModal
        isOpen={false} // Здесь нужно добавить состояние для модального окна
        onClose={() => {}}
        contacts={contacts}
        newMessageText={newMessageText}
        onNewMessageChange={setNewMessageText}
      />
    </div>
  );
};
