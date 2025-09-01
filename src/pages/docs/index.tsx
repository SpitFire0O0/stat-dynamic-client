import React, { useState } from "react";
import { 
	Input, 
	Select, 
	Button, 
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
	InputGroup,
	InputLeftElement,
	Flex,
	Box,
	Tag,
	TagLabel,
	TagCloseButton,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Image,
	Divider
} from "@chakra-ui/react";
import { 
	Search, 
	Filter, 
	BookOpen, 
	Download, 
	Eye, 
	Star, 
	Calendar,
	User,
	FileText,
	Tag as TagIcon
} from "lucide-react";

interface Book {
	id: number;
	title: string;
	author: string;
	description: string;
	category: string;
	year: number;
	rating: number;
	pages: number;
	language: string;
	format: string;
	cover: string;
	tags: string[];
}

export const DocsPage: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedFormat, setSelectedFormat] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedBook, setSelectedBook] = useState<Book | null>(null);

	const books: Book[] = [
		{
			id: 1,
			title: "Алгебра и начала анализа",
			author: "Колмогоров А.Н.",
			description: "Учебник для 10-11 классов средней школы. Содержит полный курс алгебры и начал анализа.",
			category: "Математика",
			year: 2020,
			rating: 4.8,
			pages: 384,
			language: "Русский",
			format: "PDF",
			cover: "https://via.placeholder.com/150x200/436262/FFFFFF?text=Алгебра",
			tags: ["учебник", "10 класс", "11 класс", "ЕГЭ"]
		},
		{
			id: 2,
			title: "Физика. Механика",
			author: "Мякишев Г.Я.",
			description: "Учебник по механике для старших классов. Подробное изложение основ классической механики.",
			category: "Физика",
			year: 2019,
			rating: 4.6,
			pages: 432,
			language: "Русский",
			format: "PDF",
			cover: "https://via.placeholder.com/150x200/436262/FFFFFF?text=Физика",
			tags: ["механика", "учебник", "10 класс"]
		},
		{
			id: 3,
			title: "История России",
			author: "Данилов А.А.",
			description: "Учебник по истории России с древнейших времен до наших дней.",
			category: "История",
			year: 2021,
			rating: 4.5,
			pages: 512,
			language: "Русский",
			format: "EPUB",
			cover: "https://via.placeholder.com/150x200/436262/FFFFFF?text=История",
			tags: ["история", "Россия", "учебник"]
		},
		{
			id: 4,
			title: "Химия. Общая химия",
			author: "Рудзитис Г.Е.",
			description: "Учебник по общей химии для старших классов.",
			category: "Химия",
			year: 2020,
			rating: 4.7,
			pages: 368,
			language: "Русский",
			format: "PDF",
			cover: "https://via.placeholder.com/150x200/436262/FFFFFF?text=Химия",
			tags: ["химия", "общая химия", "учебник"]
		},
		{
			id: 5,
			title: "Биология. Общая биология",
			author: "Захаров В.Б.",
			description: "Учебник по общей биологии для 10-11 классов.",
			category: "Биология",
			year: 2021,
			rating: 4.4,
			pages: 416,
			language: "Русский",
			format: "PDF",
			cover: "https://via.placeholder.com/150x200/436262/FFFFFF?text=Биология",
			tags: ["биология", "общая биология", "учебник"]
		},
		{
			id: 6,
			title: "Литература. Русская литература",
			author: "Коровина В.Я.",
			description: "Учебник по русской литературе для старших классов.",
			category: "Литература",
			year: 2020,
			rating: 4.3,
			pages: 480,
			language: "Русский",
			format: "EPUB",
			cover: "https://via.placeholder.com/150x200/436262/FFFFFF?text=Литература",
			tags: ["литература", "русская литература", "учебник"]
		}
	];

	const categories = ["Все", "Математика", "Физика", "Химия", "Биология", "История", "Литература", "География"];
	const formats = ["Все", "PDF", "EPUB", "DOCX", "TXT"];
	const allTags = ["учебник", "10 класс", "11 класс", "ЕГЭ", "механика", "история", "Россия", "химия", "общая химия", "биология", "общая биология", "литература", "русская литература"];

	const filteredBooks = books.filter(book => {
		const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
							book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
							book.description.toLowerCase().includes(searchQuery.toLowerCase());
		
		const matchesCategory = selectedCategory === "" || selectedCategory === "Все" || book.category === selectedCategory;
		const matchesFormat = selectedFormat === "" || selectedFormat === "Все" || book.format === selectedFormat;
		const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => book.tags.includes(tag));

		return matchesSearch && matchesCategory && matchesFormat && matchesTags;
	});

	const handleBookClick = (book: Book) => {
		setSelectedBook(book);
		onOpen();
	};

	const addTag = (tag: string) => {
		if (!selectedTags.includes(tag)) {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	const removeTag = (tag: string) => {
		setSelectedTags(selectedTags.filter(t => t !== tag));
	};

	return (
		<div className="p-6 space-y-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-[var(--primary-color)] flex items-center gap-2">
					<BookOpen size={24} />
					Библиотека
				</h1>
				<p className="text-gray-600">Учебные материалы и литература</p>
			</div>

			{/* Поиск и фильтры */}
			<Card>
				<CardBody>
					<VStack spacing={4}>
						{/* Поиск */}
						<InputGroup>
							<InputLeftElement>
								<Search size={16} className="text-gray-400" />
							</InputLeftElement>
							<Input 
								placeholder="Поиск по названию, автору или описанию..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</InputGroup>

						{/* Фильтры */}
						<Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4} w="full">
							<Select 
								placeholder="Категория" 
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
							>
								{categories.map(category => (
									<option key={category} value={category}>{category}</option>
								))}
							</Select>
							<Select 
								placeholder="Формат" 
								value={selectedFormat}
								onChange={(e) => setSelectedFormat(e.target.value)}
							>
								{formats.map(format => (
									<option key={format} value={format}>{format}</option>
								))}
							</Select>
						</Grid>

						{/* Теги */}
						<Box w="full">
							<Text fontSize="sm" fontWeight="semibold" mb={2}>Популярные теги:</Text>
							<Flex wrap="wrap" gap={2}>
								{allTags.map(tag => (
									<Tag 
										key={tag} 
										size="sm" 
										variant="outline" 
										cursor="pointer"
										onClick={() => addTag(tag)}
										_hover={{ bg: "gray.100" }}
									>
										<TagLabel>{tag}</TagLabel>
									</Tag>
								))}
							</Flex>
						</Box>

						{/* Выбранные теги */}
						{selectedTags.length > 0 && (
							<Box w="full">
								<Text fontSize="sm" fontWeight="semibold" mb={2}>Выбранные теги:</Text>
								<Flex wrap="wrap" gap={2}>
									{selectedTags.map(tag => (
										<Tag 
											key={tag} 
											size="sm" 
											colorScheme="blue"
											onClick={() => removeTag(tag)}
											cursor="pointer"
										>
											<TagLabel>{tag}</TagLabel>
											<TagCloseButton />
										</Tag>
									))}
								</Flex>
							</Box>
						)}
					</VStack>
				</CardBody>
			</Card>

			{/* Результаты */}
			<div>
				<HStack justify="space-between" mb={4}>
					<Text fontWeight="semibold">
						Найдено книг: {filteredBooks.length}
					</Text>
					<Select size="sm" w="200px">
						<option value="title">По названию</option>
						<option value="author">По автору</option>
						<option value="year">По году</option>
						<option value="rating">По рейтингу</option>
					</Select>
				</HStack>

				<Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
					{filteredBooks.map(book => (
						<Card key={book.id} cursor="pointer" _hover={{ shadow: "lg" }} onClick={() => handleBookClick(book)}>
							<CardBody>
								<HStack spacing={4}>
									<Image 
										src={book.cover} 
										alt={book.title}
										boxSize="80px"
										objectFit="cover"
										borderRadius="md"
									/>
									<VStack align="start" spacing={2} flex={1}>
										<Heading size="sm" noOfLines={2}>{book.title}</Heading>
										<Text fontSize="sm" color="gray.600">{book.author}</Text>
										<HStack spacing={2}>
											<Badge colorScheme="blue" variant="subtle">{book.category}</Badge>
											<Badge colorScheme="green" variant="subtle">{book.format}</Badge>
										</HStack>
										<HStack spacing={4} fontSize="xs" color="gray.500">
											<HStack spacing={1}>
												<Star size={12} fill="gold" />
												<span>{book.rating}</span>
											</HStack>
											<HStack spacing={1}>
												<FileText size={12} />
												<span>{book.pages} стр.</span>
											</HStack>
											<HStack spacing={1}>
												<Calendar size={12} />
												<span>{book.year}</span>
											</HStack>
										</HStack>
									</VStack>
								</HStack>
							</CardBody>
						</Card>
					))}
				</Grid>
			</div>

			{/* Модальное окно с подробной информацией о книге */}
			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{selectedBook?.title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						{selectedBook && (
							<VStack spacing={4} align="stretch">
								<HStack spacing={6}>
									<Image 
										src={selectedBook.cover} 
										alt={selectedBook.title}
										boxSize="200px"
										objectFit="cover"
										borderRadius="md"
									/>
									<VStack align="start" spacing={3} flex={1}>
										<Text fontWeight="semibold">Автор: {selectedBook.author}</Text>
										<Text fontSize="sm" color="gray.600">{selectedBook.description}</Text>
										<HStack spacing={2}>
											<Badge colorScheme="blue">{selectedBook.category}</Badge>
											<Badge colorScheme="green">{selectedBook.format}</Badge>
											<Badge colorScheme="purple">{selectedBook.language}</Badge>
										</HStack>
										<HStack spacing={4} fontSize="sm">
											<HStack spacing={1}>
												<Star size={16} fill="gold" />
												<span>{selectedBook.rating}</span>
											</HStack>
											<HStack spacing={1}>
												<FileText size={16} />
												<span>{selectedBook.pages} страниц</span>
											</HStack>
											<HStack spacing={1}>
												<Calendar size={16} />
												<span>{selectedBook.year}</span>
											</HStack>
										</HStack>
									</VStack>
								</HStack>
								
								<Divider />
								
								<Box>
									<Text fontWeight="semibold" mb={2}>Теги:</Text>
									<Flex wrap="wrap" gap={2}>
										{selectedBook.tags.map(tag => (
											<Tag key={tag} size="sm" variant="outline">
												<TagLabel>{tag}</TagLabel>
											</Tag>
										))}
									</Flex>
								</Box>
								
								<HStack spacing={4}>
									<Button leftIcon={<Eye size={16} />} colorScheme="blue" flex={1}>
										Просмотреть
									</Button>
									<Button leftIcon={<Download size={16} />} colorScheme="green" flex={1}>
										Скачать
									</Button>
								</HStack>
							</VStack>
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
};