
import { actions } from '../../app/modules/auth/redux/AuthRedux'

export default function setupAxios(axios: any, store: any) {
  axios.interceptors.request.use(
    (config: any) => {
      const {
        auth: { accessToken },
      } = store.getState()

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (err: any) => Promise.reject(err)
  )
  axios.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response?.status === 401) {
        store.dispatch(actions.logout())

        window.location.href = '/'
      }

      return Promise.reject(error)
    }
  )
}
