import { ACCESS_TOKEN_COOKIE_NAME } from '@/components/Header/LoginModal';
import { getCookie, removeCookie } from '@/utils/cookie';
import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: 'https://auth.k8s.tyriantrade.com/api/v1',
  withCredentials: true,
});

export const authApi = axios.create({
  baseURL: 'https://authservice.tyriantrade.com/api',
  withCredentials: true,
});

export const streamApi = axios.create({
  baseURL: 'https://streamer.k8s.tyriantrade.com/api/v1',
  withCredentials: true,
});

export const recomendationApi = axios.create({
  baseURL: 'https://recomendation.k8s.tyriantrade.com/api/v1',
  withCredentials: true,
});

export const chatApi = axios.create({
  baseURL: 'https://chat.k8s.tyriantrade.com/api/v1',
  withCredentials: true,
});

api.interceptors.request.use(function (request) {
  const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});
streamApi.interceptors.request.use(function (request) {
  const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});
recomendationApi.interceptors.request.use(function (request) {
  const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

chatApi.interceptors.request.use(function (request) {
  const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

// Add a 401 response interceptor
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      removeCookie(ACCESS_TOKEN_COOKIE_NAME);
      return (window.location.href = '/');
    }
    return Promise.reject(error);
  },
);

streamApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      removeCookie(ACCESS_TOKEN_COOKIE_NAME);
      return (window.location.href = '/');
    }
    return Promise.reject(error);
  },
);

recomendationApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      removeCookie(ACCESS_TOKEN_COOKIE_NAME);
      return (window.location.href = '/');
    }
    return Promise.reject(error);
  },
);

chatApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      removeCookie(ACCESS_TOKEN_COOKIE_NAME);
      return (window.location.href = '/');
    }
    return Promise.reject(error);
  },
);
