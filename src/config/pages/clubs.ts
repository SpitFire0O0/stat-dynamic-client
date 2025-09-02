// Декларативная схема страницы «Кружки».
import type { PageSchema } from '../../components/page-scaffold';
import { clubs, teacherNotes, studentAchievements } from '../../fixtures/clubs';

export const clubsPageSchema: PageSchema = {
  title: 'Кружки',
  sections: [
    {
      id: 'activity',
      title: 'Таблица активности',
      widget: 'clubs.activity-table',
      data: { clubs },
    },
    {
      id: 'notes',
      title: 'Заметки учителя (плюсы/минусы)',
      widget: 'clubs.teacher-notes',
      data: { teacherNotes },
    },
    {
      id: 'achievements',
      title: 'Достижения/трудности учеников по месяцам',
      widget: 'clubs.student-achievements',
      data: { studentAchievements },
    },
  ],
};
