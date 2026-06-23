import { useAuthStore } from '../state/authStore';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user, token, refreshToken, isAuthenticated, setUser, setTokens, clearAuth, setLoading } = useAuthStore();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.login({ email, password });
      const { token, refreshToken, user } = response.data;
      setTokens(token, refreshToken);
      setUser(user);
      navigate('/dashboard');
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await authApi.register(data);
      const { token, refreshToken, user } = response.data;
      setTokens(token, refreshToken);
      setUser(user);
      navigate('/dashboard');
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Ignore logout errors
    } finally {
      clearAuth();
      navigate('/login');
    }
  };

  const refreshUser = async () => {
    try {
      const response = await userApi.me();
      setUser(response.data);
      return response.data;
    } catch (error) {
      clearAuth();
      navigate('/login');
      throw error;
    }
  };

  const updateProfile = async (data: { firstName?: string; lastName?: string; phoneNumber?: string }) => {
    try {
      const response = await userApi.updateProfile(data);
      setUser(response.data);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.response?.data?.message || 'Update failed' };
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    try {
      await authApi.changePassword({ currentPassword, newPassword, confirmPassword });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.response?.data?.message || 'Password change failed' };
    }
  };

  return {
    user,
    token,
    refreshToken,
    isAuthenticated,
    isLoading: isLoading || useAuthStore.getState().isLoading,
    login,
    register,
    logout,
    refreshUser,
    updateProfile,
    changePassword,
  };
};
