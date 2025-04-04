/* eslint-disable jsx-a11y/anchor-is-valid */
import  {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {  RegitrationWizard } from './components/RegistrationWizard'

export function AuthPage() {
  useEffect(() => {
    document.body.classList.add('bg-dark')
    return () => {
      document.body.classList.remove('bg-dark')
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'>
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        <a href='#' className='mb-12'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo-1.svg')} className='h-45px' />
        </a>
        {/* end::Logo */} {/* begin::Wrapper */}
        <div className='w-lg-500px  rounded shadow-sm  mx-auto'>
          <Switch>
          <Route path='/auth/registration' component={RegitrationWizard} />
            <Route path='/auth/registration' component={RegitrationWizard} />
            <Route path='/auth/forgot-password' component={ForgotPassword} />
            <Redirect from='/auth' exact={true} to='/auth/login' />
            <Redirect to='/auth/registration' />      
          </Switch>          
        </div>       
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}
      <div className='d-flex flex-center flex-column-auto p-10'>
        <div className='d-flex align-items-center fw-bold fs-6'>
          <a href='#' className='text-muted text-hover-primary px-2'>
            About
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact Us
          </a>
        </div>
      </div>
      {/* end::Footer */}
    </div>
  )
}
