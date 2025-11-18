import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword} from '../redux/AuthCRUD'
import {useAlert} from '../../../hooks/utils/useAlert'

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
  const {showError} = useAlert()

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {resetForm}) => {
      setLoading(true)
      setTimeout(() => {
        requestPassword(values.email)
          .then((result) => {
            setLoading(false)
            resetForm()
          })
          .catch((error: any) => {
            setLoading(false)
            const statusCode = error?.response?.status || 500
            showError({
              title: 'Password Reset Unavailable',
              message:
                "We couldn't send the password reset link at this time. Please ensure your email is correct or try again in a few minutes.",
              errorCode: `AUTH_FORGOT_${statusCode}`,
            })
          })
      }, 1000)
    },
  })

  return (
    <>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='nb-heading-h2 nb-text-center mb-3'>Forgot password?</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='nb-body nb-center'>
            Enter your email to receive a secure link to reset your password.
          </div>
          {/* end::Link */}
        </div>

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label className='nb-tag'>EMAIL</label>
          <input
            type='email'
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('email')}
            className={clsx('form-control form-control-lg form-control-underline input-text-style')}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <div className='fv-help-block input-text-style fs-8 input-text-style'>
                  {formik.errors.email}
                </div>
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
            {!loading && (
              <>
                <span className=' nb-heading-md'>send recovery email</span>
                <img
                  src='/media/svg/nobilis/vector1.svg'
                  alt=''
                  className='nb-btn-icon nb-btn-icon--white'
                />
              </>
            )}

            {loading && (
              <span className='indicator-progress nb-heading-md' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <Link to='/auth/login' className='nb-link-underline nb-link-underline--heading mt-4'>
            Back
          </Link>{' '}
        </div>
        {/* end::Form group */}
      </form>
    </>
  )
}
