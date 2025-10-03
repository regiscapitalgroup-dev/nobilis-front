import {FC, useState} from 'react'
import {Formik, Form, Field, FieldArray} from 'formik'
import * as Yup from 'yup'
import {RecognitionModel} from '../models/RecognitionModel'
import Swal from 'sweetalert2'
import {updateUserRecognition} from '../../../services/recognitionService'

const RecognitionForm: FC = () => {
  const [loading, setLoading] = useState(false)
  const initialValues: RecognitionModel = {
    recognitions: [{description: '', link: ''}],
    links: [{url: ''}],
  }

  const validationSchema = Yup.object().shape({
    recognitions: Yup.array().of(
      Yup.object().shape({
        description: Yup.string().max(500, 'Max 500 characters'),
        link: Yup.string().url('Invalid URL').nullable(),
      })
    ),
    links: Yup.array().of(
      Yup.object().shape({
        url: Yup.string().url('Invalid URL').nullable(),
      })
    ),
  })

  const handleSubmit = async (values: RecognitionModel) => {
    console.log('Form values:', values)
    setLoading(true)
    await updateUserRecognition(values)
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        const errorMessage = error.response?.data?.error || error.message || 'Unknown error'
        console.log('error', error)
        console.log('error.response?.data?.error', error.response?.data?.error)
        Swal.fire({
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

  return (
    <div className='recognition-form'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({values}) => (
          <Form className='recognition-form__container'>
            <h2 className='recognition-form__title'>Edit Your Recognition</h2>

            {/* Reconocimientos */}
            <div className='recognition-form__section'>
              <h3 className='recognition-form__section-title'>
                Highlight Your Top Accomplishments
              </h3>
              <p className='recognition-form__section-subtitle'>
                List your most significant achievements—awards, recognitions, or major projects that
                reflect your journey. Include web links if available.
              </p>

              <FieldArray name='recognitions'>
                {({push}) => (
                  <div className='recognition-form__group'>
                    {values.recognitions.map((_, index) => (
                      <div key={index} className='recognition-form__recognition-item'>
                        <label className='recognition-form__label'>Recognition {index + 1}</label>
                        <Field
                          as='textarea'
                          name={`recognitions.${index}.description`}
                          placeholder='Describe your recognition'
                          maxLength={500}
                          className='recognition-form__input'
                        />
                        <Field
                          type='text'
                          name={`recognitions.${index}.link`}
                          placeholder='https://'
                          className='recognition-form__input'
                        />
                      </div>
                    ))}
                    <button
                      type='button'
                      className='recognition-form__add-btn'
                      onClick={() => push({description: '', link: ''})}
                    >
                      + Add more
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Links */}
            <div className='recognition-form__section'>
              <h3 className='recognition-form__section-title'>Additional Links</h3>
              <p className='recognition-form__section-subtitle'>
                Share links to articles, profiles, or content that best represent your expertise and
                vision.
              </p>

              <FieldArray name='links'>
                {({push}) => (
                  <div className='recognition-form__group'>
                    {values.links.map((_, index) => (
                      <div key={index} className='recognition-form__link-item'>
                        <label className='recognition-form__label'>Link {index + 1}</label>
                        <Field
                          type='text'
                          name={`links.${index}.url`}
                          placeholder='Input link here'
                          className='recognition-form__input'
                        />
                      </div>
                    ))}
                    <button
                      type='button'
                      className='recognition-form__add-btn'
                      onClick={() => push({url: ''})}
                    >
                      + Add more
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Botones */}
            <div className='recognition-form__actions'>
              <button
                type='button'
                className='recognition-form__btn recognition-form__btn--secondary'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='btn nb-btn-primary'
                disabled={loading}
                aria-busy={loading ? 'true' : 'false'}
                aria-live='polite'
              >
                {!loading ? (
                  <>
                    <span className='nb-heading-md'>save changes</span>
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
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RecognitionForm
