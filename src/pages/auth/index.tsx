import React, { useState, useEffect } from "react";
import { 
	Card, 
	CardBody, 
	CardHeader, 
	Heading, 
	FormControl, 
	FormLabel, 
	Input, 
	Button, 
	VStack, 
	Text,
	InputGroup,
	InputRightElement,
	Alert,
	AlertIcon,
	HStack,
	Divider,
	useToast
} from "@chakra-ui/react";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/auth.store";

export const AuthPage: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, isLoginLoading } = useAuth();
	const { isAuthenticated } = useAuthStore();
	const toast = useToast();

	// Редирект если уже авторизован
	useEffect(() => {
		if (isAuthenticated) {
			window.location.href = '/';
		}
	}, [isAuthenticated]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!email || !password) {
			toast({
				title: 'Ошибка',
				description: 'Пожалуйста, заполните все поля',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		login({ login: email, password });
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<Card maxW="400px" w="full" shadow="xl">
				<CardHeader textAlign="center" pb={2}>
					<VStack spacing={4}>
						<div className="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
							<LogIn size={32} className="text-white" />
						</div>
						<Heading size="lg" color="[var(--primary-color)]">
							Вход в систему
						</Heading>
						<Text fontSize="sm" color="gray.600">
							Введите свои учетные данные для входа
						</Text>
					</VStack>
				</CardHeader>
				<CardBody pt={0}>
					<form onSubmit={handleSubmit}>
						<VStack spacing={4}>
							<FormControl isRequired>
								<FormLabel>Email</FormLabel>
								<InputGroup>
									<Input
										type="email"
										placeholder="Введите ваш email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</InputGroup>
							</FormControl>

							<FormControl isRequired>
								<FormLabel>Пароль</FormLabel>
								<InputGroup>
									<Input
										type={showPassword ? "text" : "password"}
										placeholder="Введите ваш пароль"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<InputRightElement>
										<Button
											size="sm"
											variant="ghost"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>

							<Button
								type="submit"
								colorScheme="blue"
								size="lg"
								w="full"
								isLoading={isLoginLoading}
								loadingText="Вход..."
								leftIcon={<LogIn size={16} />}
							>
								Войти
							</Button>

							<Divider />

							<VStack spacing={2} fontSize="sm" color="gray.600">
								<Text>Демо-аккаунт:</Text>
								<Text fontWeight="semibold">admin@example.com</Text>
								<Text fontWeight="semibold">password</Text>
							</VStack>

							<HStack spacing={4} fontSize="sm">
								<Button variant="link" color="blue.500" size="sm">
									Забыли пароль?
								</Button>
								<Button variant="link" color="blue.500" size="sm">
									Помощь
								</Button>
							</HStack>
						</VStack>
					</form>
				</CardBody>
			</Card>
		</div>
	);
};
