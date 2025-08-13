import {FC, useState} from 'react'
import Swal from 'sweetalert2'
import {ErrorMessage, Field, useField, useFormikContext} from 'formik'
import {FooterTitle, HeaderText} from '../helper/header-text'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {existUserName} from '../../redux/AuthCRUD'
import {KTSVG} from '../../../../../_metronic/helpers'
import CityAutocompleteField from '../fields/CityAutocompleteField'

const Step1: FC<{goNext: () => void}> = ({goNext}) => {
  const formik = useFormikContext<any>()
  const [field, meta, helpers] = useField('phoneNumber')
  const [loading, setLoading] = useState<boolean>(false)

  const handlerSubmit = (event: any) => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        event.preventDefault()
        Swal.fire({
          theme: 'dark',
          position: 'center',
          title: 'Do you want to save the changes?',
          html: `
              Submitting this form adds you yo our waiting list, it does not guarantee membership.
              `,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          confirmButtonColor: '#000000',
          denyButtonText: `Don't save`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            /* goNext() */
            setLoading(true)
            const credential = formik.getFieldProps('email')
            await existUserName(credential.value)
              .then(() => {
                setLoading(false)

                goNext()
              })
              .catch((error) => {
                setLoading(false)
                goNext()
                const errorMessage = error.response?.data?.error || error.message || 'Unknown error'
                console.log('error', error)
                Swal.fire({
                  theme: 'dark',
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
          } else if (result.isDenied) {
            Swal.fire({
              icon: 'info',
              theme: 'dark',
              text: 'Changes are not saved!',
              confirmButtonColor: '#000000',
            })
          }
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
              className={'form-control form-control-lg form-control-underline'}
              name='firstName'
            />
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block text-danger fs-8'>
                <ErrorMessage name='firstName' />
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
            <label className='form-label nb-tag '>SURNAME</label>
            <Field
              type='text'
              autoComplete='off'
              className={'form-control form-control-lg form-control-underline'}
              name='lastName'
            />
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block text-danger fs-8'>
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
                inputClass='form-control'
                value={field.value}
                onChange={(value) => helpers.setValue(value)}
              />

              <div className='fv-plugins-message-container'>
                <div className='fv-help-block text-danger fs-8'>
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
              className={'form-control form-control-lg form-control-underline'}
              name='email'
            />
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block text-danger fs-8'>
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
              className={'form-control form-control-lg form-control-underline'}
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
                className={'form-control form-control-lg form-control-underline'}
                name='referenced'
              />
            </div>
          </div>
        </div>
        {/* end::Form group REFERRED*/}

        <div className='text-center'>
          <FooterTitle
            text='Please complete the following confidential application to be considered. 
                 Submitting this form adds you to our waiting list; it does not guarantee membership.'
          />
          <div className='nb-divider my-6 ' aria-hidden='true'>
            <span className='nb-divider__line' />
            <span className='nb-divider__icon'>
              {/* tu SVG */}
              <KTSVG path='/media/svg/nobilis/fleur.svg' className='nb-fleur' />
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
              {!loading && <span className='indicator-label'>JOIN THE WAITING LIST</span>}
              {loading && (
                <span className='indicator-progress nb-heading-md' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </div>
        {/* <div className='text-center pt-5'>
          <Link to='/auth/login'>
            <div>
              <button
                type='submit'
                className='btn btn-lg btn-light bg-dark fw-bolder w-50'
                disabled={formik.isSubmitting || !formik.isValid}
              >
                <span>CANCEL</span>
              </button>
            </div>
          </Link>
        </div> */}
      </div>
    </>
  )
}

export {Step1}
