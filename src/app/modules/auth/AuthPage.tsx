/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {Redirect, Route, Switch, useLocation} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

import {RegitrationWizard} from './components/RegistrationWizard'
import {Login} from './components/Login'
import {CreatePassword} from './components/CreatePassword'
import {ForgotPassword} from './components/ForgotPassword'
import {ResetPassword} from './components/ResetPassword'
import {MessageComponent} from './components/messages/messageComponent'

export function AuthPage() {
  const {pathname} = useLocation()
  const isRegistration = pathname.startsWith('/auth/registration')

  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => document.body.classList.remove('bg-white')
  }, [])

  return (
    <div className='auth-shell d-flex flex-column flex-column-fluid'>
      <div aria-hidden='true' className='nb-hero'>
        <img
          className='nb-hero__img'
          src={toAbsoluteUrl('/media/login-room.png')}
          alt=''
          loading='eager'
        />
      </div>

      {/* Contenido principal */}
      <div
        className='d-flex flex-center flex-column flex-column-fluid'
        style={{position: 'relative', zIndex: 1}}
      >
        {/* Logo textual */}
        <div className='mb-5'>
          <div className='nb-logo-text'>NOBILIS</div>
        </div>

        {/* Card con ancho responsivo*/}
        <div
          className='mx-auto w-100'
          style={{
            maxWidth: isRegistration ? '700px' : '640px',
            width: '100%',
          }}
        >
          <div className='card card-flush nb-auth-card nb-auth-card--p60'>
            <div className='nb-auth-stack'>
              <Switch>
                <Route path='/auth/login' component={Login} />
                <Route path='/auth/registration' component={RegitrationWizard} />
                <Route path='/auth/activate-account/:token/:user' component={CreatePassword} />
                <Route path='/auth/forgot-password' component={ForgotPassword} />
                <Route path='/reset-password/:user/:token' component={ResetPassword} />
                <Route path='/message' component={MessageComponent} />
                <Redirect from='/auth' exact={true} to='/auth/login' />
                <Redirect to='/auth/login' />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
