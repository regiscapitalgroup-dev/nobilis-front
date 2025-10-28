import React, {FC, useState, useRef, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {CustomSelect} from './CustomSelect'
import {partnerCreate} from '../../../../../../services/partnerShipService'
import {usePartenshipTypesField} from '../../../../../../hooks/components/usePartnershipTypes'

const partnershipSchema = Yup.object().shape({
  partnership_type: Yup.string(),
  full_name: Yup.string(),
  email: Yup.string().email('Invalid email format'),
  company_name: Yup.string(),
  message: Yup.string(),
})

export const PartnershipForm: FC = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const {collection} = usePartenshipTypesField()

  const formik = useFormik({
    initialValues: {
      partner_type_id: '',
      full_name: '',
      email: '',
      company_name: '',
      message: '',
    },
    validationSchema: partnershipSchema,
    onSubmit: async (values, {setSubmitting, resetForm}) => {
      setLoading(true)

      try {
        await partnerCreate(values)
        setSubmitting(false)
        resetForm()
        setSuccess(true)
        setTimeout(() => setSuccess(false), 5000)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <div className='landing-footer__contact-info'>
        <h2 className='landing-footer__title'>Contact us for Partnership Enquires</h2>
        <p className='landing-footer__description'>
          If you are interested in partnership with Nobilis, you can also email partners
          <span className='landing-footer__email-at'>@</span>
          joinnobilis.com
        </p>
      </div>

      <form className='landing-footer__form' onSubmit={formik.handleSubmit}>
        <div className='landing-footer__form-fields'>
          {/* Custom Select */}
          <div className='landing-footer__field'>
            <label className='landing-footer__label'>Partnership Type</label>
            <CustomSelect
              value={formik.values.partner_type_id}
              onChange={(value) => formik.setFieldValue('partner_type_id', value)}
              options={collection}
              placeholder='Select Partnership Type'
              name='partner_type_id'
              
            />
            {/* {formik.touched.partnership_type && formik.errors.partnership_type && (
              <div className='landing-footer__error'>{formik.errors.partnership_type}</div>
            )} */}
          </div>

          <div className='landing-footer__field'>
            <label className='landing-footer__label'>Name, Surname</label>
            <input
              type='text'
              name='full_name'
              className='landing-footer__input'
              value={formik.values.full_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>

          <div className='landing-footer__field'>
            <label className='landing-footer__label'>E-mail</label>
            <input
            required
              type='email'
              name='email'
              className='landing-footer__input'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className='landing-footer__field'>
            <label className='landing-footer__label'>Company</label>
            <input
            required
              type='text'
              name='company_name'
              className='landing-footer__input'
              value={formik.values.company_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className='landing-footer__field'>
            <label className='landing-footer__label'>Message</label>
            <textarea
            required
              name='message'
              className='landing-footer__textarea landing-footer__textarea--tall'
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={6}
            />
          </div>
        </div>

        <div className='landing-footer__actions'>
          {success && (
            <div className='landing-footer__alert' role='status' aria-live='polite'>
              <span className='landing-footer__alert-icon' aria-hidden='true'>
                <svg
                  width='24'
                  height='25'
                  viewBox='0 0 24 25'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12.4438 18.6367C12.5962 19.546 13.0834 21.5453 13.814 22.2725C13.663 22.7233 13.0919 23.8893 12.0132 24.9727V25C12.0087 24.9955 12.004 24.9908 11.9995 24.9863C11.9951 24.9907 11.9912 24.9956 11.9868 25V24.9727C10.908 23.8892 10.337 22.7233 10.186 22.2725C10.9166 21.5452 11.4039 19.5459 11.5562 18.6367H12.4438ZM7.4458 17.7275C7.14137 18.3337 6.80694 19.6364 7.90283 20C8.9985 20.3633 9.57661 19.2428 9.729 18.6367H10.6431C10.4907 20.1519 9.6378 22.9091 7.4458 21.8184C5.25381 20.7275 6.53241 18.6367 7.4458 17.7275ZM16.5542 17.7275C17.4676 18.6368 18.7459 20.7275 16.5542 21.8184C14.3622 22.9091 13.5093 20.1519 13.3569 18.6367H14.27C14.4224 19.2428 15.0013 20.3635 16.0972 20C17.193 19.6364 16.8586 18.3337 16.5542 17.7275ZM14.731 16.1826C15.233 16.1826 15.6401 16.5897 15.6401 17.0918C15.64 17.5938 15.233 18.001 14.731 18.001H9.2417C8.73987 18.0008 8.33359 17.5937 8.3335 17.0918C8.3335 16.5899 8.73981 16.1828 9.2417 16.1826H14.731ZM0.138184 12.7285C1.24023 8.63713 9.72864 9.54644 11.0991 15.4551H9.271C8.6618 14.6974 6.89548 13.1826 4.70361 13.1826C1.96391 13.183 2.42096 16.8528 5.61768 15.9102C3.63888 16.8192 -0.840859 16.3637 0.138184 12.7285ZM12.8999 15.4551C14.2703 9.5463 22.7597 8.63711 23.8618 12.7285C24.8408 16.3637 20.3611 16.8192 18.3823 15.9102C21.5792 16.8528 22.0356 13.1826 19.2954 13.1826C17.1038 13.1828 15.3383 14.6974 14.729 15.4551H12.8999ZM12.0132 0.0449219C12.9368 1.58458 14.8222 5.11178 15.1841 7.27246C15.6408 9.99973 14.2703 10.4547 13.3569 11.8184C12.6627 12.8549 12.1893 14.5207 12.0132 15.334V15.4541C12.0093 15.4348 12.0038 15.4151 11.9995 15.3945C11.9952 15.4151 11.9907 15.4349 11.9868 15.4541V15.3359C11.811 14.5234 11.3378 12.8557 10.6431 11.8184C9.72966 10.4547 8.35922 9.99971 8.81592 7.27246C9.17785 5.11172 11.0633 1.58451 11.9868 0.0449219V0C11.9912 0.0073097 11.9951 0.015055 11.9995 0.0224609C12.004 0.0149526 12.0087 0.00741027 12.0132 0V0.0449219Z'
                    fill='#460107'
                  />
                </svg>
              </span>
              <span className='landing-footer__alert-text'>
                Your partnership inquiry successfully sent!
              </span>
            </div>
          )}

          <button
            type='submit'
            className='landing-footer__submit-btn'
            disabled={loading}
            aria-busy={loading ? 'true' : 'false'}
            aria-live='polite'
          >
            {!loading ? (
              <>
                <span className='nb-heading-md'>SUBMIT</span>
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
        </div>
      </form>
    </>
  )
}
