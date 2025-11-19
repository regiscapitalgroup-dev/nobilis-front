import { Action } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { UserModel } from '../models/UserModel'
import { getUserByToken } from './AuthCRUD'
import { SubscriptionModel } from '../models/SubscriptionModel'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  Login: '[Login] Action',
  Logout: '[Logout] Action',
  Register: '[Register] Action',
  UserRequested: '[Request User] Action',
  UserLoaded: '[Load User] Auth API',
  SetUser: '[Set User] Action',
  SubscriptionLoaded: '[Load Subscription] Auth API',
  SetSubscription: '[Set Subscription] Action',
  SubscriptionRequested: '[Request Subscription] Action',
}

const initialAuthState: IAuthState = {
  user: undefined,
  subscription: undefined,
  accessToken: undefined,
  
}

export interface IAuthState {
  user?: UserModel,
  subscription?: SubscriptionModel,
  accessToken?: string
}

export const reducer = persistReducer(
  { storage, key: 'v100-demo1-auth', whitelist: ['user', 'subscription', 'accessToken'] },
  (state: IAuthState = initialAuthState, action: ActionWithPayload<IAuthState>) => {
    switch (action.type) {
      case actionTypes.Login: {
        const accessToken = action.payload?.accessToken
        return { accessToken, user: undefined }
      }

      case actionTypes.Register: {
        const accessToken = action.payload?.accessToken
        return { accessToken, user: undefined }
      }

      case actionTypes.Logout: {
        storage.removeItem('persist:v100-demo1-auth')
        return initialAuthState
      }

      case actionTypes.UserRequested: {
        return { ...state, user: undefined }
      }

      case actionTypes.UserLoaded: {
        const user = action.payload?.user
        return { ...state, user }
      }

      case actionTypes.SetUser: {
        const user = action.payload?.user
        return { ...state, user }
      }

      case actionTypes.SubscriptionLoaded: {
        const subscription = action.payload?.subscription
        return { ...state, subscription }
      }

      case actionTypes.SetSubscription: {
        const subscription = action.payload?.subscription
        return { ...state, subscription }
      }

      default:
        return state
    }
  }
)

export const actions = {
  login: (accessToken: string) => ({ type: actionTypes.Login, payload: { accessToken } }),
  register: (accessToken: string) => ({
    type: actionTypes.Register,
    payload: { accessToken },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: () => ({
    type: actionTypes.UserRequested,
  }),
  fulfillUser: (user: UserModel) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setUser: (user: UserModel) => ({ type: actionTypes.SetUser, payload: { user } }),
  fulfillSubscription: (subscription: SubscriptionModel) => ({ 
    type: actionTypes.SubscriptionLoaded, 
    payload: { subscription } 
  }),
  setSubscription: (subscription: SubscriptionModel) => ({ 
    type: actionTypes.SetSubscription, 
    payload: { subscription } 
  }),
  requestSubscription: () => ({
    type: actionTypes.SubscriptionRequested,
  }),
}

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser())
  })

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser())
  })

  yield takeLatest(actionTypes.UserRequested, function* userRequested(): Generator<any, void, {user: UserModel, subscription?: SubscriptionModel}> {
    const {user, subscription} = yield getUserByToken()
    yield put(actions.fulfillUser(user))
    if (subscription) {
      yield put(actions.fulfillSubscription(subscription))
    }
  })

  yield takeLatest(actionTypes.SubscriptionRequested, function* subscriptionRequested(): Generator<any, void, {user: UserModel, subscription?: SubscriptionModel}> {
    const {subscription} = yield getUserByToken()
    if (subscription) {
      yield put(actions.fulfillSubscription(subscription))
    }
  })
}
