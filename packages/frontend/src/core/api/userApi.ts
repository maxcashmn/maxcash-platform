import { apiClient } from './client';
import { endpoints } from './endpoints';

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface ListUsersParams {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
}

export const userApi = {
  me: () => apiClient.get(endpoints.users.me),
  updateProfile: (data: UpdateProfileData) => apiClient.put(endpoints.users.me, data),
  listUsers: (params?: ListUsersParams) => apiClient.get(endpoints.users.list, { params }),
  getUser: (id: string) => apiClient.get(endpoints.users.update(id)),
  updateUserStatus: (id: string, status: string) => apiClient.patch(endpoints.users.updateStatus(id), { status }),
  deleteUser: (id: string) => apiClient.delete(endpoints.users.delete(id)),
};
