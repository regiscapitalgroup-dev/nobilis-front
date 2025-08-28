import {FC, useState} from 'react'
import Swal from 'sweetalert2'
import {ErrorMessage, Field, useField, useFormikContext} from 'formik'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {existUserName} from '../../redux/AuthCRUD'
import CityAutocompleteField from '../fields/CityAutocompleteField'

const Step1: FC<{goNext: () => void}> = ({goNext}) => {
  const formik = useFormikContext<any>()
  const [field, meta, helpers] = useField('phoneNumber')
  const [loading, setLoading] = useState<boolean>(false)

  const handlerSubmit = (event: any) => {
    formik.validateForm().then(async (errors) => {
      if (Object.keys(errors).length === 0) {
        event.preventDefault()
        setLoading(true)
        const credential = formik.getFieldProps('email')
        await existUserName(credential.value)
          .then(() => {
            setLoading(false)

            goNext()
          })
          .catch((error) => {
            setLoading(false)
            /*   goNext() */
            const errorMessage = error.response?.data?.error || error.message || 'Unknown error'
            console.log('error', error)
            console.log('error.response?.data?.error', error.response?.data?.error)
            Swal.fire({
              /* theme: 'dark', */
              title: 'An error has occurred.',
              html: `
                        <div class="fs-6">${errorMessage}.</div>
                        `,
              icon: 'error',
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false,
            })
          })
      }
    })
  }

  return (
    <>
      <div className='w-100 fv-plugins-bootstrap5 fv-plugins-framework '>
        {/* begin::Form group Name - Last Name */}
        <div className='row fv-row mb-2 nb-align-row'>
          <div className='col-xl-6'>
            <label className='form-label nb-tag-no-required'>NAME</label>
            <Field
              type='text'
              autoComplete='off'
              className={'form-control form-control-lg form-control-underline input-text-style'}
              name='firstName'
            />
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block input-text-style fs-8'>
                <ErrorMessage name='firstName' />
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
            <label className='form-label nb-tag-no-required'>SURNAME</label>
            <Field
              type='text'
              autoComplete='off'
              className={'form-control form-control-lg form-control-underline input-text-style'}
              name='lastName'
            />
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block input-text-style fs-8'>
                <ErrorMessage name='lastName' />
              </div>
            </div>
          </div>
        </div>
        {/* end::Form group Name - Last Name*/}

        {/* begin::Form group Email - Phone Number */}
        <div className='row fv-row mb-2 nb-align-row'>
          <div className='col-xl-6'>
            <label className='form-label nb-tag-no-required'>PHONE NUMBER</label>
            <div className='position-relative mb-3'>
              <PhoneInput
                {...field}
                country='us'
                placeholder='+1'
                containerClass='nb-phone'
                inputClass='form-control input-text-style'
                value={field.value}
                onChange={(value) => helpers.setValue(value)}
                disableDropdown
              />

              <div className='fv-plugins-message-container'>
                <div className='fv-help-block input-text-style fs-8'>
                  <ErrorMessage name='phoneNumber' />
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
            <label className='form-label nb-tag-no-required'>EMAIL</label>

            <Field
              type='text'
              autoComplete='off'
              className={'form-control form-control-lg form-control-underline input-text-style'}
              name='email'
            />
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block input-text-style fs-8'>
                <ErrorMessage name='email' />
              </div>
            </div>
          </div>
        </div>
        {/* end::Form group Email - Phone Number - CITY*/}

        {/* begin::Form group OCCUPATION-CITY */}
        <div className='row fv-row mb-2 nb-align-row'>
          <div className='col-xl-6'>
            <label className='form-label nb-tag-no-required'>OCCUPATION</label>
            <Field
              type='text'
              className={'form-control form-control-lg form-control-underline input-text-style'}
              name='occupation'
            />
          </div>
          <div className='col-xl-6'>
            <label className='form-label nb-tag-no-required'>CITY</label>

            <div className=''>
              <CityAutocompleteField
                name='city' // guarda el nombre (label) en country
                /* options={COUNTRY_OPTIONS} */
              />
            </div>
          </div>
        </div>
        {/* end::Form group OCCUPATION-CITY*/}

        {/* begin::Form group REFERRED */}
        <div className='mb-10 fv-row'>
          <div className='mb-1'>
            <label className='form-label nb-tag-no-required'>
              Invited by (Please provide a name)
            </label>
            <div className='position-relative mb-3'>
              <Field
                type='text'
                className={'form-control form-control-lg form-control-underline input-text-style'}
                name='referenced'
              />
            </div>
          </div>
        </div>
        {/* end::Form group REFERRED*/}

        <div className='nb-note-wrap'>
          <p className='nb-note-figma'>
            Please complete the following confidential application to be considered.
            {'\n'}Submitting this form adds you to our waiting list; it does not guarantee
            membership.
          </p>

          <div className='nbx-lines' aria-hidden='true'>
            <span className='nbx-lines__line' />
            <span>
              <img src='/media/svg/nobilis/mark.svg' alt='divider' className='payment-card__icon' />
            </span>
            <span className='nbx-lines__line' />
          </div>
        </div>
        <div className='text-center pt-5'>
          <div>
            <button
              type='submit'
              className='btn nb-btn-outline w-100 nb-heading-md'
              onClick={handlerSubmit}
            >
              {!loading && (
                <>
                <span className='indicator-label nb-heading-md'>JOIN THE WAITING LIST</span>
                <img
                src='/media/svg/nobilis/vector1.svg'
                alt=''
                className='nb-btn-icon nb-btn-icon--black'
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
          </div>
        </div>
      </div>
    </>
  )
}

export {Step1}
