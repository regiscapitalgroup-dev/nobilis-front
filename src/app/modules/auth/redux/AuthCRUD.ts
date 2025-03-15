import axios from 'axios'
import {AuthModel} from '../models/AuthModel'
import {UserModel} from '../models/UserModel'

const API_URL = process.env.REACT_APP_API_URL || 'api'

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/get-user`
export const LOGIN_URL = `${API_URL}/auth/login`
export const REGISTER_URL = `${API_URL}/auth/register`
export const REGISTER_WAITING_LIST_URL = `${API_URL}waitinglist/`
export const REQUEST_PASSWORD_URL = `${API_URL}/auth/forgot-password`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post(LOGIN_URL, {email, password})
}

// Server should return AuthModel
export async function register(waitingListModel: {
  email: string
  name: string
  lastname: string
  phone_number: string
  city: string
  occupation: string
  referenced: string
  status_waiting_list: number
}) {
  
  try {

    /*const response = await axios.post(
      `${REGISTER_WAITING_LIST_URL}`, 
      JSON.stringify(waitingListModel), 
      {
        headers: {
          'Content-Type': 'application/json'
        },
        transformRequest: [(data) => data]  // Evita transformaciones automáticas
      }
    );*/
    const response = await fetch(`${REGISTER_WAITING_LIST_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(waitingListModel)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Respuesta del servidor:', data);
    return data;
    /*console.log('Respuesta del servidor:', response);
    return response;*/
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL)
}
