import {FC, useState} from 'react'
import {Formik, Form, Field, FieldArray} from 'formik'
import * as Yup from 'yup'
import {BiographyModel} from '../models/BiographyModel'
import {updateUserBiography} from '../../../services/biographyService'
import {useHistory} from 'react-router-dom'
import {useUserProfileContext} from '../../../context/UserProfileContext'
import {useAlert} from '../../../hooks/utils/useAlert'

const MAX_BIO_LENGTH = 1000
const MAX_URLS = 3

const validationSchema = Yup.object({
  biography: Yup.string().max(MAX_BIO_LENGTH, 'Maximum 1000 characters'),
  urls: Yup.array()
    .of(
      Yup.string()
        .transform((value) => {
          if (!value) return value

          let normalizedUrl = String(value).trim()

          if (
            normalizedUrl &&
            !normalizedUrl.startsWith('http://') &&
            !normalizedUrl.startsWith('https://')
          ) {
            normalizedUrl = `https://${normalizedUrl}`
          }

          return normalizedUrl
        })
        .url('Must be a valid URL')
    )
    .max(MAX_URLS, `You can only add up to ${MAX_URLS} URLs`),
})

const BiographyForm: FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useHistory()
  const {refetch} = useUserProfileContext()
  const {showError} = useAlert()
  const initialValues: BiographyModel = {
    biography: '',
    urls: [''],
  }

  const handleSubmit = async (values: BiographyModel) => {
    try {
      setLoading(true)
      const normalizedUrls = values.urls
        .filter((url) => url.trim() !== '')
        .map((url) => {
          let normalizedUrl = String(url ?? '').trim()

          if (
            normalizedUrl &&
            !normalizedUrl.startsWith('http://') &&
            !normalizedUrl.startsWith('https://')
          ) {
            normalizedUrl = `https://${normalizedUrl}`
          }

          return normalizedUrl
        })

      const payload = {
        biography: values.biography,
        urls: normalizedUrls,
      }

      await updateUserBiography(payload)
      await refetch()
      navigate.push('/biography')
    } catch (error: any) {
      console.log(error)
      const statusCode = error?.response?.status || 500
      showError({
        title: 'Unable to update biography',
        message: "We couldn't save your changes. Please review your information and try again.",
        errorCode: `BIOGRAPHY_${statusCode}`,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='biography-form-container'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({values, handleChange}) => (
          <Form className='biography-form'>
            {/* Title */}
            <h1 className='biography-title'>Edit Your Biography</h1>

            {/* Biography */}
            <div className='biography-section'>
              <label className='section-label'>Your Biography</label>
              <p className='section-description'>
                Tell us about your journey—what shaped you, what drives you, and what you aspire to
                achieve. Please write a brief biography including your professional background, key
                accomplishments, and personal interests. Focus on the defining moments, decisions,
                and experiences that have shaped your path.
              </p>

              <div className='textarea-wrapper'>
                <Field
                  as='textarea'
                  name='biography'
                  className='textarea-input'
                  maxLength={MAX_BIO_LENGTH}
                  onChange={handleChange}
                />
                <div className='textarea-footer'>
                  <span className='textarea-hint'>Share your biography. Maximum 1000</span>
                  <span className='textarea-counter'>
                    {values.biography.length}/{MAX_BIO_LENGTH}
                  </span>
                </div>
              </div>
            </div>

            {/* YouTube Videos */}
            <div className='biography-section'>
              <label className='section-label'>YouTube Videos</label>
              <p className='section-description'>
                Upload up to three videos to showcase your story.
              </p>

              <FieldArray name='urls'>
                {({push, remove}) => (
                  <div className='youtube-url-group'>
                    {values.urls.map((_, index) => (
                      <div key={index} className='youtube-input-wrapper'>
                        <label className='youtube-input-label'>YouTube URL</label>
                        <div className='youtube-input-container'>
                          <Field name={`urls[${index}]`} className='youtube-input' />
                        </div>
                      </div>
                    ))}

                    {values.urls.length < MAX_URLS && (
                      <button type='button' className='add-more-btn' onClick={() => push('')}>
                        + Add more
                      </button>
                    )}
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Actions */}
            <div className='form-actions'>
              <button
                type='button'
                className='cancel-btn'
                onClick={() => navigate.push('/biography')}
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

export default BiographyForm
