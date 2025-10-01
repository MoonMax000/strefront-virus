import { api, authApi } from '@/api';
import { ProfileResponse } from './UserService';

export interface RegistrationBody {
  confirmPassword: string;
  email: string;
  password: string;
  username: string;
}

export interface CheckProfileResponse {
  id: number;
  email: string;
  is_active: boolean;
  is_to_2fa: boolean;
  avatar: string;
  background_image: string;
  name: string;
  username: string;
  location: string;
  website: string;
  role: number;
  sector: string;
  bio: string;
  backup_email: string;
  phone: string;
  backup_phone: string;
  is_2fa_enabled: boolean;
  is_deleted: boolean;
  verification_method: string;
  date_joined: string;
  last_login: string;
}

export interface IUser {
  username: string;
  avatar: string;
  email: string;
  bio: string;
}

export const AuthService = {
  logout() {
    return authApi.post('/accounts/logout/');
  },
  async getProfile() {
    return (await authApi.get<string, { data: CheckProfileResponse }>('/accounts/me/')).data;
  },

  async getUserByEmail(email: string) {
    return (await authApi.get<string, { data: IUser }>(`accounts/user/by-email/?email=${email}`))
      .data;
  },

  login(body: { identity: string; password: string }) {
    return api.post<{ data: { token: string }; status: string }>('/auth/login', body);
  },
  refresh() {
    return api.post('auth/refresh');
  },

  registation(body: RegistrationBody) {
    return api.post<{ data: { token: string }; status: string }>('/auth/register', body);
  },

  passwordReset(email: string) {
    return api.post<{ message: string; status: string }>('/auth/password/reset', { email });
  },

  passwordResetConfirm(body: { token: string; code: string }) {
    return api.post('/auth/password/reset/confirm', body);
  },
};
