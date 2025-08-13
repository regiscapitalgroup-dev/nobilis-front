/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Redirect, Route, Switch, useLocation} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {RegitrationWizard} from './components/RegistrationWizard'
import {Login} from './components/Login'
import {CreatePassword} from './components/CreatePassword'
import {ForgotPassword} from './components/ForgotPassword'
import {ResetPassword} from './components/ResetPassword'

export function AuthPage() {
  const {pathname} = useLocation()
  const isRegistration = pathname.startsWith('/auth/registration')
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <div className='auth-shell d-flex flex-column flex-column-fluid' style={{background: '#fff'}}>
      <div
        aria-hidden='true'
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          height: '45vh', 
          backgroundImage: `url(${toAbsoluteUrl('/media/login-room.png')})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center bottom',
          backgroundSize: 'cover',
          filter: 'grayscale(100%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'
        style={{position: 'relative', zIndex: 1}}
      >
        {/* begin::Logo */}
        <a href='#' className='mb-5'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/nobilis-dark.svg')} />
        </a>
        {/* end::Logo */}

        {/* begin::Wrapper */}
        {/* <div className='w-lg-700px mx-auto'> */}
        <div className={`mx-auto w-100 ${isRegistration ? 'w-lg-700px' : 'w-lg-550px'}`} style={!isRegistration ? {maxWidth: 550} : undefined}>
          <div className='card card-flush shadow p-10'>
            <Switch>
              <Route path='/auth/login' component={Login} />
              <Route path='/auth/registration' component={RegitrationWizard} />
              <Route path='/auth/activate-account/:token' component={CreatePassword} />
              <Route path='/auth/forgot-password' component={ForgotPassword} />
              <Route path='/reset-password/:user/:token' component={ResetPassword} />
              <Redirect from='/auth' exact={true} to='/auth/login' />
              <Redirect to='/auth/login' />
            </Switch>
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}
