import {FC, useEffect, useRef, useState} from 'react'
import {Step1} from './steps/Step1'
import {Step2} from './steps/Step2'
import {Step3} from './steps/Step3'
import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {Formik, Form, FormikValues, useFormikContext} from 'formik'
import {createAccountSchemas, ICreateAccount, inits} from './CreateAccountWizardHelper'
import {register} from '../redux/AuthCRUD'
import Swal from 'sweetalert2'
import {KTSVG} from '../../../../_metronic/helpers'

const FormObserver: FC<{
  setFormValues: (values: ICreateAccount) => void
}> = ({setFormValues}) => {
  const formik = useFormikContext()

  useEffect(() => {
    setFormValues(formik.values as ICreateAccount)
  }, [formik, formik.values, setFormValues])

  return null
}

const RegitrationWizard: FC = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const formikRef = useRef<any>(null)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [initValues] = useState<ICreateAccount>(inits)
  const [isSubmitButton, setSubmitButton] = useState(false)
  const [currentFormValues, setCurrentFormValues] = useState<ICreateAccount>(inits)
  const [loading, setLoading] = useState(false)
  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totatStepsNumber! - 1)

    stepper.current.goPrev()

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
  }

  const submitStep = (values: ICreateAccount, actions: FormikValues) => {
    if (!stepper.current) {
      return
    }

    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totatStepsNumber! - 1)

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex])

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      stepper.current.goNext()
    } else {
      stepper.current.goto(1)
      actions.resetForm()
    }
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  const handleSubmit = async (event: any) => {
    event?.preventDefault()

    if (formikRef.current?.isValid) {
      try {
        setLoading(true)
        await register(currentFormValues)
        setLoading(false)

        Swal.fire({
          theme: 'dark',
          width: '600px',
          title: `
      <div>Thank you! We have successfully received the application.</div>
      `,
          html: `
      <div class="mb-5 text-gray-400">
      The review process will take up to 14 days. A Nobilis representative will reach out directly regarding the application status. Thank you for your interest in the Nobilis community.</div>

      <div class="text-white">The Nobilis Team</div>
      `,
          icon: 'success',
          iconColor: '#808b96',
          showConfirmButton: false,
          timer:5000,
          allowOutsideClick: false,
        }).then(() => {
          if (stepper.current) {
            formikRef.current.resetForm()
            setSubmitButton(false)
            window.location.reload()
          }
        })
      } catch (error) {
        setLoading(false)
        console.error('Error al registrar:', error)
        Swal.fire({
          theme: 'dark',
          title: `
                  <div className="fs-9">An error has occurred.</div>
                  `,
          icon: 'error',
          showConfirmButton: false,
          timer: 1000,
          allowOutsideClick: false,
        })
      }
    }
  }

  return (
    <div className='card bg-dark'>
      <div className='card-body d-flex flex-center flex-column flex-column-fluid'>
        <div
          ref={stepperRef}
          className='stepper stepper-links d-flex flex-column'
          id='kt_create_account_stepper'
        >
          <div className='stepper-nav mb-5 w-lg-500px'>
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              <h3 className='text-muted fs-5 visually-hidden'>Step 1</h3>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='text-muted fs-5 visually-hidden'>Step 2</h3>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='text-muted fs-5 visually-hidden'>Step 3</h3>
            </div>
          </div>

          <Formik
            innerRef={formikRef}
            validationSchema={currentSchema}
            initialValues={initValues}
            onSubmit={submitStep}
          >
            {() => (
              <Form className='mx-auto mw-600px w-100 mt-5  pb-5' id='kt_create_account_form'>
                <FormObserver setFormValues={setCurrentFormValues} />

                <div className='current' data-kt-stepper-element='content'>
                  <Step1 goNext={() => stepper.current?.goNext()} />
                </div>

                <div data-kt-stepper-element='content'>
                  <Step2 />
                </div>

                <div data-kt-stepper-element='content'>
                  <Step3 />
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
                        type='submit'
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
      </div>
    </div>
  )
}

export {RegitrationWizard}
