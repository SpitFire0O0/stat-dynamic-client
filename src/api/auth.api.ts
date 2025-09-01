import { instance } from './axios.api';
import { User } from '../store/auth.store';

export interface LoginCredentials {
  login: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await instance.post('/auth/login', credentials);
    return response.data;
  },

  refresh: async (): Promise<{ accessToken: string }> => {
    const response = await instance.post('/auth/refresh');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await instance.delete('/auth/logout');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await instance.get('/auth/current');
    return response.data;
  },
};
