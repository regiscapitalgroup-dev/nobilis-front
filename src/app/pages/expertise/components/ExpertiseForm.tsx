import {FC, useState, useRef, useEffect} from 'react'
import {Formik, Form, Field, FieldArray, FormikProps, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {ExpertiseModel} from '../models/ExpertiseModel'
import {updateUserExpertise} from '../../../services/expertiseService'
import {useHistory} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import {useRateExpertiseField} from '../../../hooks/components/useRateExpertiseField'
import {useUserProfileContext} from '../../../context/UserProfileContext'
import {useAlert} from '../../../hooks/utils/useAlert'

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
        <span className='custom-select__value'>{selectedOption?.label || value}</span>
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

interface CurrencyInputProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

const CurrencyInput: FC<CurrencyInputProps> = ({value, onChange, className}) => {
  const [displayValue, setDisplayValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (!isFocused) {
      if (value && value > 0) {
        setDisplayValue(formatCurrency(value))
      } else {
        setDisplayValue('')
      }
    }
  }, [value, isFocused])

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    const cleanValue = input.replace(/[^\d.,]/g, '')

    const withoutCommas = cleanValue.replace(/,/g, '')

    const parts = withoutCommas.split('.')
    let sanitized = withoutCommas

    if (parts.length > 2) {
      sanitized = parts[0] + '.' + parts.slice(1).join('')
    } else if (parts.length === 2 && parts[1].length > 2) {
      sanitized = parts[0] + '.' + parts[1].substring(0, 2)
    }

    setDisplayValue(sanitized)

    const numericValue = parseFloat(sanitized) || 0
    onChange(numericValue)
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (value && value > 0) {
      setDisplayValue(formatCurrency(value))
    } else {
      setDisplayValue('')
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    if (value && value > 0) {
      setDisplayValue(value.toString())
    } else {
      setDisplayValue('')
    }
    e.target.select()
  }

  return (
    <input
      type='text'
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      placeholder='0.00'
      className={className}
      inputMode='decimal'
    />
  )
}

const ExpertiseForm: FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useHistory()
  const {refetch, searchParams, data} = useUserProfileContext()
  const {showError} = useAlert()

  const {collection} = useRateExpertiseField()
  const rateOptions = collection.map((rate) => ({
    value: rate.toLowerCase(),
    label: rate,
  }))

  const formatTitle = (title: string): string => {
    return title
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const initialValues: ExpertiseModel = {
    expertise:
      data?.expertise && data.expertise.length > 0
        ? data.expertise.map((exp: any) => ({
            area: formatTitle(exp.title) || '',
            description: exp.content || '',
            pricing: {
              currency: 'USD',
              amount: parseFloat(exp.pricing) || 0,
              unit: exp.rate?.toLowerCase() || rateOptions[0]?.value,
            },
          }))
        : [
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
        area: Yup.string().required('This field is required'),
        description: Yup.string().required('This field is required'),
        pricing: Yup.object().shape({
          currency: Yup.string().required('This field is required'),
          amount: Yup.number().min(0, 'Must be positive').required('This field is required'),
          unit: Yup.string().required('This field is required'),
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
      await updateUserExpertise(
        adaptedPayload,
        !!searchParams.userSelected ? searchParams.userSelected : ''
      )
      await refetch()
      // navigate.push('/biography')
    } catch (error: any) {
      console.error('Error :', error)

      const statusCode = error?.response?.status || 500
      showError({
        title: 'Unable to update expertise',
        message: "We couldn't save your changes. Please review your information and try again.",
        errorCode: `EXPERTISE_${statusCode}`,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='expertise-form'>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({values, setFieldValue}: FormikProps<ExpertiseModel>) => (
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
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block input-text-style fs-8'>
                              <ErrorMessage name={`expertise.${index}.area`} />
                            </div>
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
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block input-text-style fs-8'>
                              <ErrorMessage name={`expertise.${index}.description`} />
                            </div>
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className='expertise-form__field'>
                          <label className='expertise-form__label'>Pricing</label>
                          <div className='expertise-form__pricing'>
                            <div className='expertise-form__pricing-left'>
                              <span className='expertise-form__currency'>USD $</span>
                              <CurrencyInput
                                value={item.pricing.amount}
                                onChange={(value) =>
                                  setFieldValue(`expertise.${index}.pricing.amount`, value)
                                }
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

            <div className='expertise-form__actions'>
              <button
                type='button'
                className='expertise-form__btn expertise-form__btn--secondary'
                onClick={() => {
                  if (searchParams.userSelected) {
                    navigate.push(`/profile-member`)
                  } else {
                    navigate.push('/biography')
                  }
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

export default ExpertiseForm
