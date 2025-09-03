import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  birthday?: string;
  phone?: string;
  address?: string;
  logo?: string;
  gender: 'MALE' | 'FEMALE';
  permissions: 'ADMIN' | 'TEACHER' | 'PARENT' | 'STUDENT';
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthActions {
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Пользователь по умолчанию: ADMIN (для быстрого доступа в DEV)
      user: {
        id: 'dev-admin',
        login: 'admin@example.com',
        firstName: 'Dev',
        lastName: 'Admin',
        birthday: new Date('2000-01-01').toISOString(),
        phone: '+7 (999) 000-00-00',
        address: 'Dev City',
        logo: undefined,
        gender: 'MALE',
        permissions: 'ADMIN',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      isAuthenticated: true,
      accessToken: null,
      refreshToken: null,

      setUser: (user: User) => set({ user, isAuthenticated: true }),
      
      setTokens: (accessToken: string, refreshToken: string) => 
        set({ accessToken, refreshToken }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        accessToken: null, 
        refreshToken: null 
      }),
      
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
