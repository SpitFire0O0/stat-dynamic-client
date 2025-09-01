import React, { useState } from "react";
import { 
	Card, 
	CardBody, 
	CardHeader, 
	Heading, 
	Text, 
	Badge, 
	HStack, 
	VStack,
	Grid,
	GridItem,
	Button,
	Select,
	Flex,
	Box,
	Divider,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Alert,
	AlertIcon
} from "@chakra-ui/react";
import { 
	Calendar, 
	Clock, 
	MapPin, 
	User, 
	BookOpen, 
	ChevronLeft, 
	ChevronRight,
	Info,
	Bell
} from "lucide-react";

interface Lesson {
	id: number;
	day: string;
	time: string;
	subject: string;
	teacher: string;
	room: string;
	type: string;
	description?: string;
	homework?: string;
	grade?: string;
}

export const ScheduleDetailedPage: React.FC = () => {
	const [currentWeek, setCurrentWeek] = useState(new Date());
	const [selectedDay, setSelectedDay] = useState<string>("Понедельник");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

	const lessons: Lesson[] = [
		{
			id: 1,
			day: "Понедельник",
			time: "08:30 - 09:15",
			subject: "Алгебра",
			teacher: "Иванов А.Д.",
			room: "204",
			type: "Урок",
			description: "Решение квадратных уравнений",
			homework: "№15-20 стр. 45"
		},
		{
			id: 2,
			day: "Понедельник",
			time: "09:25 - 10:10",
			subject: "Физика",
			teacher: "Петров В.С.",
			room: "301",
			type: "Урок",
			description: "Законы Ньютона",
			homework: "Лабораторная работа №3"
		},
		{
			id: 3,
			day: "Понедельник",
			time: "10:20 - 11:05",
			subject: "История",
			teacher: "Сидорова Е.М.",
			room: "105",
			type: "Урок",
			description: "Россия в XIX веке"
		},
		{
			id: 4,
			day: "Вторник",
			time: "08:30 - 09:15",
			subject: "Химия",
			teacher: "Козлов И.П.",
			room: "401",
			type: "Урок",
			description: "Органическая химия",
			homework: "Подготовить доклад"
		},
		{
			id: 5,
			day: "Вторник",
			time: "09:25 - 10:10",
			subject: "Литература",
			teacher: "Морозова А.В.",
			room: "203",
			type: "Урок",
			description: "Анализ произведения"
		},
		{
			id: 6,
			day: "Среда",
			time: "08:30 - 09:15",
			subject: "Алгебра",
			teacher: "Иванов А.Д.",
			room: "204",
			type: "Контрольная",
			description: "Контрольная работа по теме"
		},
		{
			id: 7,
			day: "Среда",
			time: "09:25 - 10:10",
			subject: "Биология",
			teacher: "Волкова Н.К.",
			room: "302",
			type: "Урок",
			description: "Клеточное строение"
		},
		{
			id: 8,
			day: "Четверг",
			time: "08:30 - 09:15",
			subject: "Физика",
			teacher: "Петров В.С.",
			room: "301",
			type: "Лабораторная",
			description: "Измерение ускорения"
		},
		{
			id: 9,
			day: "Пятница",
			time: "08:30 - 09:15",
			subject: "Английский язык",
			teacher: "Смирнова О.Л.",
			room: "205",
			type: "Урок",
			description: "Грамматика: Present Perfect"
		}
	];

	const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
	const timeSlots = [
		"08:30 - 09:15",
		"09:25 - 10:10", 
		"10:20 - 11:05",
		"11:15 - 12:00",
		"12:10 - 12:55",
		"13:05 - 13:50",
		"14:00 - 14:45",
		"14:55 - 15:40"
	];

	const getLessonsForDay = (day: string) => {
		return lessons.filter(lesson => lesson.day === day);
	};

	const getLessonAtTime = (day: string, time: string) => {
		return lessons.find(lesson => lesson.day === day && lesson.time === time);
	};

	const handleLessonClick = (lesson: Lesson) => {
		setSelectedLesson(lesson);
		onOpen();
	};

	const getTypeColor = (type: string) => {
		switch (type) {
			case "Урок": return "blue";
			case "Контрольная": return "red";
			case "Лабораторная": return "green";
			case "Экзамен": return "purple";
			default: return "gray";
		}
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('ru-RU', { 
			day: 'numeric', 
			month: 'long', 
			year: 'numeric' 
		});
	};

	const nextWeek = () => {
		const next = new Date(currentWeek);
		next.setDate(next.getDate() + 7);
		setCurrentWeek(next);
	};

	const prevWeek = () => {
		const prev = new Date(currentWeek);
		prev.setDate(prev.getDate() - 7);
		setCurrentWeek(prev);
	};

	return (
		<div className="p-6 space-y-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-[var(--primary-color)] flex items-center gap-2">
					<Calendar size={24} />
					Подробное расписание
				</h1>
				<p className="text-gray-600">Расписание занятий на неделю</p>
			</div>

			{/* Навигация по неделям */}
			<Card>
				<CardBody>
					<HStack justify="space-between" align="center">
						<Button 
							leftIcon={<ChevronLeft size={16} />} 
							variant="outline"
							onClick={prevWeek}
						>
							Предыдущая неделя
						</Button>
						<VStack spacing={1}>
							<Text fontWeight="semibold">
								{formatDate(currentWeek)}
							</Text>
							<Text fontSize="sm" color="gray.600">
								Неделя {Math.ceil((currentWeek.getDate() + currentWeek.getDay()) / 7)}
							</Text>
						</VStack>
						<Button 
							rightIcon={<ChevronRight size={16} />} 
							variant="outline"
							onClick={nextWeek}
						>
							Следующая неделя
						</Button>
					</HStack>
				</CardBody>
			</Card>

			{/* Фильтр по дням */}
			<Card>
				<CardBody>
					<HStack spacing={4}>
						<Text fontWeight="semibold">День недели:</Text>
						<Select 
							value={selectedDay} 
							onChange={(e) => setSelectedDay(e.target.value)}
							w="200px"
						>
							{days.map(day => (
								<option key={day} value={day}>{day}</option>
							))}
						</Select>
					</HStack>
				</CardBody>
			</Card>

			{/* Расписание */}
			<Card>
				<CardHeader>
					<Heading size="md">{selectedDay}</Heading>
				</CardHeader>
				<CardBody>
					<VStack spacing={4} align="stretch">
						{timeSlots.map(timeSlot => {
							const lesson = getLessonAtTime(selectedDay, timeSlot);
							return (
								<Box 
									key={timeSlot}
									p={4}
									border="1px"
									borderColor={lesson ? "blue.200" : "gray.200"}
									borderRadius="md"
									bg={lesson ? "blue.50" : "gray.50"}
									cursor={lesson ? "pointer" : "default"}
									onClick={() => lesson && handleLessonClick(lesson)}
									_hover={lesson ? { bg: "blue.100" } : {}}
								>
									<HStack justify="space-between" align="start">
										<HStack spacing={4} flex={1}>
											<VStack align="start" spacing={1} minW="120px">
												<Text fontWeight="semibold" fontSize="sm">
													{timeSlot}
												</Text>
												<Text fontSize="xs" color="gray.500">
													{timeSlot.split(' - ')[0]}
												</Text>
											</VStack>
											
											{lesson ? (
												<VStack align="start" spacing={1} flex={1}>
													<HStack spacing={2}>
														<Text fontWeight="semibold">{lesson.subject}</Text>
														<Badge colorScheme={getTypeColor(lesson.type)} size="sm">
															{lesson.type}
														</Badge>
													</HStack>
													<HStack spacing={4} fontSize="sm" color="gray.600">
														<HStack spacing={1}>
															<User size={14} />
															<span>{lesson.teacher}</span>
														</HStack>
														<HStack spacing={1}>
															<MapPin size={14} />
															<span>каб. {lesson.room}</span>
														</HStack>
													</HStack>
													{lesson.description && (
														<Text fontSize="sm" color="gray.600" noOfLines={1}>
															{lesson.description}
														</Text>
													)}
												</VStack>
											) : (
												<Text color="gray.400" fontStyle="italic">
													Нет занятий
												</Text>
											)}
										</HStack>
										
										{lesson && (
											<HStack spacing={2}>
												{lesson.homework && (
													<Badge colorScheme="orange" variant="subtle" size="sm">
														ДЗ
													</Badge>
												)}
												{lesson.grade && (
													<Badge colorScheme="green" variant="subtle" size="sm">
														{lesson.grade}
													</Badge>
												)}
											</HStack>
										)}
									</HStack>
								</Box>
							);
						})}
					</VStack>
				</CardBody>
			</Card>

			{/* Статистика дня */}
			<Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
				<Card>
					<CardBody>
						<VStack spacing={2}>
							<Text fontSize="lg" fontWeight="semibold">
								{getLessonsForDay(selectedDay).length}
							</Text>
							<Text fontSize="sm" color="gray.600">Занятий сегодня</Text>
						</VStack>
					</CardBody>
				</Card>
				<Card>
					<CardBody>
						<VStack spacing={2}>
							<Text fontSize="lg" fontWeight="semibold">
								{getLessonsForDay(selectedDay).filter(l => l.homework).length}
							</Text>
							<Text fontSize="sm" color="gray.600">Домашних заданий</Text>
						</VStack>
					</CardBody>
				</Card>
				<Card>
					<CardBody>
						<VStack spacing={2}>
							<Text fontSize="lg" fontWeight="semibold">
								{getLessonsForDay(selectedDay).filter(l => l.type === "Контрольная").length}
							</Text>
							<Text fontSize="sm" color="gray.600">Контрольных работ</Text>
						</VStack>
					</CardBody>
				</Card>
			</Grid>

			{/* Модальное окно с подробной информацией о занятии */}
			<Modal isOpen={isOpen} onClose={onClose} size="md">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<HStack>
							<BookOpen size={20} className="text-[var(--primary-color)]" />
							<Text>{selectedLesson?.subject}</Text>
						</HStack>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						{selectedLesson && (
							<VStack spacing={4} align="stretch">
								<HStack justify="space-between">
									<Text fontWeight="semibold">{selectedLesson.time}</Text>
									<Badge colorScheme={getTypeColor(selectedLesson.type)}>
										{selectedLesson.type}
									</Badge>
								</HStack>
								
								<Divider />
								
								<VStack align="start" spacing={3}>
									<HStack spacing={2}>
										<User size={16} className="text-gray-500" />
										<Text><strong>Преподаватель:</strong> {selectedLesson.teacher}</Text>
									</HStack>
									<HStack spacing={2}>
										<MapPin size={16} className="text-gray-500" />
										<Text><strong>Кабинет:</strong> {selectedLesson.room}</Text>
									</HStack>
									<HStack spacing={2}>
										<Calendar size={16} className="text-gray-500" />
										<Text><strong>День:</strong> {selectedLesson.day}</Text>
									</HStack>
								</VStack>
								
								{selectedLesson.description && (
									<>
										<Divider />
										<VStack align="start" spacing={2}>
											<HStack spacing={2}>
												<Info size={16} className="text-gray-500" />
												<Text fontWeight="semibold">Описание:</Text>
											</HStack>
											<Text fontSize="sm" color="gray.600">
												{selectedLesson.description}
											</Text>
										</VStack>
									</>
								)}
								
								{selectedLesson.homework && (
									<>
										<Divider />
										<VStack align="start" spacing={2}>
											<HStack spacing={2}>
												<BookOpen size={16} className="text-gray-500" />
												<Text fontWeight="semibold">Домашнее задание:</Text>
											</HStack>
											<Alert status="info" borderRadius="md">
												<AlertIcon />
												{selectedLesson.homework}
											</Alert>
										</VStack>
									</>
								)}
								
								{selectedLesson.grade && (
									<>
										<Divider />
										<HStack justify="space-between">
											<Text fontWeight="semibold">Оценка:</Text>
											<Badge colorScheme="green" size="lg">
												{selectedLesson.grade}
											</Badge>
										</HStack>
									</>
								)}
							</VStack>
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
};
