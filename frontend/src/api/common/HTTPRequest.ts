import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from 'src/utils/getUserData';
import { RequestTimeout } from '../../constants';

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL!,
  timeout: RequestTimeout,
  headers: {
    'Content-type': 'application/json',
  },
});

API.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${getToken()}`;
  return config;
});
