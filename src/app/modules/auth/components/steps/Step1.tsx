import  {FC} from 'react'
import Swal from 'sweetalert2'
import {ErrorMessage, Field, useField, useFormikContext} from 'formik'
import {FooterTitle, HeaderText, HeaderTitle} from '../helper/header-text'
import countries from '../helper/json-data/countries.json'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const Step1: FC<{goNext: () => void}> = ({goNext}) => {
  const formik = useFormikContext<any>()
  const [field, meta, helpers] = useField('phoneNumber')

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
        }).then((result) => {
          if (result.isConfirmed) {
            goNext()
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
      <div className='w-100'>
        <div className='w-100 fv-plugins-bootstrap5 fv-plugins-framework w-lg-500px'>
          {/* begin::Heading */}
          <div className='mb-10 text-center'>
            <HeaderText />
            <HeaderTitle
              text={'To join the waiting list or refer a friend, please leave the details below.'}
            />
          </div>
          {/* end::Heading */}

          {/* begin::Form group Name - Last Name */}
          <div className='row fv-row mb-7'>
            <div className='col-xl-6'>
              <label className='class="form-label text-muted fs-7 required'>FIRST NAME</label>
              <Field
                type='text'
                autoComplete='off'
                className={'form-control form-control-lg form-control-solid bg-dark text-white'}
                name='firstName'
              />
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block text-white fs-8'>
                  <ErrorMessage name='firstName' />
                </div>
              </div>
            </div>
            <div className='col-xl-6'>
              <label className='class="form-label text-muted fs-7 required'>LAST NAME</label>
              <Field
                type='text'
                autoComplete='off'
                className={'form-control form-control-lg form-control-solid bg-dark text-white'}
                name='lastName'
              />
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block text-white fs-8'>
                  <ErrorMessage name='lastName' />
                </div>
              </div>
            </div>
          </div>
          {/* end::Form group Name - Last Name*/}

          {/* begin::Form group Email - Phone Number */}
          <div className='row fv-row mb-7'>
            <div className='col-xl-6'>
              <label className='form-label text-muted fs-7 required'>EMAIL</label>
              <Field
                type='text'
                autoComplete='off'
                className={'form-control form-control-lg form-control-solid bg-dark text-white'}
                name='email'
              />
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block text-white fs-8'>
                  <ErrorMessage name='email' />
                </div>
              </div>
            </div>
            <div className='col-xl-6'>
              <label className='form-label text-muted fs-7 required'>PHONE NUMBER</label>
              <div className='position-relative mb-3'>
                <PhoneInput
                  {...field}
                  country={'us'}
                  inputClass='form-control form-control-lg form-control-solid bg-dark text-white'
                  value={field.value}
                  onChange={(value) => helpers.setValue(value)}
                  inputStyle={{width: '100%'}}
                />

                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block text-white fs-8'>
                    <ErrorMessage name='phoneNumber' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end::Form group Email - Phone Number - CITY*/}

          {/* begin::Form group OCCUPATION-CITY */}
          <div className='row fv-row mb-7'>
            <div className='col-xl-6'>
              <label className='form-label text-muted fs-7'>OCCUPATION</label>
              <Field
                type='text'
                className={'form-control form-control-lg form-control-solid bg-dark text-white'}
                name='occupation'
              />
            </div>
            <div className='col-xl-6'>
              <label className='form-label text-muted fs-7'>COUNTRY</label>

              <div className='position-relative mb-3'>
                <Field
                  as='select'
                  name='country'
                  className='form-select form-select-lg form-select-solid bg-dark text-white'
                >
                  <option>Selected option</option>
                  {countries.map((type, index) => (
                    <option key={index} value={type.code}>
                      {type.name}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
          </div>
          {/* end::Form group OCCUPATION-CITY*/}

          {/* begin::Form group REFERRED */}
          <div className='mb-10 fv-row'>
            <div className='mb-1'>
              <label className='form-label text-muted fs-7'>
                REFERRED/INVITED BY (PLEASE PROVIDE NAME)
              </label>
              <div className='position-relative mb-3'>
                <Field
                  type='text'
                  className={'form-control form-control-lg form-control-solid bg-dark text-white'}
                  name='referenced'
                />
              </div>
            </div>
          </div>
          {/* end::Form group REFERRED*/}

          <div className='text-center'>
            <FooterTitle text='Please complete the following confidential application to be considered. Submitting this form adds you yo ourwaiting list, it does not guarantee membership' />
          </div>
          <div className='text-center pt-15'>
            <div>
              <button
                type='submit'
                className='btn btn-lg btn-light border bg-dark me-3'
                onClick={handlerSubmit}
              >
                <span className='indicator-label'>JOIN THE WAITING LIST</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {Step1}
