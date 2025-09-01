import {
	BookCopy,
	BookMarked,
	CalendarCheck,
	CalendarDays,
	CircleUserRound, GraduationCap,
	House,
	LibraryBig,
	MonitorCog, Paintbrush,
	Settings, Star, Users, Volume2,
	MessageCircle,
	Globe,
	Database,
	Shield
} from "lucide-react";
import React, {type JSX} from "react";

interface IBaseMenuItem {
	id: number;
	label: string;
	url: string;
	icon: JSX.Element;
	sub: ISubMenuItem[];
}

interface ISubMenuItem {
	id: number;
	label: string;
	icon: JSX.Element;
	url?: string;
}

export const sidebar: IBaseMenuItem[] = [
	{id: 0, label: 'Главная', url: '/', icon: <House/>, sub: [
		{ id: 0, label: 'Новости', icon: <House/>, url: '/' },
	]},
	{id: 1, label: 'Профиль', url: '/profile', icon: <CircleUserRound />, sub: [
		{ id: 0, label: 'Профиль', icon: <CircleUserRound />, url: '/profile' },
		{ id: 1, label: 'Расписание', icon: <CalendarDays />, url: '/schedule' },
		{ id: 2, label: 'Задания', icon: <BookMarked />, url: '/profile/homework' },
		{ id: 3, label: 'Сообщения', icon: <MessageCircle />, url: '/messages' },
		{ id: 4, label: 'Настройки', icon: <Settings />, url: '/profile/settings' },
	]},
	{id: 2, label: 'Расписание', url: '/schedule', icon: <CalendarCheck />, sub: [
			{ id: 0, label: 'Для студентов', icon: <Users />, url: '/schedule?type=student' },
			{ id: 1, label: 'Для преподавателей', icon: <GraduationCap />, url: '/schedule?type=teacher' },
	]},
	{id: 3, label: 'Библиотека', url: '/docs', icon: <LibraryBig />, sub: [
		{ id: 0, label: 'Все', icon: <BookCopy />, url: '/docs' },
		{ id: 1, label: 'Программа', icon: <BookMarked />, url: '/docs' },
		{ id: 2, label: 'Избранное', icon: <Star />, url: '/docs' },
	]},
	{id: 4, label: 'Настройки', url: '/settings', icon: <MonitorCog />, sub: [
		{ id: 0, label: 'Внешний вид', icon: <Paintbrush />, url: '/settings#appearance' },
		{ id: 1, label: 'Звук', icon: <Volume2 />, url: '/settings#sound' },
		{ id: 2, label: 'Язык', icon: <Globe />, url: '/settings#language' },
		{ id: 3, label: 'Производительность', icon: <Database />, url: '/settings#performance' },
		{ id: 4, label: 'Конфиденциальность', icon: <Shield />, url: '/settings#privacy' },
	]},
]


export interface IMenuItem {
	id: number;
	link: string;
	label: string;
	icon: JSX.Element;
}

export const mainMenuItems: IMenuItem[] = [
	{ id: 0, link: '/', label: 'Главная', icon: <House /> },
	{ id: 1, link: '/schedule', label: 'Расписание', icon: <CalendarCheck /> },
	{ id: 2, link: '/docs', label: 'Библиотека', icon: <LibraryBig /> },
	{ id: 3, link: '/settings', label: 'Настройки', icon: <MonitorCog /> },
]

export interface IProfileSubMenuItem {
	id: number;
	// link: string;
	label: string;
	icon: JSX.Element;
}

export const subMenuItems: IProfileSubMenuItem[] = [
	{ id: 0, label: 'Профиль', icon: <CircleUserRound /> },
	{ id: 1, label: 'Расписание', icon: <CalendarDays /> },
	{ id: 2, label: 'Задания', icon: <BookMarked /> },
	{ id: 3, label: 'Сообщения', icon: <MessageCircle /> },
	{ id: 4, label: 'Настройки', icon: <Settings /> },
]