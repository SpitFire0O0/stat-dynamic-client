// Фикстуры для раздела «Кружки» (матрица активности, заметки и достижения)
export const clubs = [
  {
    id: 'club-math-5-extended',
    title: 'Математика — 5 класс — углубленная',
    municipality: 'Таганрог',
    students: [
      { id: 'u-student-1', name: 'Иванов П.', activityScore: 87, missedHomework: 1 },
      { id: 'u-student-2', name: 'Сидорова А.', activityScore: 74, missedHomework: 3 },
    ],
  },
];

// Заметки учителя по месяцам: плюсы/минусы
export const teacherNotes = [
  {
    clubId: 'club-math-5-extended',
    byMonth: {
      '2025-01': { plus: 'Отличная активность', minus: 'Опоздания' },
      '2025-02': { plus: 'Улучшение по задачам', minus: 'Нет' },
    },
  },
];

// Достижения/трудности ученика, сгруппированные по месяцам
export const studentAchievements = [
  {
    studentId: 'u-student-1',
    byMonth: {
      '2025-01': { achievements: ['Участие в олимпиаде'], issues: ['Ошибки в дробях'] },
      '2025-02': { achievements: ['1 место в конкурсе'], issues: [] },
    },
  },
];
