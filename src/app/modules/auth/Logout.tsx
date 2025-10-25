import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import * as auth from './redux/AuthRedux'

export function Logout() {
  const dispatch = useDispatch()

  useEffect(() => {
    const handleLogout = async () => {
      localStorage.removeItem('persist:v100-demo1-auth')
      localStorage.removeItem('accessToken')

      dispatch(auth.actions.logout())

      await new Promise((resolve) => setTimeout(resolve, 100))

      window.location.href = '/'
    }

    handleLogout()
  }, [dispatch])

  return null
}
