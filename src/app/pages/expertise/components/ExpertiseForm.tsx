import {FC, useState} from 'react'
import {Formik, Form, Field, FieldArray} from 'formik'
import * as Yup from 'yup'
import {ExpertiseModel} from '../models/ExpertiseModel'
import {updateUserExpertise} from '../../../services/expertiseService'

const ExpertiseForm: FC = () => {
  const [loading, setLoading] = useState(false)
  const initialValues: ExpertiseModel = {
    expertise: [{area: '', description: '', pricing: {currency: '', amount: 0, unit: 'Project'}}],
  }

  const validationSchema = Yup.object().shape({
    expertise: Yup.array().of(
      Yup.object().shape({
        area: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        pricing: Yup.object().shape({
          currency: Yup.string().required('Required'),
          amount: Yup.number().min(0, 'Must be positive').required('Required'),
          unit: Yup.string().required('Required'),
        }),
        unit: Yup.string().required('Required'),
      })
    ),
  })

  const handleSubmit = async (values: ExpertiseModel) => {
    console.log('Form values:', values)
    setLoading(true)
    await updateUserExpertise(values)
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  return (
    <div className='expertise-form'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({values}) => (
          <Form className='expertise-form__container'>
            <h2 className='expertise-form__title'>Edit Your Expertise</h2>

            <div className='expertise-form__section'>
              <h3 className='expertise-form__section-title'>Share my expertise</h3>
              <p className='expertise-form__section-subtitle'>
                Please describe your area of expertise, include a concise description, and specify
                your pricing.
              </p>

              <FieldArray name='expertises'>
                {({push}) => (
                  <div className='expertise-form__group'>
                    {values.expertise.map((_, index) => (
                      <div key={index} className='expertise-form__item'>
                        <label className='expertise-form__label'>Specify area of expertise</label>
                        <Field
                          type='text'
                          name={`expertise.${index}.area`}
                          placeholder='e.g. Software Architecture'
                          className='expertise-form__input'
                        />

                        <label className='expertise-form__label'>Description</label>
                        <Field
                          as='textarea'
                          name={`expertises.${index}.description`}
                          placeholder='Describe your expertise...'
                          className='expertise-form__input'
                        />

                        <label className='expertise-form__label'>Pricing</label>
                        <div className='expertise-form__pricing'>
                          <span className='expertise-form__currency'>USD $</span>
                          <Field
                            type='number'
                            name={`expertises.${index}.price`}
                            placeholder='0'
                            className='expertise-form__input expertise-form__input--price'
                          />
                          <Field
                            as='select'
                            name={`expertises.${index}.unit`}
                            className='expertise-form__select'
                          >
                            <option value='Project'>/ Project</option>
                            <option value='Hour'>/ Hour</option>
                            <option value='Day'>/ Day</option>
                          </Field>
                        </div>
                      </div>
                    ))}

                    <button
                      type='button'
                      className='expertise-form__add-btn'
                      onClick={() => push({area: '', description: '', price: 0, unit: 'Project'})}
                    >
                      + Add additional expertise
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Botones */}
            <div className='expertise-form__actions'>
              <button type='button' className='expertise-form__btn expertise-form__btn--secondary'>
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

export default ExpertiseForm
