import {FC, useState} from 'react'
import {Formik, Form, Field, FieldArray, FormikProps} from 'formik'
import * as Yup from 'yup'
import {RecognitionModel} from '../models/RecognitionModel'
import {updateUserRecognition} from '../../../services/recognitionService'
import {useHistory} from 'react-router-dom'
import {useUserProfileContext} from '../../../context/UserProfileContext'

const RecognitionForm: FC = () => {
  const {refetch} = useUserProfileContext()
  const [loading, setLoading] = useState(false)
  const navigate = useHistory()

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
    setLoading(true)
    await updateUserRecognition(values)
      .then(async () => {
        setLoading(false)
        await refetch()
        navigate.push('/biography')
      })
      .catch((error) => {
        setLoading(false)
        const errorMessage = error.response?.data?.error || error.message || 'Unknown error'
        console.log('error', error)
        console.log('error.response?.data?.error', error.response?.data?.error)
      })
  }

  return (
    <div className='recognition-form'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({values}: FormikProps<RecognitionModel>) => (
          <Form className='recognition-form__container'>
            <h2 className='recognition-form__title'>Edit Your Recognition</h2>

            {/* Recognitions Section */}
            <div className='recognition-form__section'>
              <div className='recognition-form__section-header'>
                <h3 className='recognition-form__section-title'>
                  Highlight Your Top Accomplishments
                </h3>
                <p className='recognition-form__section-subtitle'>
                  List 3-9 of your most significant achievements, including awards, recognitions, or
                  major projects
                </p>
              </div>

              <FieldArray name='recognitions'>
                {({push}) => (
                  <div className='recognition-form__group'>
                    {values.recognitions.map((recognition, index) => (
                      <div key={index} className='recognition-form__recognition-item'>
                        <label className='recognition-form__label'>Recognition {index + 1}</label>
                        <div className='recognition-form__field-container'>
                          <div className='recognition-form__field-wrapper'>
                            <div className='recognition-form__textarea-wrapper'>
                              <Field
                                as='textarea'
                                name={`recognitions.${index}.description`}
                                placeholder='Describe your recognition'
                                maxLength={500}
                                className='recognition-form__textarea'
                              />
                            </div>
                            <div className='recognition-form__counter'>
                              <span className='recognition-form__counter-placeholder'>
                                Description
                              </span>
                              <span className='recognition-form__counter-text'>
                                {recognition.description?.length || 0}/500
                              </span>
                            </div>
                          </div>

                          <div className='recognition-form__link-wrapper'>
                            <Field
                              type='text'
                              name={`recognitions.${index}.link`}
                              placeholder='https://'
                              className='recognition-form__link-input'
                            />
                          </div>
                        </div>

                        {recognition.description && (
                          <p className='recognition-form__link-explanation'>
                            The link will be seamlessly integrated into the text, enabling visitors
                            to click on the achievement description. You may remove it by deleting
                            the corresponding text.
                          </p>
                        )}
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

            {/* Additional Links Section */}
            <div className='recognition-form__section'>
              <div className='recognition-form__section-header'>
                <h3 className='recognition-form__section-title'>Additional Links</h3>
                <p className='recognition-form__section-subtitle'>
                  Share links to articles, profiles, or content that best represent your expertise
                  and vision.
                </p>
              </div>

              <FieldArray name='links'>
                {({push}) => (
                  <div className='recognition-form__group'>
                    {values.links.map((_, index) => (
                      <div key={index} className='recognition-form__link-item'>
                        <label className='recognition-form__label'>Link {index + 1}</label>
                        <div className='recognition-form__additional-link-wrapper'>
                          <Field
                            type='text'
                            name={`links.${index}.url`}
                            placeholder='Input link here'
                            className='recognition-form__additional-link-input'
                          />
                        </div>
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

            {/* Action Buttons */}
            <div className='recognition-form__actions'>
              <button
                type='button'
                className='recognition-form__btn recognition-form__btn--secondary'
                onClick={() => {
                  navigate.push('/biography')
                }}
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
