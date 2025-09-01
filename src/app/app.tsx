import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider } from '@chakra-ui/react';

// Создаем QueryClient
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 минут
			retry: 1,
		},
		mutations: {
			retry: 1,
		},
	},
});

export const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<RouterProvider router={router} />
				{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
			</ChakraProvider>
		</QueryClientProvider>
	);
};
