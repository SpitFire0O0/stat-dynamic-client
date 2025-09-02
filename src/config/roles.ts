// Роли пользователей в UI (декларативно).
// Важно: роль CURATOR добавлена только для интерфейса (в Prisma её сейчас нет).
export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT' | 'CURATOR';

export interface RoleConfig {
  // Человекочитаемое имя роли
  label: string;
  // Короткое описание назначения роли
  description?: string;
  // Права доступа в терминах маршрутов/виджетов/разделов
  access: {
    // Разрешённые маршруты (поддержка '*' для полного доступа)
    routes?: string[];
    // Разрешённые виджеты (по их идентификаторам; поддержка '*')
    widgets?: string[];
    // Разделы админки для роли (поддержка '*')
    adminSections?: string[];
  };
}

export const Roles: Record<UserRole, RoleConfig> = {
  ADMIN: {
    label: 'Администратор',
    access: { routes: ['*'], widgets: ['*'], adminSections: ['*'] },
  },
  TEACHER: {
    label: 'Учитель',
    access: { routes: ['/', '/profile', '/schedule', '/messages', '/docs', '/clubs'], widgets: ['*'] },
  },
  STUDENT: {
    label: 'Ученик',
    access: { routes: ['/', '/profile', '/schedule', '/messages', '/docs', '/clubs'], widgets: ['*'] },
  },
  PARENT: {
    label: 'Родитель',
    access: { routes: ['/', '/profile', '/schedule', '/messages', '/docs', '/clubs'], widgets: ['*'] },
  },
  CURATOR: {
    label: 'Куратор',
    access: { routes: ['/', '/profile', '/schedule', '/messages', '/docs', '/clubs'], widgets: ['*'] },
  },
};
