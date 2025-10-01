import { api, streamApi } from '@/api';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/components/Header/LoginModal';
import { getCookie } from '@/utils/cookie';
import axios from 'axios';
import Cookies from 'js-cookie';
export interface ProfileResponse {
  avatar_url: string;
  cover_url: string;
  description: string;
  donation_url: string;
  email: string;
  id: string;
  name: string;
  roles: string[];
  username: string;
}

export interface BecomeStreamerBody {
  additional_text: string;
  email: string;
}

export interface patchUserData {
  description?: string;
  username?: string;
  donation_url?: string;
}

interface IPatchProfile {
  description?: 'string';
  donation_url?: 'string';
  name?: 'string';
}

export const UserService = {
  getProfile() {
    return api.get<ProfileResponse>('/profile/me');
  },

  getEmail(id: string) {
    return api.get<{ status: string; message: string }>(`profile/get-email/${id}`);
  },

  patchProfile(userData: patchUserData) {
    return api.patch<ProfileResponse>('/profile/me', userData);
  },
  changeAvatar(uploadFile: File) {
    const formData = new FormData();
    formData.append('file', uploadFile);
    return api.put('profile/me/set-avatar', formData);
  },
  changeBanner(uploadFile: File) {
    const formData = new FormData();
    formData.append('file', uploadFile);
    return api.put('profile/me/set-cover', formData);
  },

  becomeStreamer(body: BecomeStreamerBody) {
    return streamApi.post('profile/me/become-streamer-request', body, {
      headers: getCookie(ACCESS_TOKEN_COOKIE_NAME)
        ? { Authorization: `Bearer ${getCookie(ACCESS_TOKEN_COOKIE_NAME)}` }
        : {},
    });
  },

  getKey() {
    return streamApi.get<{ key: string }>('stream-keys/new');
  },
};
