import React, { useState, useMemo } from "react";
import {
	Card,
	CardBody,
	CardHeader,
	Heading,
	Text,
	VStack,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
	Button,
	Badge,
	Divider,
	useToast,
	Grid,
	Box,
	Flex,
	Spinner,
	Alert,
	AlertIcon
} from "@chakra-ui/react";
import {
	Search,
	Filter,
	BookOpen,
	Calendar,
	Clock,
	CheckCircle,
	XCircle,
	AlertCircle,
	FileText,
	User
} from "lucide-react";

interface Homework {
	id: string;
	title: string;
	content: string;
	subject: string;
	teacher: string;
	dateAssigned: string;
	dueDate: string;
	status: 'pending' | 'completed' | 'overdue' | 'submitted';
	priority: 'low' | 'medium' | 'high';
	grade?: string;
	feedback?: string;
}

export const ProfileHomeworkPage: React.FC = () => {
	const toast = useToast();
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [subjectFilter, setSubjectFilter] = useState<string>("all");
	const [priorityFilter, setPriorityFilter] = useState<string>("all");
	const [sortBy, setSortBy] = useState<string>("dueDate");

	// Моковые данные для демонстрации
	const [homeworks] = useState<Homework[]>([
		{
			id: "1",
			title: "Решение квадратных уравнений",
			content: "Решить задачи №1-15 из учебника, стр. 45-47",
			subject: "Математика",
			teacher: "Иванов Д.С.",
			dateAssigned: "2025-01-15",
			dueDate: "2025-01-22",
			status: "pending",
			priority: "high",
		},
		{
			id: "2",
			title: "Анализ стихотворения Пушкина",
			content: "Проанализировать стихотворение 'Зимнее утро'",
			subject: "Литература",
			teacher: "Петрова А.М.",
			dateAssigned: "2025-01-14",
			dueDate: "2025-01-21",
			status: "completed",
			priority: "medium",
			grade: "A",
			feedback: "Отличная работа! Глубокий анализ."
		},
		{
			id: "3",
			title: "Лабораторная работа по физике",
			content: "Измерить сопротивление проводника",
			subject: "Физика",
			teacher: "Сидоров В.П.",
			dateAssigned: "2025-01-13",
			dueDate: "2025-01-20",
			status: "overdue",
			priority: "high",
		},
		{
			id: "4",
			title: "Эссе по истории",
			content: "Написать эссе на тему 'Революция 1917 года'",
			subject: "История",
			teacher: "Козлова Е.В.",
			dateAssigned: "2025-01-12",
			dueDate: "2025-01-19",
			status: "submitted",
			priority: "low",
		},
		{
			id: "5",
			title: "Грамматические упражнения",
			content: "Выполнить упражнения на Present Perfect",
			subject: "Английский язык",
			teacher: "Смирнова О.И.",
			dateAssigned: "2025-01-11",
			dueDate: "2025-01-18",
			status: "pending",
			priority: "medium",
		}
	]);

	const filteredAndSortedHomeworks = useMemo(() => {
		let filtered = homeworks.filter(homework => {
			const matchesSearch = homework.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				homework.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
				homework.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
				homework.teacher.toLowerCase().includes(searchTerm.toLowerCase());
			
			const matchesStatus = statusFilter === "all" || homework.status === statusFilter;
			const matchesSubject = subjectFilter === "all" || homework.subject === subjectFilter;
			const matchesPriority = priorityFilter === "all" || homework.priority === priorityFilter;
			
			return matchesSearch && matchesStatus && matchesSubject && matchesPriority;
		});

		// Сортировка
		filtered.sort((a, b) => {
			switch (sortBy) {
				case "dueDate":
					return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
				case "dateAssigned":
					return new Date(b.dateAssigned).getTime() - new Date(a.dateAssigned).getTime();
				case "priority":
					const priorityOrder = { high: 3, medium: 2, low: 1 };
					return priorityOrder[b.priority] - priorityOrder[a.priority];
				case "subject":
					return a.subject.localeCompare(b.subject);
				default:
					return 0;
			}
		});

		return filtered;
	}, [homeworks, searchTerm, statusFilter, subjectFilter, priorityFilter, sortBy]);

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'completed': return 'green';
			case 'overdue': return 'red';
			case 'submitted': return 'blue';
			case 'pending': return 'yellow';
			default: return 'gray';
		}
	};

	const getStatusText = (status: string) => {
		switch (status) {
			case 'completed': return 'Выполнено';
			case 'overdue': return 'Просрочено';
			case 'submitted': return 'Сдано';
			case 'pending': return 'В работе';
			default: return 'Неизвестно';
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case 'high': return 'red';
			case 'medium': return 'orange';
			case 'low': return 'green';
			default: return 'gray';
		}
	};

	const getPriorityText = (priority: string) => {
		switch (priority) {
			case 'high': return 'Высокий';
			case 'medium': return 'Средний';
			case 'low': return 'Низкий';
			default: return 'Неизвестно';
		}
	};

	const getSubjects = () => {
		return Array.from(new Set(homeworks.map(h => h.subject)));
	};

	const clearFilters = () => {
		setSearchTerm("");
		setStatusFilter("all");
		setSubjectFilter("all");
		setPriorityFilter("all");
		setSortBy("dueDate");
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('ru-RU');
	};

	const getDaysUntilDue = (dueDate: string) => {
		const today = new Date();
		const due = new Date(dueDate);
		const diffTime = due.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	return (
		<div className="p-6 space-y-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-[var(--primary-color)] flex items-center gap-2">
					<BookOpen size={24} />
					Мои задания
				</h1>
				<p className="text-gray-600">Управление домашними заданиями и отслеживание прогресса</p>
			</div>

			{/* Фильтры и поиск */}
			<Card>
				<CardHeader>
					<Heading size="md">Поиск и фильтрация</Heading>
				</CardHeader>
				<CardBody>
					<VStack spacing={4} align="stretch">
						<Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
							<InputGroup>
								<InputLeftElement>
									<Search size={16} />
								</InputLeftElement>
								<Input
									placeholder="Поиск по названию, описанию, предмету..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</InputGroup>

							<Select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
							>
								<option value="all">Все статусы</option>
								<option value="pending">В работе</option>
								<option value="completed">Выполнено</option>
								<option value="submitted">Сдано</option>
								<option value="overdue">Просрочено</option>
							</Select>

							<Select
								value={subjectFilter}
								onChange={(e) => setSubjectFilter(e.target.value)}
							>
								<option value="all">Все предметы</option>
								{getSubjects().map(subject => (
									<option key={subject} value={subject}>{subject}</option>
								))}
							</Select>

							<Select
								value={priorityFilter}
								onChange={(e) => setPriorityFilter(e.target.value)}
							>
								<option value="all">Все приоритеты</option>
								<option value="high">Высокий</option>
								<option value="medium">Средний</option>
								<option value="low">Низкий</option>
							</Select>
						</Grid>

						<HStack justify="space-between">
							<HStack spacing={4}>
								<Text fontSize="sm" fontWeight="medium">Сортировка:</Text>
								<Select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									size="sm"
									width="auto"
								>
									<option value="dueDate">По сроку сдачи</option>
									<option value="dateAssigned">По дате выдачи</option>
									<option value="priority">По приоритету</option>
									<option value="subject">По предмету</option>
								</Select>
							</HStack>

							<Button
								leftIcon={<Filter size={16} />}
								variant="outline"
								size="sm"
								onClick={clearFilters}
							>
								Сбросить фильтры
							</Button>
						</HStack>
					</VStack>
				</CardBody>
			</Card>

			{/* Статистика */}
			<Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
				<Card>
					<CardBody>
						<VStack spacing={2}>
							<Text fontSize="2xl" fontWeight="bold" color="blue.500">
								{homeworks.filter(h => h.status === 'pending').length}
							</Text>
							<Text fontSize="sm" color="gray.600">В работе</Text>
						</VStack>
					</CardBody>
				</Card>

				<Card>
					<CardBody>
						<VStack spacing={2}>
							<Text fontSize="2xl" fontWeight="bold" color="green.500">
								{homeworks.filter(h => h.status === 'completed').length}
							</Text>
							<Text fontSize="sm" color="gray.600">Выполнено</Text>
						</VStack>
					</CardBody>
				</Card>

				<Card>
					<CardBody>
						<VStack spacing={2}>
							<Text fontSize="2xl" fontWeight="bold" color="red.500">
								{homeworks.filter(h => h.status === 'overdue').length}
							</Text>
							<Text fontSize="sm" color="gray.600">Просрочено</Text>
						</VStack>
					</CardBody>
				</Card>

				<Card>
					<CardBody>
						<VStack spacing={2}>
							<Text fontSize="2xl" fontWeight="bold" color="orange.500">
								{homeworks.filter(h => h.status === 'submitted').length}
							</Text>
							<Text fontSize="sm" color="gray.600">Сдано</Text>
						</VStack>
					</CardBody>
				</Card>
			</Grid>

			{/* Список заданий */}
			<Card>
				<CardHeader>
					<HStack justify="space-between">
						<Heading size="md">Задания ({filteredAndSortedHomeworks.length})</Heading>
						<Text fontSize="sm" color="gray.600">
							Найдено {filteredAndSortedHomeworks.length} из {homeworks.length}
						</Text>
					</HStack>
				</CardHeader>
				<CardBody>
					<VStack spacing={4} align="stretch">
						{filteredAndSortedHomeworks.length === 0 ? (
							<Alert status="info" borderRadius="md">
								<AlertIcon />
								<Text>По заданным критериям задания не найдены</Text>
							</Alert>
						) : (
							filteredAndSortedHomeworks.map(homework => (
								<Card key={homework.id} variant="outline">
									<CardBody>
										<VStack spacing={3} align="stretch">
											<HStack justify="space-between" align="start">
												<VStack align="start" spacing={1} flex={1}>
													<HStack spacing={2}>
														<Heading size="md">{homework.title}</Heading>
														<Badge colorScheme={getStatusColor(homework.status)}>
															{getStatusText(homework.status)}
														</Badge>
														<Badge colorScheme={getPriorityColor(homework.priority)}>
															{getPriorityText(homework.priority)}
														</Badge>
													</HStack>
													<Text color="gray.600">{homework.content}</Text>
												</VStack>
											</HStack>

											<Divider />

											<Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
												<HStack spacing={2}>
													<BookOpen size={16} />
													<Text fontSize="sm">
														<strong>Предмет:</strong> {homework.subject}
													</Text>
												</HStack>

												<HStack spacing={2}>
													<User size={16} />
													<Text fontSize="sm">
														<strong>Преподаватель:</strong> {homework.teacher}
													</Text>
												</HStack>

												<HStack spacing={2}>
													<Calendar size={16} />
													<Text fontSize="sm">
														<strong>Выдано:</strong> {formatDate(homework.dateAssigned)}
													</Text>
												</HStack>

												<HStack spacing={2}>
													<Clock size={16} />
													<Text fontSize="sm">
														<strong>Срок сдачи:</strong> {formatDate(homework.dueDate)}
													</Text>
												</HStack>
											</Grid>

											{/* Дополнительная информация */}
											{homework.grade && (
												<HStack spacing={2}>
													<CheckCircle size={16} color="green" />
													<Text fontSize="sm">
														<strong>Оценка:</strong> {homework.grade}
													</Text>
												</HStack>
											)}

											{homework.feedback && (
												<HStack spacing={2}>
													<FileText size={16} />
													<Text fontSize="sm">
														<strong>Комментарий:</strong> {homework.feedback}
													</Text>
												</HStack>
											)}

											{/* Предупреждение о сроке */}
											{homework.status === 'pending' && (
												(() => {
													const daysUntilDue = getDaysUntilDue(homework.dueDate);
													if (daysUntilDue < 0) {
														return (
															<Alert status="error" borderRadius="md">
																<AlertIcon />
																<Text>Задание просрочено на {Math.abs(daysUntilDue)} дней!</Text>
															</Alert>
														);
													} else if (daysUntilDue <= 2) {
														return (
															<Alert status="warning" borderRadius="md">
																<AlertIcon />
																<Text>До сдачи осталось {daysUntilDue} дней!</Text>
															</Alert>
														);
													}
													return null;
												})()
											)}

											{/* Действия */}
											<HStack justify="end" spacing={2}>
												{homework.status === 'pending' && (
													<>
														<Button size="sm" colorScheme="blue" leftIcon={<FileText size={14} />}>
															Сдать работу
														</Button>
														<Button size="sm" variant="outline" leftIcon={<BookOpen size={14} />}>
															Открыть задание
														</Button>
													</>
												)}
												{homework.status === 'submitted' && (
													<Button size="sm" variant="outline" leftIcon={<BookOpen size={14} />}>
														Просмотреть
													</Button>
												)}
												{homework.status === 'completed' && (
													<Button size="sm" variant="outline" leftIcon={<BookOpen size={14} />}>
														Просмотреть
													</Button>
												)}
											</HStack>
										</VStack>
									</CardBody>
								</Card>
							))
						)}
					</VStack>
				</CardBody>
			</Card>
		</div>
	);
};
