import {FC, useEffect, useRef, useState} from 'react'
import {Step1} from './steps/Step1'
import {Step2} from './steps/Step2'
import {Step3} from './steps/Step3'
import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {Formik, Form, FormikValues, useFormikContext} from 'formik'
import {createAccountSchemas, ICreateAccount, inits} from './CreateAccountWizardHelper'
import {register} from '../redux/AuthCRUD'
import {KTSVG} from '../../../../_metronic/helpers'
import {useHistory} from 'react-router-dom'
import {Step4} from './steps/Step4'

type WizardProps = {
  onStepChange?: (current: number, total: number) => void
}

const FormObserver: FC<{setFormValues: (values: ICreateAccount) => void}> = ({setFormValues}) => {
  const formik = useFormikContext()
  useEffect(() => {
    setFormValues(formik.values as ICreateAccount)
  }, [formik, formik.values, setFormValues])
  return null
}

const RegitrationWizard: FC<WizardProps> = ({onStepChange}) => {
  const emitStep = (s: number, t: number) => {
    window.dispatchEvent(new CustomEvent('nb:stepper', {detail: {step: s, total: t}}))
  }
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const formikRef = useRef<any>(null)

  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [initValues] = useState<ICreateAccount>(inits)
  const [isSubmitButton, setSubmitButton] = useState(false)
  const [currentFormValues, setCurrentFormValues] = useState<ICreateAccount>(inits)
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [totalSteps, setTotalSteps] = useState<number>(3)

  const navigate = useHistory()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
    if (stepper.current) {
      setTotalSteps(stepper.current.totatStepsNumber ?? 3)
      setCurrentStep(stepper.current.currentStepIndex)
    }
  }

  const prevStep = () => {
    if (!stepper.current) return
    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totatStepsNumber!)
    stepper.current.goPrev()
    setCurrentStep(stepper.current.currentStepIndex)
    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
    emitStep(stepper.current.currentStepIndex, stepper.current.totatStepsNumber ?? 3)

    scrollToTop()
  }

  const submitStep = (values: ICreateAccount, actions: FormikValues) => {
    if (!stepper.current) return
    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totatStepsNumber!)
    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex])

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      stepper.current.goNext()
      setCurrentStep(stepper.current.currentStepIndex)
      emitStep(stepper.current.currentStepIndex, stepper.current.totatStepsNumber ?? 3)
      scrollToTop()
    } else {
      stepper.current.goto(1)
      actions.resetForm()
      emitStep(1, stepper.current.totatStepsNumber ?? 3)
      scrollToTop()
    }
  }

  useEffect(() => {
    if (!stepperRef.current) return
    loadStepper()
  }, [stepperRef])

  useEffect(() => {
    if (!stepper.current) return
    const s = stepper.current
    setTotalSteps(s.totatStepsNumber ?? 3)
    setCurrentStep(s.currentStepIndex)

    const onChanged = () => {
      setCurrentStep(s.currentStepIndex)
      setTotalSteps(s.totatStepsNumber ?? 3)
      emitStep(s.currentStepIndex, s.totatStepsNumber ?? 3)
    }
    s.on('kt.stepper.changed', onChanged)
    return () => {
      try {
        ;(s as any).off?.('kt.stepper.changed', onChanged)
      } catch {}
    }
  }, [stepperRef])

  const doRegister = async () => {
    try {
      setLoading(true)
      await register(currentFormValues)
      setLoading(false)

      if (stepper.current) {
        formikRef.current.resetForm()
        setSubmitButton(false)

        navigate.replace('/auth/message', {
          title: 'Thank you. We have received\n your application',
          body: 'Our review process may take up to 30 days. Please note that we may request additional documentation to support your eligibility, if needed.',
          ctaText: 'LOGIN',
          ctaTo: '/auth/login',
          showBtn: false,
        })
      }
    } catch (error) {
      setLoading(false)
      console.error('Error al registrar:', error)
    }
  }

  const handleSubmit = async (event?: any) => {
    event?.preventDefault()
    await formikRef.current?.validateForm()
    if (!formikRef.current?.isValid) return
    await doRegister()
  }

  const nextOrSubmit = async () => {
    if (!stepper.current) return
    const idx = stepper.current.currentStepIndex
    const tot = stepper.current.totatStepsNumber ?? 3

    await formikRef.current?.validateForm()
    if (!formikRef.current?.isValid) return

    if (idx < tot) {
      stepper.current.goNext()
      setCurrentStep(stepper.current.currentStepIndex)
      scrollToTop()
    } else {
      await doRegister()
    }
  }

  return (
    <div ref={stepperRef} className='stepper d-flex flex-column' id='kt_create_account_stepper'>
      <div className='stepper-nav'>
        <div className='stepper-item current' data-kt-stepper-element='nav'>
          <h3 className='text-muted fs-5 visually-hidden'>Step 1</h3>
        </div>
        <div className='stepper-item' data-kt-stepper-element='nav'>
          <h3 className='text-muted fs-5 visually-hidden'>Step 2</h3>
        </div>
        <div className='stepper-item' data-kt-stepper-element='nav'>
          <h3 className='text-muted fs-5 visually-hidden'>Step 3</h3>
        </div>
        <div className='stepper-item' data-kt-stepper-element='nav'>
          <h3 className='text-muted fs-5 visually-hidden'>Step 4</h3>
        </div>
      </div>

      <Formik
        innerRef={formikRef}
        validationSchema={currentSchema}
        initialValues={initValues}
        onSubmit={submitStep}
      >
        {() => (
          <Form
            className='mx-auto w-100 mt-5 pb-5'
            id='kt_create_account_form'
            autoComplete='off'
            noValidate
          >
            <FormObserver setFormValues={setCurrentFormValues} />

            <div className='current' data-kt-stepper-element='content'>
              <Step1 goNext={() => stepper.current?.goNext()} />
            </div>

            <div data-kt-stepper-element='content'>
              <Step2 goPrev={() => stepper.current?.goPrev()} goNext={nextOrSubmit} />
            </div>

            <div data-kt-stepper-element='content'>
              <Step3
                goPrev={() => stepper.current?.goPrev()}
                goNext={nextOrSubmit}
                loading={loading}
              />
            </div>

            <div data-kt-stepper-element='content'>
              <Step4
                goPrev={() => stepper.current?.goPrev()}
                goNext={nextOrSubmit}
                loading={loading}
              />
            </div>

            {isSubmitButton && (
              <div className='d-flex flex-stack pt-15'>
                <div className='mr-2'>
                  <button
                    onClick={prevStep}
                    type='button'
                    className='btn btn-lg btn-light bg-dark me-3'
                    data-kt-stepper-action='previous'
                  >
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr063.svg'
                      className='svg-icon-4 me-1'
                    />
                    Back
                  </button>
                </div>

                <div>
                  <button
                    type='button'
                    className='btn btn-lg btn-light me-3'
                    onClick={handleSubmit}
                  >
                    {!loading && <span className='indicator-label'>Submit</span>}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export {RegitrationWizard}
