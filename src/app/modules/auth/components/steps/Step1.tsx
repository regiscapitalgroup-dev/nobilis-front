import {FC, useState} from 'react'
import Swal from 'sweetalert2'
import {ErrorMessage, Field, useField, useFormikContext} from 'formik'
import {FooterTitle, HeaderText} from '../helper/header-text'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {existUserName} from '../../redux/AuthCRUD'
import {KTSVG} from '../../../../../_metronic/helpers'
import CityAutocompleteField from '../fields/CityAutocompleteField'
import { Link } from 'react-router-dom'

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
        {/* begin::Heading */}
        <HeaderText
          title='There is currently a waiting list for Nobilis membership'
          subtitle='To join the waiting list, please leave your details below:'
        />
        {/* end::Heading */}

        {/* begin::Form group Name - Last Name */}
        <div className='row fv-row mb-2 nb-align-row'>
          <div className='col-xl-6'>
            <label className='form-label nb-tag'>NAME</label>
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
            <label className='form-label nb-tag '>SURNAME</label>
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
            <label className='form-label nb-tag '>PHONE NUMBER</label>
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
            <label className='form-label nb-tag '>EMAIL</label>

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
            <label className='form-label nb-tag'>OCCUPATION</label>
            <Field
              type='text'
              className={'form-control form-control-lg form-control-underline input-text-style'}
              name='occupation'
            />
          </div>
          <div className='col-xl-6'>
            <label className='form-label nb-tag '>CITY</label>

            <div className='position-relative mb-2 nb-autocomplete'>
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
            <label className='form-label nb-tag'>Invited by (Please provide a name)</label>
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

        

        <div className='text-center'>
            <div className='nb-body mt-8 mb-2'>
            Please complete the following confidential application to be considered. 
            Submitting this form adds you to our waiting list; it does not guarantee membership.
            </div>

            <div className='nb-divider my-6' aria-hidden='true'>
              <span className='nb-divider__line' />
              <span className='nb-divider__icon'>
                <svg className='nb-fleur' viewBox='0 0 24 25' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M12.4438 18.6367C12.5961 19.546 13.0832 21.5453 13.8139 22.2725C13.6629 22.7233 13.0918 23.8893 12.0131 24.9727V25C12.0086 24.9955 12.0039 24.9908 11.9994 24.9863C11.995 24.9907 11.9911 24.9956 11.9867 25V24.9727C10.9079 23.8892 10.3369 22.7233 10.1859 22.2725C10.9165 21.5452 11.4038 19.5459 11.5561 18.6367H12.4438ZM7.44571 17.7275C7.14127 18.3337 6.80678 19.6364 7.90274 20C8.99841 20.3633 9.57652 19.2428 9.72891 18.6367H10.643C10.4907 20.1519 9.63771 22.9091 7.44571 21.8184C5.25364 20.7275 6.5323 18.6367 7.44571 17.7275ZM16.5541 17.7275C17.4675 18.6368 18.7458 20.7275 16.5541 21.8184C14.3621 22.9092 13.5092 20.1519 13.3568 18.6367H14.2699C14.4223 19.2428 15.0011 20.3636 16.0971 20C17.1929 19.6364 16.8585 18.3337 16.5541 17.7275ZM14.7309 16.1826C15.2329 16.1826 15.64 16.5897 15.64 17.0918C15.6399 17.5938 15.2329 18.001 14.7309 18.001H9.2416C8.73975 18.0008 8.33252 17.5937 8.33243 17.0918C8.33243 16.5898 8.73969 16.1828 9.2416 16.1826H14.7309ZM0.13809 12.7285C1.24013 8.63713 9.72855 9.54643 11.099 15.4551H9.2709C8.66173 14.6974 6.89541 13.1826 4.70352 13.1826C1.96374 13.183 2.4208 16.8528 5.61758 15.9102C3.63881 16.8192 -0.840974 16.3638 0.13809 12.7285ZM12.8998 15.4551C14.2702 9.5463 22.7597 8.6371 23.8617 12.7285C24.8407 16.3637 20.361 16.8192 18.3822 15.9102C21.5791 16.8528 22.0355 13.1826 19.2953 13.1826C17.1037 13.1827 15.3382 14.6974 14.7289 15.4551H12.8998ZM12.0131 0.0449219C12.9367 1.58458 14.8221 5.11178 15.184 7.27246C15.6407 9.99973 14.2703 10.4547 13.3568 11.8184C12.6626 12.8549 12.1892 14.5207 12.0131 15.334V15.4541C12.0092 15.4348 12.0037 15.4151 11.9994 15.3945C11.9951 15.4151 11.9906 15.4349 11.9867 15.4541V15.3359C11.8109 14.5234 11.3377 12.8557 10.643 11.8184C9.72956 10.4547 8.35912 9.99973 8.81582 7.27246C9.17776 5.11171 11.0632 1.5845 11.9867 0.0449219V0Z' />
                </svg>
              </span>
              <span className='nb-divider__line' />
            </div>
          </div>
        <div className='text-center pt-5'>
          <div>
            <button
              type='submit'
              className='btn nb-btn-outline w-100 nb-heading-md'
              onClick={handlerSubmit}
            >
              {!loading && <span className='indicator-label nb-heading-md'>JOIN THE WAITING LIST</span>}
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
        </div>        
      </div>
    </>
  )
}

export {Step1}
