import {FC, useState} from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'

const validationSchema = Yup.object().shape({
  experienceName: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  wantsToLead: Yup.boolean(),
})

interface FormValues {
  experienceName: string
  description: string
  wantsToLead: boolean
}

const SuggestExperienceForm: FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate =  useHistory();

  const handleSubmit = async (values: FormValues, {resetForm}: any) => {
    try {
      setLoading(true)
      console.log('Submitting:', values)
     
      resetForm()
    } catch (err) {
      console.error('Error submitting experience:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate.push('/experiences')
  }

  return (
    <div className='suggest-experience-form'>
      <div className='suggest-experience-form__header'>
        <h1 className='suggest-experience-form__title'>Have an Experience in Mind?</h1>
        <p className='suggest-experience-form__subtitle'>
          We'd love to hear your ideas—whether you envision leading an experience or simply
          participating in one.
          <br />
          <br />
          <strong>Want to lead, but not organize?</strong>
          <br />
          If you have a concept—safari, golf, sailing, or something else entirely—we'll take care
          of the logistics. We partner with top-tier luxury travel agencies to bring your vision to
          life. We organize, you lead in Nobilis Community.
          <br />
          <br />
          <strong>Prefer to participate, not lead?</strong>
          <br />
          Let us know what experience you dream of, and either Nobilis may bring it to reality.
          We're here to help make it happen.
        </p>
      </div>

      <Formik
        initialValues={{
          experienceName: '',
          description: '',
          wantsToLead: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({values, setFieldValue}) => (
          <Form className='suggest-experience-form__container'>
            <div className='suggest-experience-form__fields'>
              {/* Experience Name */}
              <div className='suggest-experience-form__field'>
                <label className='suggest-experience-form__label'>
                  Name The Suggested Experience
                </label>
                <Field
                  name='experienceName'
                  className='suggest-experience-form__input'
                  placeholder=''
                />
              </div>

              {/* Description */}
              <div className='suggest-experience-form__field'>
                <label className='suggest-experience-form__label'>Describe</label>
                <Field
                  name='description'
                  as='textarea'
                  className='suggest-experience-form__textarea'
                  placeholder=''
                />
                <p className='suggest-experience-form__helper'>
                  Tell us what you expect—your preferences, goals, and what would make this
                  experience special.
                </p>
              </div>
            </div>

            {/* Checkbox */}
            <div className='suggest-experience-form__checkbox-wrapper'>
              <label className='suggest-experience-form__checkbox'>
                <input
                  type='checkbox'
                  checked={values.wantsToLead}
                  onChange={(e) => setFieldValue('wantsToLead', e.target.checked)}
                />
                <span className='suggest-experience-form__checkbox-box'>
                  {values.wantsToLead && (
                    <svg width='10' height='8' viewBox='0 0 10 8' fill='none'>
                      <path
                        d='M1 4L3.5 6.5L9 1'
                        stroke='#151515'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  )}
                </span>
                <span className='suggest-experience-form__checkbox-label'>
                  I wanna lead this experience
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className='suggest-experience-form__actions'>
              <button
                type='button'
                className='nb-btn nb-btn--outline'
                onClick={handleCancel}
                disabled={loading}
              >
                <span>cancel</span>
              </button>
              <button
                type='submit'
                className='nb-btn nb-btn--dark'
                disabled={loading}
                aria-busy={loading}
              >
                {!loading ? (
                  <>
                    <span>submit</span>
                    <img
                      src='/media/svg/nobilis/vector1.svg'
                      alt=''
                      className='nb-btn-icon nb-btn-icon--white'
                    />
                  </>
                ) : (
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2' />
                  </span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SuggestExperienceForm