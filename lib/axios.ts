import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://servicecare.onrender.com/api',
  timeout: 50000,
});
