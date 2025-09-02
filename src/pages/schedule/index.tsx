import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDisclosure, Button, HStack } from "@chakra-ui/react";
import { ScheduleHeader } from "./components/ScheduleHeader";
import { ScheduleFilters } from "./components/ScheduleFilters";
import { WeekNavigation } from "./components/WeekNavigation";
import { LessonsGrid, type Lesson } from "./components/LessonsGrid";
import { DayStats } from "./components/DayStats";
import { LessonModal } from "./components/LessonModal";
import { useMeetings } from "../../_api/hooks/useMeetings";
import { useGroups } from "../../_api/hooks/useGroups";
import { useUsers } from "../../_api/hooks/useUsers";
import { MeetingFormModal } from "./components/MeetingFormModal";
import { useAuth } from "../../hooks/useAuth";

export const SchedulePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string>("Понедельник");
  const [scheduleType, setScheduleType] = useState<"student" | "teacher">("student");
  const [selectedGroup, setSelectedGroup] = useState<string>("10А");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("Иванов А.Д.");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const createModal = useDisclosure();
  const { user } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Читаем тип из URL при загрузке компонента
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'teacher' || type === 'student') {
      setScheduleType(type);
    }
  }, [searchParams]);

  // Группы и преподаватели из API (с фолбэком на статичные списки)
  const { list: groupsQuery } = useGroups();
  const { list: usersQuery } = useUsers();
  const groups = useMemo(() => {
    const arr = (groupsQuery.data as any[]) || [];
    const names = arr.map((g) => g.name).filter(Boolean);
    return names.length ? names : ["10А", "10Б", "10В", "11А", "11Б", "11В", "9А", "9Б", "9В"];
  }, [groupsQuery.data]);
  const teachers = useMemo(() => {
    const arr = (usersQuery.data as any[]) || [];
    const names = arr.filter((u) => u.permissions === 'TEACHER').map((u) => `${u.firstName} ${u.lastName}`.trim());
    return names.length ? names : ["Иванов А.Д.", "Петров В.С.", "Козлов И.П.", "Сидорова Е.М.", "Смирнова О.Л.", "Волкова Н.К."];
  }, [usersQuery.data]);
  
  // Интеграция с API встреч/уроков
  const { list: meetingsQuery } = useMeetings();

  // Fallback мок-данные, если API пустой
  const mockLessons: Lesson[] = [
    // 10А
    {
      id: 1,
      day: "Понедельник",
      time: "08:30 - 09:15",
      subject: "Алгебра",
      teacher: "Иванов А.Д.",
      room: "204",
      type: "Урок",
      description: "Решение квадратных уравнений",
      homework: "№15-20 стр. 45",
      group: "10А"
    },
    {
      id: 2,
      day: "Понедельник",
      time: "09:25 - 10:10",
      subject: "Физика",
      teacher: "Петров В.С.",
      room: "301",
      type: "Урок",
      description: "Законы Ньютона",
      homework: "Лабораторная работа №3",
      group: "10А"
    },
    // 10Б
    {
      id: 3,
      day: "Понедельник",
      time: "08:30 - 09:15",
      subject: "Химия",
      teacher: "Козлов И.П.",
      room: "401",
      type: "Урок",
      description: "Органическая химия",
      homework: "Подготовить доклад",
      group: "10Б"
    },
    {
      id: 4,
      day: "Понедельник",
      time: "09:25 - 10:10",
      subject: "История",
      teacher: "Сидорова Е.М.",
      room: "105",
      type: "Урок",
      description: "Россия в XIX веке",
      group: "10Б"
    },
    // 11А
    {
      id: 5,
      day: "Понедельник",
      time: "08:30 - 09:15",
      subject: "Алгебра",
      teacher: "Иванов А.Д.",
      room: "205",
      type: "Контрольная",
      description: "Контрольная работа по теме",
      group: "11А"
    },
    {
      id: 6,
      day: "Понедельник",
      time: "09:25 - 10:10",
      subject: "Физика",
      teacher: "Петров В.С.",
      room: "302",
      type: "Лабораторная",
      description: "Измерение ускорения",
      group: "11А"
    },
    // 9А
    {
      id: 7,
      day: "Понедельник",
      time: "08:30 - 09:15",
      subject: "Геометрия",
      teacher: "Смирнова О.Л.",
      room: "203",
      type: "Урок",
      description: "Теорема Пифагора",
      group: "9А"
    },
    {
      id: 8,
      day: "Понедельник",
      time: "09:25 - 10:10",
      subject: "Биология",
      teacher: "Волкова Н.К.",
      room: "303",
      type: "Урок",
      description: "Клеточное строение",
      group: "9А"
    }
  ];

  const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  const timeSlots = [
    "08:30 - 09:15",
    "09:25 - 10:10", 
    "10:20 - 11:05",
    "11:15 - 12:00",
    "12:10 - 12:55",
    "13:05 - 13:50",
    "14:00 - 14:45",
    "14:55 - 15:40"
  ];

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    onOpen();
  };

  // Helpers: start and end of week (Mon-Sun)
  const startOfWeek = (d: Date) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1) - day; // Monday as start
    date.setDate(date.getDate() + diff);
    date.setHours(0, 0, 0, 0);
    return date;
  };
  const endOfWeek = (d: Date) => {
    const s = startOfWeek(d);
    const e = new Date(s);
    e.setDate(e.getDate() + 6);
    e.setHours(23, 59, 59, 999);
    return e;
  };

  // Преобразуем встречи API -> формат Lesson для грида
  const apiLessons: Lesson[] = useMemo(() => {
    const meetings = (meetingsQuery.data as any[]) || [];
    const from = startOfWeek(currentWeek).getTime();
    const to = endOfWeek(currentWeek).getTime();
    return meetings.filter((m) => {
      const t = new Date(m.dateBegin).getTime();
      return t >= from && t <= to;
    }).map((m, idx) => {
      const start = new Date(m.dateBegin);
      // duration в API как string; по умолчанию 45 минут
      const durMs = Number(m.duration) || 45 * 60 * 1000;
      const end = new Date(start.getTime() + durMs);
      const time = `${start.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
      const weekdays = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
      const day = weekdays[start.getDay()] || "Понедельник";
       return {
         id: idx + 1000,
         day,
         time,
         subject: m.title || "Занятие",
         teacher: m.curatorName || "Преподаватель",
         room: m.room || "—",
         type: m.type || "Урок",
         description: m.content,
         homework: undefined,
         group: m.groupName || selectedGroup,
         meetingId: m.id,
       } as Lesson;
     });
  }, [meetingsQuery.data, selectedGroup, currentWeek]);

  const allLessons: Lesson[] = apiLessons.length ? apiLessons : mockLessons;

  const nextWeek = () => {
    const next = new Date(currentWeek);
    next.setDate(next.getDate() + 7);
    setCurrentWeek(next);
  };

  const prevWeek = () => {
    const prev = new Date(currentWeek);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeek(prev);
  };

  return (
    <div className="p-6 space-y-6">
      <HStack justify="space-between" align="center">
        <ScheduleHeader scheduleType={scheduleType} />
        {(user?.permissions === 'ADMIN' || user?.permissions === 'TEACHER') && (
          <Button colorScheme="blue" onClick={createModal.onOpen}>Добавить занятие</Button>
        )}
      </HStack>

      <ScheduleFilters
        scheduleType={scheduleType}
        selectedGroup={selectedGroup}
        selectedTeacher={selectedTeacher}
        selectedDay={selectedDay}
        groups={groups}
        teachers={teachers}
        days={days}
        onGroupChange={setSelectedGroup}
        onTeacherChange={setSelectedTeacher}
        onDayChange={setSelectedDay}
      />

      <WeekNavigation
        currentWeek={currentWeek}
        onPrevWeek={prevWeek}
        onNextWeek={nextWeek}
      />

      <LessonsGrid
        selectedDay={selectedDay}
        scheduleType={scheduleType}
        selectedGroup={selectedGroup}
        selectedTeacher={selectedTeacher}
        timeSlots={timeSlots}
        allLessons={allLessons}
        onLessonClick={handleLessonClick}
      />

      <DayStats
        selectedDay={selectedDay}
        scheduleType={scheduleType}
        selectedGroup={selectedGroup}
        selectedTeacher={selectedTeacher}
        allLessons={allLessons}
      />

      <LessonModal
        isOpen={isOpen}
        onClose={onClose}
        selectedLesson={selectedLesson}
      />

      <MeetingFormModal
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
        defaultDate={currentWeek}
      />
    </div>
  );
};
