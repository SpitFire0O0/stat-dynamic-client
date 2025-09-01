import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { ScheduleHeader } from "./components/ScheduleHeader";
import { ScheduleFilters } from "./components/ScheduleFilters";
import { WeekNavigation } from "./components/WeekNavigation";
import { LessonsGrid, type Lesson } from "./components/LessonsGrid";
import { DayStats } from "./components/DayStats";
import { LessonModal } from "./components/LessonModal";

export const SchedulePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string>("Понедельник");
  const [scheduleType, setScheduleType] = useState<"student" | "teacher">("student");
  const [selectedGroup, setSelectedGroup] = useState<string>("10А");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("Иванов А.Д.");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Читаем тип из URL при загрузке компонента
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'teacher' || type === 'student') {
      setScheduleType(type);
    }
  }, [searchParams]);

  // Все группы/классы
  const groups = ["10А", "10Б", "10В", "11А", "11Б", "11В", "9А", "9Б", "9В"];
  
  // Все преподаватели
  const teachers = ["Иванов А.Д.", "Петров В.С.", "Козлов И.П.", "Сидорова Е.М.", "Смирнова О.Л.", "Волкова Н.К."];

  // Расписание для всех групп
  const allLessons: Lesson[] = [
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
      <ScheduleHeader scheduleType={scheduleType} />

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
    </div>
  );
};