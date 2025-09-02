import React, { useMemo } from "react";
import { Heading, Text } from "@chakra-ui/react";
import { TrendingUp, Star, CheckCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import type { User } from "../../store/auth.store";
import { StatsGrid } from "./components/StatsGrid";
import { UpcomingLessons } from "./components/UpcomingLessons";
import { RecentGrades } from "./components/RecentGrades";
import { HomeworkList } from "./components/HomeworkList";
import { NotificationsList } from "./components/NotificationsList";
import { QuickActions } from "./components/QuickActions";
import { useMeetings } from "../../_api/hooks/useMeetings";
import { useGrades } from "../../_api/hooks/useGrades";
import { useHomework } from "../../_api/hooks/useHomework";

export const HomePage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: "Средний балл",
      value: 4.8,
      icon: TrendingUp,
      color: "green"
    },
    {
      label: "Посещаемость",
      value: 95,
      icon: CheckCircle,
      color: "blue"
    },
    {
      label: "Домашние задания",
      value: 87,
      icon: Star,
      color: "orange"
    }
  ];

  const { list: meetingsQuery } = useMeetings();
  const upcomingLessons = useMemo(() => {
    const meetings = (meetingsQuery.data as any[]) || [];
    const today = new Date();
    const sameDay = (d: Date) => d.toDateString() === today.toDateString();
    const toItem = (m: any, idx: number) => {
      const start = new Date(m.dateBegin);
      const durMs = Number(m.duration) || 45 * 60 * 1000;
      const end = new Date(start.getTime() + durMs);
      return {
        id: idx + 1,
        subject: m.title || 'Занятие',
        teacher: m.curatorName || 'Преподаватель',
        time: `${start.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`,
        room: m.room || '—',
        type: m.type || 'Урок',
      };
    };
    const todays = meetings.filter((m) => {
      const d = new Date(m.dateBegin);
      return sameDay(d);
    });
    const items = todays.slice(0, 3).map(toItem);
    if (items.length) return items as any;
    // fallback demo
    return [
      { id: 1, subject: 'Алгебра', teacher: 'Иванов А.Д.', time: '08:30 - 09:15', room: '204', type: 'Урок' },
      { id: 2, subject: 'Физика', teacher: 'Петров В.С.', time: '09:25 - 10:10', room: '301', type: 'Лабораторная' },
      { id: 3, subject: 'История', teacher: 'Сидорова Е.М.', time: '10:20 - 11:05', room: '105', type: 'Урок' },
    ];
  }, [meetingsQuery.data]);

  const { list: gradesQuery } = useGrades();
  const recentGrades = useMemo(() => {
    const grades = (gradesQuery.data as any[]) || [];
    const items = grades.slice(0, 3).map((g) => ({
      subject: g.subject || 'Предмет',
      grade: g.grade || '-',
      type: g.type || 'Оценка',
      date: new Date(g.createdAt || Date.now()).toLocaleDateString('ru-RU'),
    }));
    return items.length ? items : [
      { subject: 'Алгебра', grade: '5', type: 'Контрольная работа', date: 'Сегодня' },
      { subject: 'Физика', grade: '4', type: 'Лабораторная работа', date: 'Вчера' },
      { subject: 'История', grade: '5', type: 'Доклад', date: '2 дня назад' },
    ];
  }, [gradesQuery.data]);

  const { list: homeworkQuery } = useHomework();
  const homeworkItems = useMemo(() => {
    const items = ((homeworkQuery.data as any[]) || []).slice(0, 3).map((h) => ({
      subject: h.subject || 'Предмет',
      task: h.content || h.title || 'Задание',
      due: new Date(h.dateEnd || Date.now()).toLocaleDateString('ru-RU'),
      status: 'pending' as const,
    }));
    return items.length ? items : [
      { subject: 'Алгебра', task: 'Решить задачи №15-20 стр. 45', due: 'Завтра', status: 'pending' as const },
      { subject: 'Физика', task: 'Подготовить отчет по лабораторной работе', due: 'Послезавтра', status: 'completed' as const },
      { subject: 'Химия', task: 'Изучить главу 5 учебника', due: 'Через 3 дня', status: 'pending' as const },
    ];
  }, [homeworkQuery.data]);

  const notifications = [
    {
      id: 1,
      text: "Новая оценка по алгебре",
      time: "5 минут назад",
      type: "grade" as const
    },
    {
      id: 2,
      text: "Домашнее задание по физике",
      time: "1 час назад",
      type: "homework" as const
    },
    {
      id: 3,
      text: "Изменение в расписании",
      time: "2 часа назад",
      type: "schedule" as const
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <Heading size="lg" color="[var(--primary-color)]">
          Добро пожаловать, {(user as User)?.firstName || 'Пользователь'}!
        </Heading>
        <Text color="gray.600">Вот что происходит сегодня</Text>
      </div>

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingLessons lessons={upcomingLessons} />
        <RecentGrades grades={recentGrades} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HomeworkList items={homeworkItems} />
        <NotificationsList notifications={notifications} />
      </div>

      <QuickActions />
    </div>
  );
};
