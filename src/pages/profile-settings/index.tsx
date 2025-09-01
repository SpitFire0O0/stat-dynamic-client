import React, { useState } from "react";
import {
	Card,
	CardBody,
	CardHeader,
	Heading,
	Text,
	VStack,
	HStack,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	Textarea,
	Select,
	Button,
	Avatar,
	Badge,
	Divider,
	Switch,
	Alert,
	AlertIcon,
	useToast,
	Grid
} from "@chakra-ui/react";
import {
	User,
	Mail,
	Phone,
	MapPin,
	Calendar,
	GraduationCap,
	Edit,
	Save,
	Camera,
	Settings
} from "lucide-react";

export const ProfileSettingsPage: React.FC = () => {
	const toast = useToast();
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "Александр",
		lastName: "Иванов",
		email: "alex.ivanov@example.com",
		phone: "+7 (999) 123-45-67",
		address: "г. Москва, ул. Примерная, д. 123",
		birthDate: "1995-03-15",
		education: "Высшее",
		specialization: "Математика",
		bio: "Опытный преподаватель математики с 5-летним стажем работы. Специализируюсь на подготовке к ЕГЭ и олимпиадам.",
		showEmail: true,
		showPhone: false,
		showAddress: true,
		notifications: {
			email: true,
			sms: false,
			push: true,
			lessons: true,
			homework: true,
			grades: true
		}
	});

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}));
	};

	const handleNotificationChange = (type: string, value: boolean) => {
		setFormData(prev => ({
			...prev,
			notifications: {
				...prev.notifications,
				[type]: value
			}
		}));
	};

	const handleSave = () => {
		setIsEditing(false);
		toast({
			title: "Настройки сохранены",
			description: "Ваши настройки профиля успешно обновлены",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	return (
		<div className="p-6 space-y-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-[var(--primary-color)] flex items-center gap-2">
					<Settings size={24} />
					Настройки профиля
				</h1>
				<p className="text-gray-600">Управление личной информацией и настройками</p>
			</div>

			{/* Основная информация */}
			<Card>
				<CardHeader>
					<HStack justify="space-between">
						<Heading size="md">Основная информация</Heading>
						<Button
							leftIcon={isEditing ? <Save size={16} /> : <Edit size={16} />}
							colorScheme={isEditing ? "green" : "blue"}
							size="sm"
							onClick={isEditing ? handleSave : () => setIsEditing(true)}
						>
							{isEditing ? "Сохранить" : "Редактировать"}
						</Button>
					</HStack>
				</CardHeader>
				<CardBody>
					<VStack spacing={6} align="stretch">
						{/* Фото профиля */}
						<HStack spacing={4}>
							<Avatar size="xl" name={`${formData.firstName} ${formData.lastName}`} />
							<VStack align="start" spacing={2}>
								<Text fontWeight="semibold">Фото профиля</Text>
								<HStack spacing={2}>
									<Button size="sm" leftIcon={<Camera size={14} />}>
										Изменить фото
									</Button>
									<Button size="sm" variant="outline">
										Удалить
									</Button>
								</HStack>
							</VStack>
						</HStack>

						<Divider />

						{/* Личные данные */}
						<Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
							<FormControl>
								<FormLabel>Имя</FormLabel>
								<InputGroup>
									<InputLeftElement>
										<User size={16} />
									</InputLeftElement>
									<Input
										value={formData.firstName}
										onChange={(e) => handleInputChange('firstName', e.target.value)}
										isDisabled={!isEditing}
										pl={10}
									/>
								</InputGroup>
							</FormControl>

							<FormControl>
								<FormLabel>Фамилия</FormLabel>
								<InputGroup>
									<InputLeftElement>
										<User size={16} />
									</InputLeftElement>
									<Input
										value={formData.lastName}
										onChange={(e) => handleInputChange('lastName', e.target.value)}
										isDisabled={!isEditing}
										pl={10}
									/>
								</InputGroup>
							</FormControl>

							<FormControl>
								<FormLabel>Email</FormLabel>
								<InputGroup>
									<InputLeftElement>
										<Mail size={16} />
									</InputLeftElement>
									<Input
										value={formData.email}
										onChange={(e) => handleInputChange('email', e.target.value)}
										isDisabled={!isEditing}
										type="email"
										pl={10}
									/>
								</InputGroup>
							</FormControl>

							<FormControl>
								<FormLabel>Телефон</FormLabel>
								<InputGroup>
									<InputLeftElement>
										<Phone size={16} />
									</InputLeftElement>
									<Input
										value={formData.phone}
										onChange={(e) => handleInputChange('phone', e.target.value)}
										isDisabled={!isEditing}
										pl={10}
									/>
								</InputGroup>
							</FormControl>

							<FormControl>
								<FormLabel>Дата рождения</FormLabel>
								<InputGroup>
									<InputLeftElement>
										<Calendar size={16} />
									</InputLeftElement>
									<Input
										value={formData.birthDate}
										onChange={(e) => handleInputChange('birthDate', e.target.value)}
										isDisabled={!isEditing}
										type="date"
										pl={10}
									/>
								</InputGroup>
							</FormControl>

							<FormControl>
								<FormLabel>Образование</FormLabel>
								<Select
									value={formData.education}
									onChange={(e) => handleInputChange('education', e.target.value)}
									isDisabled={!isEditing}
								>
									<option value="Среднее">Среднее</option>
									<option value="Среднее специальное">Среднее специальное</option>
									<option value="Высшее">Высшее</option>
									<option value="Магистратура">Магистратура</option>
									<option value="Аспирантура">Аспирантура</option>
								</Select>
							</FormControl>
						</Grid>

						<FormControl>
							<FormLabel>Специализация</FormLabel>
							<InputGroup>
								<InputLeftElement>
									<GraduationCap size={16} />
								</InputLeftElement>
								<Input
									value={formData.specialization}
									onChange={(e) => handleInputChange('specialization', e.target.value)}
									isDisabled={!isEditing}
									pl={10}
								/>
							</InputGroup>
						</FormControl>

						<FormControl>
							<FormLabel>Адрес</FormLabel>
							<InputGroup>
								<InputLeftElement>
									<MapPin size={16} />
								</InputLeftElement>
								<Input
									value={formData.address}
									onChange={(e) => handleInputChange('address', e.target.value)}
									isDisabled={!isEditing}
									pl={10}
								/>
							</InputGroup>
						</FormControl>

						<FormControl>
							<FormLabel>О себе</FormLabel>
							<Textarea
								value={formData.bio}
								onChange={(e) => handleInputChange('bio', e.target.value)}
								isDisabled={!isEditing}
								rows={4}
								placeholder="Расскажите о себе..."
							/>
						</FormControl>
					</VStack>
				</CardBody>
			</Card>

			{/* Настройки приватности */}
			<Card>
				<CardHeader>
					<Heading size="md">Настройки приватности</Heading>
				</CardHeader>
				<CardBody>
					<VStack spacing={4} align="stretch">
						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Показывать email</Text>
								<Text fontSize="sm" color="gray.600">
									Другие пользователи смогут видеть ваш email
								</Text>
							</VStack>
							<Switch
								isChecked={formData.showEmail}
								onChange={(e) => handleInputChange('showEmail', e.target.checked)}
								isDisabled={!isEditing}
							/>
						</HStack>

						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Показывать телефон</Text>
								<Text fontSize="sm" color="gray.600">
									Другие пользователи смогут видеть ваш телефон
								</Text>
							</VStack>
							<Switch
								isChecked={formData.showPhone}
								onChange={(e) => handleInputChange('showPhone', e.target.checked)}
								isDisabled={!isEditing}
							/>
						</HStack>

						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Показывать адрес</Text>
								<Text fontSize="sm" color="gray.600">
									Другие пользователи смогут видеть ваш адрес
								</Text>
							</VStack>
							<Switch
								isChecked={formData.showAddress}
								onChange={(e) => handleInputChange('showAddress', e.target.checked)}
								isDisabled={!isEditing}
							/>
						</HStack>
					</VStack>
				</CardBody>
			</Card>

			{/* Настройки уведомлений */}
			<Card>
				<CardHeader>
					<Heading size="md">Настройки уведомлений</Heading>
				</CardHeader>
				<CardBody>
					<VStack spacing={4} align="stretch">
						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Email уведомления</Text>
								<Text fontSize="sm" color="gray.600">
									Получать уведомления на email
								</Text>
							</VStack>
							<Switch
								isChecked={formData.notifications.email}
								onChange={(e) => handleNotificationChange('email', e.target.checked)}
								isDisabled={!isEditing}
							/>
						</HStack>

						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">SMS уведомления</Text>
								<Text fontSize="sm" color="gray.600">
									Получать уведомления по SMS
								</Text>
							</VStack>
							<Switch
								isChecked={formData.notifications.sms}
								onChange={(e) => handleNotificationChange('sms', e.target.checked)}
								isDisabled={!isEditing}
							/>
						</HStack>

						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Push уведомления</Text>
								<Text fontSize="sm" color="gray.600">
									Получать push уведомления в браузере
								</Text>
							</VStack>
							<Switch
								isChecked={formData.notifications.push}
								onChange={(e) => handleNotificationChange('push', e.target.checked)}
								isDisabled={!isEditing}
							/>
						</HStack>

						<Divider />

						<Text fontWeight="semibold" fontSize="lg">Типы уведомлений</Text>

						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Напоминания о занятиях</Text>
								<Text fontSize="sm" color="gray.600">
									Уведомления о предстоящих занятиях
								</Text>
							</VStack>
							<Switch
								isChecked={formData.notifications.lessons}
								onChange={(e) => handleNotificationChange('lessons', e.target.checked)}
								isDisabled={!isEditing}
							/>
						</HStack>

						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Домашние задания</Text>
								<Text fontSize="sm" color="gray.600">
									Уведомления о новых домашних заданиях
								</Text>
							</VStack>
							<Switch
								isChecked={formData.notifications.homework}
								onChange={(e) => handleNotificationChange('homework', e.target.checked)}
								isDisabled={!isEditing}
							/>
						</HStack>

						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Оценки</Text>
								<Text fontSize="sm" color="gray.600">
									Уведомления о новых оценках
								</Text>
							</VStack>
							<Switch
								isChecked={formData.notifications.grades}
								onChange={(e) => handleNotificationChange('grades', e.target.checked)}
								isDisabled={!isEditing}
							/>
						</HStack>
					</VStack>
				</CardBody>
			</Card>

			{/* Информационное уведомление */}
			<Alert status="info" borderRadius="md">
				<AlertIcon />
				<Text>
					Изменения в настройках приватности и уведомлений применяются немедленно. 
					Основная информация обновляется после сохранения.
				</Text>
			</Alert>
		</div>
	);
};
