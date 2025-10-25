/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import * as auth from '../redux/AuthRedux'
import {login} from '../redux/AuthCRUD'
import Swal from 'sweetalert2'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Wrong email format').required('This field is required'),
  password: Yup.string().required('This field is required'),
})


const initialValues = {email: '', password: ''}

const showError = () => {
  Swal.fire({
    title:
      '<span style="font-family: Oswald, sans-serif; font-weight: 500; color: #151515; font-size: 40px;">Error</span>',
    html: `
      <p style="font-family: Satoshi, sans-serif; font-weight: 300; color: #808080; font-size: 14px; line-height: 1.4;">
        Something went wrong with your application. Please try again or contact support.
      </p>
      <p style="font-family: Satoshi, sans-serif; font-weight: 300; color: #B4B4B4; font-size: 10px; margin-top: 15px;">
        You can close this window
      </p>
    `,
    icon: 'error',
    confirmButtonText: 'Close',
    customClass: {
      popup: 'custom-popup',
      confirmButton: 'custom-button',
    },
    buttonsStyling: false,
  })
}

const showErrorV2 = () => {
  Swal.fire({
    html: `
      <div style="text-align: center; padding: 20px;">
        <div style="width: 80px; height: 80px; background: #FEE2E2; border-radius: 50%; margin: 0 auto 30px; display: flex; align-items: center; justify-content: center;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2 style="font-family: Oswald, sans-serif; font-weight: 500; color: #151515; font-size: 32px; margin-bottom: 20px; line-height: 1.2;">
          Unable to Submit Application
        </h2>
        <p style="font-family: Satoshi, sans-serif; font-weight: 300; color: #808080; font-size: 14px; line-height: 1.6; margin-bottom: 15px;">
          We encountered an error while processing your request. Please check your information and try again.
        </p>
        <p style="font-family: Satoshi, sans-serif; font-weight: 300; color: #B4B4B4; font-size: 10px; line-height: 1.4;">
          Error Code: APP_SUBMIT_001
        </p>
      </div>
    `,
    showCloseButton: false,
    showConfirmButton: true,
    confirmButtonText: 'Try Again',
    customClass: {
      popup: 'custom-popup',
      confirmButton: 'custom-button'
    },
    buttonsStyling: false
  });
};


export function Login() {
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setSubmitting}) => {
      setLoading(true)
      setTimeout(() => {
        login(values.email, values.password)
          .then((data) => {
            dispatch(auth.actions.login(data.access))
            setLoading(false)
          })
          .catch(() => {
            setLoading(false)
            setSubmitting(false)
            alert('an error has occurred')
          })
      }, 1000)
    },
  })

  return (
    <>
     {/*  <button
        onClick={showErrorV2}
        className='bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg'
        style={{fontFamily: 'Satoshi'}}
      >
        Mostrar Error
      </button> */}
      <form
        className='form nb-form-520'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >
        {/* Header (gap 10 entre título y subtítulo) */}
        <div className='nb-auth-header'>
          <h2 className='nb-heading-h2'>Welcome to Nobilis</h2>
          <div className='nb-subtitle'>Enter your credential to login.</div>
        </div>

        <div className='nb-fields-section'>
          {/* Campo Email */}
          <div className='nb-field'>
            <label className='nb-tag'>EMAIL</label>
            <div className='nb-field-stack'>
              <input
                {...formik.getFieldProps('email')}
                className='form-control form-control-underline'
                type='email'
                name='email'
                autoComplete='off'
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <span role='alert' className='input-text-style'>
                  {formik.errors.email}
                </span>
              </div>
            )}
          </div>

          <div className='nb-password-section'>
            <div className='nb-field'>
              <label className='nb-tag'>PASSWORD</label>
              <div className='nb-field-stack'>
                <div className='nb-input-wrap'>
                  <input
                    type={showPwd ? 'text' : 'password'}
                    autoComplete='off'
                    {...formik.getFieldProps('password')}
                    className='form-control form-control-underline'
                  />
                  <button
                    type='button'
                    className='nb-input-eye'
                    aria-label={showPwd ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPwd((s) => !s)}
                  >
                    <div>
                      <i className={`bi ${showPwd ? 'bi-eye-slash' : 'bi-eye'}`} />
                    </div>
                  </button>
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className='fv-plugins-message-container'>
                  <span role='alert' className='input-text-style'>
                    {formik.errors.password}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Forgot password (alineado a la izquierda) */}
          <div className='nb-auth-links'>
            <Link to='/auth/forgot-password' className='nb-link-underline'>
              FORGOT PASSWORD?
            </Link>
          </div>
        </div>

        {/* Sección de botones con gap 15px */}
        <div className='nb-auth-actions'>
          <button
            type='submit'
            className='btn nb-btn-primary'
            disabled={loading}
            aria-busy={loading ? 'true' : 'false'}
            aria-live='polite'
          >
            {!loading ? (
              <>
                <span className='nb-heading-md'>LOG IN</span>
                <img
                  src='/media/svg/nobilis/vector1.svg'
                  alt=''
                  className='nb-btn-icon nb-btn-icon--white'
                />
              </>
            ) : (
              <span className='indicator-progress nb-heading-md'>
                Please wait...
                <span
                  className='spinner-border spinner-border-sm align-middle ms-2'
                  role='status'
                  aria-hidden='true'
                />
              </span>
            )}
          </button>

          <Link to='/auth/registration' className='btn nb-btn-outline'>
            <span className='nb-heading-md'>REQUEST MEMBERSHIP</span>
            <img
              src='/media/svg/nobilis/vector1.svg'
              alt=''
              className='nb-btn-icon nb-btn-icon--black'
            />
          </Link>
        </div>
      </form>
    </>
  )
}
