// Декларативное описание навигации (основное меню и подменю).
// Иконки задаются строковым ключом (см. icons.ts), права — через роли.
import type { IconKey } from './icons';
import type { UserRole } from './roles';

export interface NavItem {
  id: number;
  label: string;
  url: string;
  icon: IconKey;
  roles?: UserRole[] | ['*'];
  sub?: Array<{ id: number; label: string; url: string; icon: IconKey }>;
}

export const navigation: NavItem[] = [
  {
    id: 0,
    label: 'Главная',
    url: '/',
    icon: 'house',
    roles: ['*'],
    sub: [{ id: 0, label: 'Новости', url: '/', icon: 'house' }],
  },
  {
    id: 1,
    label: 'Профиль',
    url: '/profile',
    icon: 'profile',
    roles: ['*'],
    sub: [
      { id: 0, label: 'Профиль', url: '/profile', icon: 'profile' },
      { id: 1, label: 'Расписание', url: '/schedule', icon: 'calendarDays' },
      { id: 2, label: 'Задания', url: '/profile/homework', icon: 'bookMarked' },
      { id: 3, label: 'Сообщения', url: '/messages', icon: 'message' },
      { id: 4, label: 'Настройки', url: '/profile/settings', icon: 'settings' },
    ],
  },
  {
    id: 2,
    label: 'Расписание',
    url: '/schedule',
    icon: 'calendarCheck',
    roles: ['*'],
    sub: [
      { id: 0, label: 'Для студентов', url: '/schedule?type=student', icon: 'users' },
      { id: 1, label: 'Для преподавателей', url: '/schedule?type=teacher', icon: 'graduationCap' },
    ],
  },
  {
    id: 3,
    label: 'Библиотека',
    url: '/docs',
    icon: 'library',
    roles: ['*'],
    sub: [
      { id: 0, label: 'Все', url: '/docs', icon: 'bookCopy' },
      { id: 1, label: 'Программа', url: '/docs', icon: 'bookMarked' },
      { id: 2, label: 'Избранное', url: '/docs', icon: 'star' },
    ],
  },
  {
    id: 4,
    label: 'Кружки',
    url: '/clubs',
    icon: 'messageSquare',
    roles: ['*'],
  },
  {
    id: 5,
    label: 'Настройки',
    url: '/settings',
    icon: 'monitorCog',
    roles: ['*'],
    sub: [
      { id: 0, label: 'Внешний вид', url: '/settings#appearance', icon: 'paintbrush' },
      { id: 1, label: 'Звук', url: '/settings#sound', icon: 'volume' },
      { id: 2, label: 'Язык', url: '/settings#language', icon: 'globe' },
      { id: 3, label: 'Производительность', url: '/settings#performance', icon: 'database' },
      { id: 4, label: 'Конфиденциальность', url: '/settings#privacy', icon: 'shield' },
    ],
  },
  {
    id: 6,
    label: 'Админка',
    url: '/admin/crud',
    icon: 'settings',
    roles: ['ADMIN'],
    sub: [
      { id: 0, label: 'CRUD', url: '/admin/crud', icon: 'settings' },
    ],
  },
];
