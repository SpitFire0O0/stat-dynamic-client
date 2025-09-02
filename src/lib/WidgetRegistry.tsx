// Реестр виджетов: строковый идентификатор → React-компонент.
// Существующие компоненты подключаем лениво через обёртки, чтобы не править их код.
import React from 'react';

// Widget ids to existing components. Extend as needed.
export type WidgetId =
  | 'home.stats'
  | 'home.upcoming-lessons'
  | 'home.recent-grades'
  | 'home.homework'
  | 'home.notifications'
  | 'home.quick-actions'
  | 'clubs.activity-table'
  | 'clubs.teacher-notes'
  | 'clubs.student-achievements'
  ;

// Унифицированные пропсы виджетов: передаём данные через поле data
export interface WidgetProps<T = any> { data?: T }

// Ленивые адаптеры для уже существующих компонентов домашней страницы
const HomeStats = React.lazy(() => import('../pages/home/components/StatsGrid').then(m => ({ default: m.StatsGrid as any })));
const UpcomingLessons = React.lazy(() => import('../pages/home/components/UpcomingLessons').then(m => ({ default: m.UpcomingLessons as any })));
const RecentGrades = React.lazy(() => import('../pages/home/components/RecentGrades').then(m => ({ default: m.RecentGrades as any })));
const HomeworkList = React.lazy(() => import('../pages/home/components/HomeworkList').then(m => ({ default: m.HomeworkList as any })));
const NotificationsList = React.lazy(() => import('../pages/home/components/NotificationsList').then(m => ({ default: m.NotificationsList as any })));
const QuickActions = React.lazy(() => import('../pages/home/components/QuickActions').then(m => ({ default: m.QuickActions as any })));

// Лёгкие плейсхолдеры для раздела «Кружки» (без вмешательства в стили)
const ClubsActivityTable: React.FC<WidgetProps> = ({ data }) => (
  <div>
    <strong>Активность по кружку</strong>
    <pre className="text-xs overflow-auto">{JSON.stringify(data, null, 2)}</pre>
  </div>
);
const ClubsTeacherNotes: React.FC<WidgetProps> = ({ data }) => (
  <div>
    <strong>Заметки учителя (плюсы/минусы)</strong>
    <pre className="text-xs overflow-auto">{JSON.stringify(data, null, 2)}</pre>
  </div>
);
const ClubsStudentAchievements: React.FC<WidgetProps> = ({ data }) => (
  <div>
    <strong>Достижения ученика по месяцам</strong>
    <pre className="text-xs overflow-auto">{JSON.stringify(data, null, 2)}</pre>
  </div>
);

export const WidgetRegistry: Record<WidgetId, React.ComponentType<WidgetProps>> = {
  'home.stats': HomeStats as any,
  'home.upcoming-lessons': UpcomingLessons as any,
  'home.recent-grades': RecentGrades as any,
  'home.homework': HomeworkList as any,
  'home.notifications': NotificationsList as any,
  'home.quick-actions': QuickActions as any,
  'clubs.activity-table': ClubsActivityTable,
  'clubs.teacher-notes': ClubsTeacherNotes,
  'clubs.student-achievements': ClubsStudentAchievements,
};
