// Централизованный маппер иконок по строковым ключам.
// Позволяет хранить в конфиге только имя иконки, а не JSX.
import {
  BookCopy,
  BookMarked,
  CalendarCheck,
  CalendarDays,
  CircleUserRound,
  GraduationCap,
  House,
  LibraryBig,
  MonitorCog,
  Paintbrush,
  Settings,
  Star,
  Users,
  Volume2,
  MessageCircle,
  Globe,
  Database,
  Shield,
  MessageSquare,
  Award,
} from 'lucide-react';
import type { JSX } from 'react';

export type IconKey =
  | 'house'
  | 'profile'
  | 'calendarCheck'
  | 'calendarDays'
  | 'graduationCap'
  | 'bookCopy'
  | 'bookMarked'
  | 'library'
  | 'monitorCog'
  | 'paintbrush'
  | 'settings'
  | 'star'
  | 'users'
  | 'volume'
  | 'message'
  | 'globe'
  | 'database'
  | 'shield'
  | 'messageSquare'
  | 'award'
  ;

export const iconMap: Record<IconKey, JSX.Element> = {
  house: <House />,
  profile: <CircleUserRound />,
  calendarCheck: <CalendarCheck />,
  calendarDays: <CalendarDays />,
  graduationCap: <GraduationCap />,
  bookCopy: <BookCopy />,
  bookMarked: <BookMarked />,
  library: <LibraryBig />,
  monitorCog: <MonitorCog />,
  paintbrush: <Paintbrush />,
  settings: <Settings />,
  star: <Star />,
  users: <Users />,
  volume: <Volume2 />,
  message: <MessageCircle />,
  globe: <Globe />,
  database: <Database />,
  shield: <Shield />,
  messageSquare: <MessageSquare />,
  award: <Award />,
};

