/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import * as auth from '../redux/AuthRedux'
import {login} from '../redux/AuthCRUD'
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Wrong email format').required('This field is required'),
  password: Yup.string().min(8, 'Minimum 8 symbols').required('This field is required'),
})

const initialValues = {
  email: '',
  password: '',
}

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
            const {access} = data
            dispatch(auth.actions.login(access))
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
      className='form w-100 p-5'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h2 className='nb-heading-h2 nb-text-center mb-3'>Welcome to Nobilis</h2>
        <div className='nb-body nb-center nb-muted'>Enter your credential to login.</div>
      </div>
      {/* begin::Heading */}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
      <label className='form-label nb-tag required'>Email</label>
        <input
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-underline',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container fs-8'>
            <span role='alert'  className='text-danger'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-5'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack'>
            {/* begin::Label */}
            <label className='form-label nb-tag required'>Password</label>

            {/* end::Label */}
          </div>
        </div>
        <div className='nb-input-wrap'>
          <input
            type={showPwd ? 'text' : 'password'}
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control form-control-lg form-control-underline',
              {
                'is-invalid': formik.touched.password && formik.errors.password,
              },
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              }
            )}
          />
          <button
            type='button'
            className='nb-input-eye'
            aria-label={showPwd ? 'Hide password' : 'Show password'}
            onClick={() => setShowPwd((s) => !s)}
          >
            <i className={`bi ${showPwd ? 'bi-eye-slash' : 'bi-eye'}`}></i>
          </button>
        </div>

        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block fs-8'>
              <span role='alert' className='text-danger'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      <div className='mb-10'>
        <Link
          to='/auth/forgot-password'
          className='nb-link-underline nb-link-underline--heading mt-4'
        >
          FORGOT PASSWORD ?
        </Link>
      </div>

      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn nb-btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label nb-heading-md'>LOG IN</span>}
          {loading && (
            <span className='indicator-progress nb-heading-md' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/registration' className='btn nb-btn-outline w-100 nb-heading-md'>
          REQUEST MEMBERSHIP
        </Link>
      </div>
      {/* end::Action */}
    </form>
  )
}
