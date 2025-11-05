import {FC, useState, useRef, useEffect} from 'react'
import {Formik, Form, Field, FieldArray, FormikProps} from 'formik'
import * as Yup from 'yup'
import {ExpertiseModel} from '../models/ExpertiseModel'
import {updateUserExpertise} from '../../../services/expertiseService'
import {useHistory} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import {useRateExpertiseField} from '../../../hooks/components/useRateExpertiseField'
import { useUserProfileContext } from '../../../context/UserProfileContext'

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: {value: string; label: string}[]
}

const CustomSelect: FC<CustomSelectProps> = ({value, onChange, options}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className='custom-select' ref={dropdownRef}>
      <div className='custom-select__trigger' onClick={() => setIsOpen(!isOpen)}>
        <span className='custom-select__value'>/ {selectedOption?.label || value}</span>
        <div className='custom-select__icon'>
          <KTSVG path='/media/svg/nobilis/arrow_up.svg' className='svg-icon-2' />
        </div>
      </div>

      {isOpen && (
        <div className='custom-select__dropdown'>
          {options.map((option) => (
            <div
              key={option.value}
              className='custom-select__option'
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const ExpertiseForm: FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useHistory()
  const {refetch} = useUserProfileContext()

  const {collection} = useRateExpertiseField()
  const rateOptions = collection.map((rate) => ({
    value: rate.toLowerCase(),
    label: rate,
  }))

  const initialValues: ExpertiseModel = {
    expertise: [
      {
        area: '',
        description: '',
        pricing: {
          currency: 'USD',
          amount: 0,
          unit: rateOptions[0]?.value,
        },
      },
    ],
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
      })
    ),
  })

  const handleSubmit = async (values: ExpertiseModel) => {
    const adaptedPayload = {
      expertise: values.expertise.map((item) => ({
        title: item.area.trim().replace(/\s+/g, '_').toLowerCase(),
        content: item.description,
        pricing: item.pricing.amount,
        rate: item.pricing.unit.toLowerCase(),
      })),
    }

    try {
      setLoading(true)
      await updateUserExpertise(adaptedPayload)
      setLoading(false)
      await refetch()
      navigate.push('/biography')
    } catch (error) {
      console.error('Error :', error)
      setLoading(false)
    }
  }

  return (
    <div className='expertise-form'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({values}: FormikProps<ExpertiseModel>) => (
          <Form className='expertise-form__container'>
            <h2 className='expertise-form__title'>Edit Your Expertise</h2>

            <div className='expertise-form__section'>
              <div className='expertise-form__section-header'>
                <h3 className='expertise-form__section-title'>Share my expertise</h3>
                <p className='expertise-form__section-subtitle'>
                  Please describe your area of expertise, include a concise description, and specify
                  your pricing.
                </p>
              </div>

              <FieldArray name='expertise'>
                {({push}) => (
                  <div className='expertise-form__group'>
                    {values.expertise.map((item, index) => (
                      <div key={index} className='expertise-form__item'>
                        {/* Area of expertise */}
                        <div className='expertise-form__field'>
                          <label className='expertise-form__label'>Specify area of expertise</label>
                          <div className='expertise-form__input-wrapper'>
                            <Field
                              type='text'
                              name={`expertise.${index}.area`}
                              className='expertise-form__input'
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div className='expertise-form__field'>
                          <label className='expertise-form__label'>Description</label>
                          <div className='expertise-form__input-wrapper'>
                            <Field
                              type='text'
                              name={`expertise.${index}.description`}
                              className='expertise-form__input'
                            />
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className='expertise-form__field'>
                          <label className='expertise-form__label'>Pricing</label>
                          <div className='expertise-form__pricing'>
                            <div className='expertise-form__pricing-left'>
                              <span className='expertise-form__currency'>USD $</span>
                              <Field
                                type='number'
                                name={`expertise.${index}.pricing.amount`}
                                placeholder='0'
                                className='expertise-form__price-input'
                              />
                            </div>

                            <div className='expertise-form__pricing-right'>
                              <Field name={`expertise.${index}.pricing.unit`}>
                                {({field, form}: {field: {value: string}; form: any}) => (
                                  <CustomSelect
                                    value={field.value}
                                    onChange={(value) =>
                                      form.setFieldValue(`expertise.${index}.pricing.unit`, value)
                                    }
                                    options={rateOptions}
                                  />
                                )}
                              </Field>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type='button'
                      className='expertise-form__add-btn'
                      onClick={() =>
                        push({
                          area: '',
                          description: '',
                          pricing: {
                            currency: 'USD',
                            amount: 0,
                            unit: rateOptions[0]?.value || '',
                          },
                        })
                      }
                    >
                      + Add additional expertise
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Botones */}
            <div className='expertise-form__actions'>
              <button
                type='button'
                className='expertise-form__btn expertise-form__btn--secondary'
                onClick={() => navigate.push('/biography')}
              >
                Cancel
              </button>

              <button
                type='submit'
                className='btn nb-btn-primary'
                disabled={loading}
                aria-busy={loading}
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

export default ExpertiseForm
