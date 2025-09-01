import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
	Select,
	Button,
	Switch,
	Divider,
	Alert,
	AlertIcon,
	useToast,
	Grid,
	Box,
	Badge
} from "@chakra-ui/react";
import {
	MonitorCog,
	Paintbrush,
	Volume2,
	Globe,
	Moon,
	Sun,
	Palette,
	Bell,
	Shield,
	Database,
	Download,
	Upload
} from "lucide-react";

export const SettingsPage: React.FC = () => {
	const toast = useToast();
	const location = useLocation();
	const [settings, setSettings] = useState({
		theme: "light",
		language: "ru",
		notifications: {
			enabled: true,
			sound: true,
			desktop: true
		},
		privacy: {
			analytics: true,
			telemetry: false,
			crashReports: true
		},
		performance: {
			animations: true,
			reducedMotion: false,
			hardwareAcceleration: true
		}
	});

	// Прокрутка к якорю при загрузке страницы
	useEffect(() => {
		if (location.hash) {
			const element = document.getElementById(location.hash.substring(1));
			if (element) {
				setTimeout(() => {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}, 100);
			}
		}
	}, [location.hash]);

	const handleSettingChange = (category: string, setting: string, value: any) => {
		setSettings(prev => ({
			...prev,
			[category]: {
				...prev[category as keyof typeof prev] as any,
				[setting]: value
			}
		}));
	};

	const handleSave = () => {
		toast({
			title: "Настройки сохранены",
			description: "Ваши настройки успешно обновлены",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	const handleExport = () => {
		toast({
			title: "Настройки экспортированы",
			description: "Файл настроек сохранен",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	const handleImport = () => {
		toast({
			title: "Настройки импортированы",
			description: "Настройки успешно загружены",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	return (
		<div className="p-6 space-y-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-[var(--primary-color)] flex items-center gap-2">
					<MonitorCog size={24} />
					Настройки приложения
				</h1>
				<p className="text-gray-600">Управление настройками системы и интерфейса</p>
			</div>

			{/* Внешний вид */}
			<Card id="appearance">
				<CardHeader>
					<HStack>
						<Paintbrush size={20} className="text-[var(--primary-color)]" />
						<Heading size="md">Внешний вид</Heading>
					</HStack>
				</CardHeader>
				<CardBody>
					<VStack spacing={4} align="stretch">
						<FormControl>
							<FormLabel>Тема</FormLabel>
							<Select
								value={settings.theme}
								onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
							>
								<option value="light">Светлая</option>
								<option value="dark">Темная</option>
								<option value="auto">Автоматически</option>
							</Select>
						</FormControl>

						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Анимации</Text>
								<Text fontSize="sm" color="gray.600">
									Включить анимации интерфейса
								</Text>
							</VStack>
							<Switch
								isChecked={settings.performance.animations}
								onChange={(e) => handleSettingChange('performance', 'animations', e.target.checked)}
							/>
						</HStack>

						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Уменьшенное движение</Text>
								<Text fontSize="sm" color="gray.600">
									Снизить количество анимаций для доступности
								</Text>
							</VStack>
							<Switch
								isChecked={settings.performance.reducedMotion}
								onChange={(e) => handleSettingChange('performance', 'reducedMotion', e.target.checked)}
							/>
						</HStack>
					</VStack>
				</CardBody>
			</Card>

			{/* Звук */}
			<Card id="sound">
				<CardHeader>
					<HStack>
						<Volume2 size={20} className="text-[var(--primary-color)]" />
						<Heading size="md">Звук</Heading>
					</HStack>
				</CardHeader>
				<CardBody>
					<VStack spacing={4} align="stretch">
						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Звуковые уведомления</Text>
								<Text fontSize="sm" color="gray.600">
									Воспроизводить звуки при уведомлениях
								</Text>
							</VStack>
							<Switch
								isChecked={settings.notifications.sound}
								onChange={(e) => handleSettingChange('notifications', 'sound', e.target.checked)}
							/>
						</HStack>

						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Desktop уведомления</Text>
								<Text fontSize="sm" color="gray.600">
									Показывать уведомления на рабочем столе
								</Text>
							</VStack>
							<Switch
								isChecked={settings.notifications.desktop}
								onChange={(e) => handleSettingChange('notifications', 'desktop', e.target.checked)}
							/>
						</HStack>
					</VStack>
				</CardBody>
			</Card>

			{/* Язык и регион */}
			<Card id="language">
				<CardHeader>
					<HStack>
						<Globe size={20} className="text-[var(--primary-color)]" />
						<Heading size="md">Язык и регион</Heading>
					</HStack>
				</CardHeader>
				<CardBody>
					<VStack spacing={4} align="stretch">
						<FormControl>
							<FormLabel>Язык интерфейса</FormLabel>
							<Select
								value={settings.language}
								onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
							>
								<option value="ru">Русский</option>
								<option value="en">English</option>
								<option value="de">Deutsch</option>
								<option value="fr">Français</option>
							</Select>
						</FormControl>
					</VStack>
				</CardBody>
			</Card>

			{/* Производительность */}
			<Card id="performance">
				<CardHeader>
					<HStack>
						<Database size={20} className="text-[var(--primary-color)]" />
						<Heading size="md">Производительность</Heading>
					</HStack>
				</CardHeader>
				<CardBody>
					<VStack spacing={4} align="stretch">
						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Аппаратное ускорение</Text>
								<Text fontSize="sm" color="gray.600">
									Использовать GPU для рендеринга
								</Text>
							</VStack>
							<Switch
								isChecked={settings.performance.hardwareAcceleration}
								onChange={(e) => handleSettingChange('performance', 'hardwareAcceleration', e.target.checked)}
							/>
						</HStack>
					</VStack>
				</CardBody>
			</Card>

			{/* Конфиденциальность */}
			<Card id="privacy">
				<CardHeader>
					<HStack>
						<Shield size={20} className="text-[var(--primary-color)]" />
						<Heading size="md">Конфиденциальность</Heading>
					</HStack>
				</CardHeader>
				<CardBody>
					<VStack spacing={4} align="stretch">
						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Аналитика</Text>
								<Text fontSize="sm" color="gray.600">
									Отправлять данные об использовании для улучшения
								</Text>
							</VStack>
							<Switch
								isChecked={settings.privacy.analytics}
								onChange={(e) => handleSettingChange('privacy', 'analytics', e.target.checked)}
							/>
						</HStack>

						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Телеметрия</Text>
								<Text fontSize="sm" color="gray.600">
									Отправлять технические данные
								</Text>
							</VStack>
							<Switch
								isChecked={settings.privacy.telemetry}
								onChange={(e) => handleSettingChange('privacy', 'telemetry', e.target.checked)}
							/>
						</HStack>

						<HStack justify="space-between">
							<VStack align="start" spacing={1}>
								<Text fontWeight="semibold">Отчеты о сбоях</Text>
								<Text fontSize="sm" color="gray.600">
									Автоматически отправлять отчеты об ошибках
								</Text>
							</VStack>
							<Switch
								isChecked={settings.privacy.crashReports}
								onChange={(e) => handleSettingChange('privacy', 'crashReports', e.target.checked)}
							/>
						</HStack>
					</VStack>
				</CardBody>
			</Card>

			{/* Управление данными */}
			<Card>
				<CardHeader>
					<Heading size="md">Управление данными</Heading>
				</CardHeader>
				<CardBody>
					<VStack spacing={4} align="stretch">
						<HStack spacing={3}>
							<Button leftIcon={<Download size={16} />} onClick={handleExport}>
								Экспорт настроек
							</Button>
							<Button leftIcon={<Upload size={16} />} variant="outline" onClick={handleImport}>
								Импорт настроек
							</Button>
						</HStack>
					</VStack>
				</CardBody>
			</Card>

			{/* Информация о версии */}
			<Card>
				<CardBody>
					<VStack spacing={2}>
						<Text fontSize="sm" color="gray.600">Версия приложения</Text>
						<Badge colorScheme="blue">v1.0.0</Badge>
					</VStack>
				</CardBody>
			</Card>

			{/* Кнопки действий */}
			<HStack spacing={3} justify="flex-end">
				<Button variant="outline" onClick={() => setSettings({
					theme: "light",
					language: "ru",
					notifications: { enabled: true, sound: true, desktop: true },
					privacy: { analytics: true, telemetry: false, crashReports: true },
					performance: { animations: true, reducedMotion: false, hardwareAcceleration: true }
				})}>
					Сбросить настройки
				</Button>
				<Button colorScheme="blue" onClick={handleSave}>
					Сохранить настройки
				</Button>
			</HStack>
		</div>
	);
};