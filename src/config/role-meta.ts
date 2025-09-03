// Отображение ролей в человекочитаемый вид и цвет бейджа
export type Permission = 'ADMIN' | 'TEACHER' | 'PARENT' | 'STUDENT';

export const RoleMeta: Record<Permission, { label: string; color: string }> = {
  ADMIN:   { label: 'Администратор',   color: 'red' },
  TEACHER: { label: 'Преподаватель',   color: 'blue' },
  PARENT:  { label: 'Родитель',        color: 'green' },
  STUDENT: { label: 'Студент',         color: 'gray' },
};

export const getRoleLabel = (p: Permission) => RoleMeta[p].label;
export const getRoleColor = (p: Permission) => RoleMeta[p].color;

