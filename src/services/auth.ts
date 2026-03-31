import axios, { type AxiosError } from 'axios';
import { useAuthStore } from '../store/AuthStore';

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8088";

const authApi = axios.create({
	baseURL: baseURL,
});

authApi.interceptors.request.use((config) => {
	const token = useAuthStore.getState().token;
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});

authApi.interceptors.response.use(
	(response) => response,
	(error: AxiosError<{ message?: string }>) => {
		// 401 → token expired or invalid, clear auth state
		if (error.response?.status === 401) {
			useAuthStore.getState().logout();
		}

		// Network errors (no response from server)
		if (!error.response) {
			return Promise.reject(
				new Error('No se pudo conectar con el servidor. Verificá tu conexión.')
			);
		}

		// Use backend error message if available
		const message = error.response.data?.message || 'Ocurrió un error inesperado';
		return Promise.reject(new Error(message));
	}
);

export default authApi;
