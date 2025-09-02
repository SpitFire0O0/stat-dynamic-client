// Минимальные фикстуры пользователей (согласованы по полям с Prisma-моделью)
export const users = [
  {
    id: 'u-admin',
    login: 'admin@example.com',
    firstName: 'Админ',
    lastName: 'Системы',
    permissions: 'ADMIN',
  },
  {
    id: 'u-teacher-1',
    login: 'teacher@example.com',
    firstName: 'Иван',
    lastName: 'Иванов',
    permissions: 'TEACHER',
  },
  {
    id: 'u-student-1',
    login: 'student@example.com',
    firstName: 'Петр',
    lastName: 'Петров',
    permissions: 'STUDENT',
  },
];
