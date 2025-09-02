import type { NavItem } from '../config/navigation';
import { navigation } from '../config/navigation';
import { iconMap } from '../config/icons';
import type { UserRole } from '../config/roles';

// Проверка доступа по ролям для пункта меню
const allowByRole = (roles: NavItem['roles'], role: UserRole): boolean => {
  if (!roles || roles.includes('*')) return true;
  return roles.includes(role);
};

// Приводим декларативную навигацию к форме, которую ждут существующие Sidebar-компоненты
export const getSidebar = (role: UserRole) => {
  const items = navigation
    .filter((i) => allowByRole(i.roles, role))
    .map((i, idx) => ({
      id: idx,
      label: i.label,
      url: i.url,
      icon: iconMap[i.icon],
      sub: (i.sub ?? []).map((s, j) => ({ id: j, label: s.label, icon: iconMap[s.icon], url: s.url })),
    }));
  return items;
};

