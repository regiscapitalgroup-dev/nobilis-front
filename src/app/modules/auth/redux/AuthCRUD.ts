import axios from 'axios'
import {
  UserModel
} from '../models/UserModel'
import { SubscriptionModel } from '../models/SubscriptionModel'
import { ICreateAccount } from '../components/CreateAccountWizardHelper'
import apiClient from '../../../helpers/apiClient'
const API_URL = process.env.REACT_APP_API_URL || 'https://lf3566q8-8000.usw3.devtunnels.ms/api/v1'

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/get-user`
export const LOGIN_URL = `${API_URL}/auth/login`
export const REGISTER_URL = `${API_URL}/auth/register`
export const REGISTER_WAITING_LIST_URL = `${API_URL}waitinglist/`
export const REQUEST_PASSWORD_URL = `${API_URL}/auth/forgot-password`
export const ACTIVATE_ACCOUNT_URL = `${API_URL}/auth/forgot-password`
// Server should return AuthModel
export async function login(email: string, password: string) {

  const response = await apiClient.post('/token/', { email, password });
  return response.data;
}

// Server should return AuthModel
export async function register(formData: ICreateAccount) {

  const response = await apiClient.post('/waitinglist/', formData);
  return response;
}

export async function getUserByToken(): Promise<{ user: UserModel, subscription?: SubscriptionModel }> {
  return axios
    .get<any>(`${API_URL}/users/current/`)
    .then((res) => {
      return {
        user: res.data.user,
        subscription: res.data.subscription
      };
    })
    .catch((error) => {
      console.error("Error al obtener el usuario:", error);
      throw error;
    });
}


export async function activateAccount(token: string, new_password: string) {

  const response = await apiClient.put('/activate-account/', { refresh_token: token, new_password })
  return response
}

export async function existUserName(credential: string) {

  const response = await apiClient.post('/waitinglist/exists/', { email: credential });

  return response;

}