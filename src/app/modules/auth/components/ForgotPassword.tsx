import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import { requestPassword } from '../redux/AuthCRUD'

const initialValues = {
  email: '',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('This field is required'),
})

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {resetForm}) => {
      setLoading(true)
      setTimeout(() => {
        requestPassword(values.email)
        .then((result) => {
          setLoading(false)
          setShowAlert(true)
          resetForm()
          setTimeout(() => setShowAlert(false), 5000)
        })
        .catch(() => {
          setLoading(false)
          setErrorAlert(true)
          setTimeout(() => setErrorAlert(false), 5000)
        })
    }, 1000)
    },
  })

  return (
    <>
    {errorAlert && (
        <div className='alert alert-danger' role='alert'>
          Something went wrong. Please try again or contact support if the problem persists.
        </div>
      )}
      {showAlert && (
        <div className='alert alert-success' role='alert'>
          Success! Please check your email. We have sent you a link to reset your password.
        </div>
      )}
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='nb-heading-h2 nb-text-center mb-3'>Forgot Password?</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='nb-body nb-center nb-muted'>Enter your email to receive a secure link to reset your password.</div>
          {/* end::Link */}
        </div>

        
        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label className='form-label nb-tag required'>Email</label>
          <input
            type='email'
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg form-control-underline',
              {'is-invalid': formik.touched.email && formik.errors.email},
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block fs-8'>
                <span role='alert' className='text-danger'>{formik.errors.email}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='text-center'>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn nb-btn-primary w-100 mb-5'
          >
            {!loading && <span className='indicator-label nb-heading-md'>send recovery email</span>}
            {loading && (
              <span className='indicator-progress nb-heading-md' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <Link to='/auth/login'  className='nb-link-underline nb-link-underline--heading mt-4'>
            Back
          </Link>{' '}
        </div>
        {/* end::Form group */}
      </form>
    </>
  )
}
