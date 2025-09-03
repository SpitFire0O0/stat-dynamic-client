import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi, type LoginCredentials } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';
import { useToast } from '@chakra-ui/react';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { user, isAuthenticated, setUser, setTokens, logout: logoutStore } = useAuthStore();

  // Query для получения текущего пользователя
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', 'current'],
    queryFn: authApi.getCurrentUser,
    enabled: isAuthenticated,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Mutation для входа
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data.user);
      setTokens(data.accessToken, data.refreshToken);
      queryClient.setQueryData(['user', 'current'], data.user);
      
      toast({
        title: 'Успешный вход',
        description: `Добро пожаловать, ${data.user.firstName}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      navigate('/');
    },
    onError: (error: any) => {
      toast({
        title: 'Ошибка входа',
        description: error.response?.data?.message || 'Неверный логин или пароль',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Mutation для выхода
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logoutStore();
      queryClient.clear();
      
      toast({
        title: 'Выход выполнен',
        description: 'Вы успешно вышли из системы',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      
      navigate('/auth');
    },
    onError: () => {
      // Даже если запрос не удался, очищаем локальное состояние
      logoutStore();
      queryClient.clear();
      navigate('/auth');
    },
  });

  // Mutation для обновления токена
  const refreshMutation = useMutation({
    mutationFn: authApi.refresh,
    onSuccess: (data) => {
      const { refreshToken } = useAuthStore.getState();
      setTokens(data.accessToken, refreshToken || '');
    },
    onError: () => {
      logoutStore();
      queryClient.clear();
      navigate('/auth');
    },
  });

  const login = (credentials: LoginCredentials) => {
    loginMutation.mutate(credentials);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const refresh = () => {
    refreshMutation.mutate();
  };

  return {
    // В DEV-режиме или при локальном переключении ролей отдаем пользователя из стора в приоритете
    user: user || currentUser,
    isAuthenticated,
    isLoading: loginMutation.isPending || logoutMutation.isPending || isLoadingUser,
    login,
    logout,
    refresh,
    isLoginLoading: loginMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
  };
};
