import React from "react";
import { Card, CardBody, HStack, Input, Button } from "@chakra-ui/react";
import { Paperclip, Smile, Send } from "lucide-react";

interface ChatInputProps {
  messageText: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  messageText,
  onMessageChange,
  onSendMessage,
}) => (
  <Card mt={4}>
    <CardBody pt={4}>
      <HStack spacing={3}>
        <Button size="sm" variant="ghost">
          <Paperclip size={16} />
        </Button>
        <Input
          placeholder="Введите сообщение..."
          value={messageText}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
        />
        <Button size="sm" variant="ghost">
          <Smile size={16} />
        </Button>
        <Button
          colorScheme="blue"
          onClick={onSendMessage}
          isDisabled={!messageText.trim()}
        >
          <Send size={16} />
        </Button>
      </HStack>
    </CardBody>
  </Card>
);
