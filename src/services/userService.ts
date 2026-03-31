// src/services/userService.ts

import type { UpdateUserPayload, UserProfile } from '@/features/profile/types';

import axios from './auth'; // <-- CORRECCIÓN: Importamos desde './auth' como en authService.ts

const API_GET_URL = '/api/dashboard';
const API_USERS_URL = '/api/users';


/**
 * Obtiene el perfil del usuario autenticado.
 * NOTA: El endpoint correcto según tu backend es '/api/v1/users/profile'
 */
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    // Usamos la instancia 'axios' importada
    const { data } = await axios.get<UserProfile>(`${API_GET_URL}/profile`);
    console.log('✅ [DEBUG] Datos crudos del perfil recibidos:', data); 
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('No se pudo cargar el perfil del usuario.');
  }
};

/**
 * Actualiza el perfil de un usuario por su ID.
 */
export const updateUserProfile = async (id: number, payload: UpdateUserPayload): Promise<UserProfile> => { 
  try {
    const { data } = await axios.put<UserProfile>(`${API_USERS_URL}/${id}`, payload);
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('No se pudo actualizar el perfil.');
  }
};

export const userService = {
  getUserProfile,
  updateUserProfile,
};

