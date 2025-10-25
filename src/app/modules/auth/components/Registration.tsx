/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'

const initialValues = {
  name: '',
  lastname: '',
  email: '',
  phone_number: '',
  occupation: '',
  city: '',
  referenced: '',
  status_waiting_list: 0,
}

const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  lastname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
  phone_number: Yup.string().required('Phone number is required'),
})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const [statusAlert, setStatusAlert] = useState<string>('')
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        formik.resetForm()
        setLoading(false)
        setStatusAlert('success')
        setStatus('Registration process has been completed')
      } catch (error) {
        setLoading(false)
        setSubmitting(false)
        setStatusAlert('danger')
        setStatus('Registration process has broken')
      }
    },
  })

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='mb-10 text-center'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>Request Membership</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-400 fw-bold fs-4'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        {/* end::Link */}
      </div>
      {/* end::Heading */}

      {formik.status && (
        <div className={`mb-lg-15 alert alert-${statusAlert}`}>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Firstname */}
      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>First name</label>
          <input
            placeholder='First name'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('name')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.name && formik.errors.name,
              },
              {
                'is-valid': formik.touched.name && !formik.errors.name,
              }
            )}
          />
          {formik.touched.name && formik.errors.name && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.name}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>Last name</label>
          <input
            placeholder='Last name'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('lastname')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.lastname && formik.errors.lastname,
              },
              {
                'is-valid': formik.touched.lastname && !formik.errors.lastname,
              }
            )}
          />
          {formik.touched.lastname && formik.errors.lastname && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.lastname}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Email */}
      <div className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className='mb-10 fv-row'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Phone number</label>
          <div className='position-relative mb-3'>
            <input
              type='text'
              placeholder='Phone number'
              autoComplete='off'
              {...formik.getFieldProps('phone_number')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.phone_number && formik.errors.phone_number,
                },
                {
                  'is-valid': formik.touched.phone_number && !formik.errors.phone_number,
                }
              )}
            />
            {formik.touched.phone_number && formik.errors.phone_number && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.phone_number}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* end::Form group */}

      <div className='fv-row mb-10'>
        <label className='form-label fw-bolder text-dark fs-6 mb-4'>Which best describes you</label>
        <span className='form-check form-check-custom form-check-solid mb-4'>
          <input className='form-check-input' type='radio' name='category' value='1' />
          <div className='ms-2'>First choice</div>
        </span>
        <span className='form-check form-check-custom form-check-solid '>
          <input className='form-check-input' type='radio' name='category' value='1' />
          <div className='ms-2'>Second choice</div>
        </span>
      </div>

      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
