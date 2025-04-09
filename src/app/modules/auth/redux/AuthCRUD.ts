import axios from 'axios'
import {
  UserModel
} from '../models/UserModel'
import { ICreateAccount } from '../components/CreateAccountWizardHelper'
const API_URL = process.env.REACT_APP_API_URL || 'api'

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/get-user`
export const LOGIN_URL = `${API_URL}/auth/login`
export const REGISTER_URL = `${API_URL}/auth/register`
export const REGISTER_WAITING_LIST_URL = `${API_URL}waitinglist/`
export const REQUEST_PASSWORD_URL = `${API_URL}/auth/forgot-password`
export const ACTIVATE_ACCOUNT_URL = `${API_URL}/auth/forgot-password`

// Server should return AuthModel
export async function login(email: string, password: string) {

  try {

    const response = await fetch(`https://lf3566q8-8000.usw3.devtunnels.ms/api/v1/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    return data;

  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }

}

// Server should return AuthModel
export async function register(formData: ICreateAccount) {

  try {

    const response = await fetch(`${REGISTER_WAITING_LIST_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Respuesta del servidor:', data);
    return data;
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
}

export async function getUserByToken() {

  return axios
    .get<UserModel>('https://lf3566q8-8000.usw3.devtunnels.ms/api/v1/users/current/')
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error al obtener el usuario:", error);
      throw error;
    });
}


export async function activateAccount(token: string, new_password: string) {

  return await axios.post('https://lf3566q8-8000.usw3.devtunnels.ms/api/v1/activate-account/1', { token, new_password })
}

