import {FC, useEffect, useRef, useState} from 'react'
import {Step1} from './steps/Step1'
import {Step2} from './steps/Step2'
import {Step3} from './steps/Step3'
import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {Formik, Form, FormikValues, useFormikContext} from 'formik'
import {createAccountSchemas, ICreateAccount, inits} from './CreateAccountWizardHelper'
import {register} from '../redux/AuthCRUD'
import Swal from 'sweetalert2'

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
          title: `
                  <div className="fs-9">Thank you! We’ve got you submission!.</div>
                  `,
          html: `
                  <div className="fs-8">Dedicated Nobilis person will contact you as soon as possible via email or phoe.</div>
                  `,
          icon: 'success',
          iconColor: '#808b96',
          showConfirmButton: false,
          timer: 1500,
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
            <div className='stepper-item current ' data-kt-stepper-element='nav'>
              <h3 className='text-muted'>Step 1</h3>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='text-muted'>Step 2</h3>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='text-muted'>Step 3</h3>
            </div>
          </div>

          <Formik
            innerRef={formikRef}
            validationSchema={currentSchema}
            initialValues={initValues}
            onSubmit={submitStep}
          >
            {() => (
              <Form className='mx-auto mw-600px w-100 mt-10  pb-10' id='kt_create_account_form'>
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
                  <div className='text-center pt-15'>
                    <div>
                      <button
                        type='submit'
                        className='btn btn-lg btn-light border bg-dark me-3'
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
