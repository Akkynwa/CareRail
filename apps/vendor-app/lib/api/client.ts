"use client";

import axios from 'axios';

const api = axios.create({
  // Use your environment variable or fallback to localhost
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach the Vendor Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vendor_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle Session Expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login if unauthorized
      localStorage.removeItem('vendor_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;