// Утилиты доступа к админке на основе Roles конфига
import { Roles, type UserRole } from '../config/roles';

export const canAccessRoute = (role: UserRole, route: string): boolean => {
  const cfg = Roles[role];
  const routes = cfg.access.routes ?? [];
  return routes.includes('*') || routes.includes(route);
};

export const canAccessAdmin = (role: UserRole): boolean => canAccessRoute(role, '/admin');

