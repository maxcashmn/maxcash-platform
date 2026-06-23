import { apiClient } from './client';
import { endpoints } from './endpoints';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const authApi = {
  register: (data: RegisterData) => apiClient.post(endpoints.auth.register, data),
  login: (data: LoginData) => apiClient.post(endpoints.auth.login, data),
  refreshToken: (refreshToken: string) => apiClient.post(endpoints.auth.refresh, { refreshToken }),
  logout: () => apiClient.post(endpoints.auth.logout),
  forgotPassword: (email: string) => apiClient.post(endpoints.auth.forgotPassword, { email }),
  changePassword: (data: ChangePasswordData) => apiClient.post(endpoints.auth.changePassword, data),
};
