// client/src/api/authService.js
import axios from 'axios';

// Obtener la URL base de la API desde las variables de entorno
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const authService = {
  /**
   * Registra un nuevo usuario en el sistema.
   * @param {object} userData - Datos del usuario (nombreCompleto, email, password).
   * @returns {Promise<object>} - Promesa con los datos del usuario registrado y el token JWT.
   */
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      // Opcional: Si el backend devuelve el token en el registro, guardarlo
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('Error en el registro:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  /**
   * Inicia sesión de un usuario.
   * @param {object} credentials - Credenciales del usuario (email, password).
   * @returns {Promise<object>} - Promesa con los datos del usuario y el token JWT.
   */
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  /**
   * Cierra la sesión del usuario.
   */
  logout: () => {
    localStorage.removeItem('user');
  },

  /**
   * Obtiene el perfil del usuario logueado.
   * @returns {Promise<object>} - Promesa con los datos del perfil del usuario.
   */
  getProfile: async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        throw new Error('No user token found');
      }
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener el perfil:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  /**
   * Actualiza el perfil del usuario logueado.
   * @param {object} profileData - Datos del perfil a actualizar.
   * @returns {Promise<object>} - Promesa con los datos del perfil actualizado.
   */
  updateProfile: async (profileData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        throw new Error('No user token found');
      }
      const response = await axios.put(`${API_URL}/users/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Opcional: Actualizar el usuario en localStorage si se actualiza el perfil
      const updatedUser = { ...user, user: response.data }; // Asume que la respuesta tiene el objeto de usuario actualizado
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el perfil:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },
};

export default authService;