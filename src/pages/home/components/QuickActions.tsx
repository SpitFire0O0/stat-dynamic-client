import React from "react";
import { Card, CardHeader, CardBody, Heading, Grid, Button } from "@chakra-ui/react";
import { Calendar, BookOpen, MessageCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Быстрые действия</Heading>
      </CardHeader>
      <CardBody>
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
          <Button leftIcon={<Calendar size={16} />} colorScheme="blue" variant="outline" size="lg" onClick={() => navigate('/schedule')}>
            Посмотреть расписание
          </Button>
          <Button leftIcon={<BookOpen size={16} />} colorScheme="green" variant="outline" size="lg" onClick={() => navigate('/docs')}>
            Библиотека
          </Button>
          <Button leftIcon={<MessageCircle size={16} />} colorScheme="purple" variant="outline" size="lg" onClick={() => navigate('/profile')}>
            Профиль и сообщения
          </Button>
          <Button leftIcon={<User size={16} />} colorScheme="orange" variant="outline" size="lg" onClick={() => navigate('/settings')}>
            Настройки
          </Button>
        </Grid>
      </CardBody>
    </Card>
  );
}


