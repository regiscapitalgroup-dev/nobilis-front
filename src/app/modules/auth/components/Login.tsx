/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import * as auth from '../redux/AuthRedux'
import {login} from '../redux/AuthCRUD'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Wrong email format').required('This field is required'),
  password: Yup.string().required('This field is required'),
})

const initialValues = { email: 'omar.espinoza@outlook.com', password: 'tomachangotubanana' }
/* const initialValues = {email: '', password: ''} */

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
  )
}
