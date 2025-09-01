import axios, { type AxiosInstance, AxiosError } from "axios";
import { useAuthStore } from "../store/auth.store";

export const instance: AxiosInstance = axios.create({
	baseURL: 'http://localhost:6000/api',
	withCredentials: true, // Для работы с cookies
});

// Request interceptor для добавления токенов
instance.interceptors.request.use(
	(config) => {
		const { accessToken } = useAuthStore.getState();
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor для обработки ошибок и обновления токенов
instance.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as any;
		
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			
			try {
				// Попытка обновить токен (refresh token автоматически отправляется в cookies)
				const response = await instance.post('/auth/refresh');
				const { accessToken } = response.data;
				
				// Обновляем только access token в store
				const { refreshToken } = useAuthStore.getState();
				useAuthStore.getState().setTokens(accessToken, refreshToken || '');
				
				// Повторяем оригинальный запрос с новым токеном
				originalRequest.headers.Authorization = `Bearer ${accessToken}`;
				return instance(originalRequest);
			} catch (refreshError) {
				// Если обновление токена не удалось, выходим из системы
				useAuthStore.getState().logout();
				window.location.href = '/auth';
			}
		}
		
		return Promise.reject(error);
	}
);