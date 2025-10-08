import {FC, useState} from 'react'
import {Formik, Form, Field} from 'formik'
import {PaymentExpertModel} from '../models/PaymentExpertModel'
import IntroductionAutocompleteField from './IntroductionAutocompleteField'

const initialValues: PaymentExpertModel & {introductionCost?: string} = {
  typeOfIntroduction: '',
  topic: '',
  message: '',
  agreement: false,
  introductionCost: '',
}

const PaymentExpertForm: FC = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (values: PaymentExpertModel & {introductionCost?: string}) => {
    console.log('Submitting form data:', values)
    setSubmitted(true) 
  }

  return (
    <div className='paym-exp__layout'>
      <main className='paym-exp__container'>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({handleSubmit, values}) => (
            <>
              {/* FORM LEFT */}
              <Form className='paym-exp__form'>
                <div className='paym-exp__intro-label'>Member Introduction</div>
                <div className='paym-exp__intro-title'>Contact John Caudwell</div>
                <div className='paym-exp__intro-desc'>
                  To ensure member security, your request will undergo Nobilis’ vetting process. If
                  approved, it will be forwarded to the member. Should the introduction be declined
                  or remain unanswered, your payment will be refunded, less the platform fee.
                </div>

                <div className='paym-exp__group'>
                  <label className='paym-exp__label'>Type of introduction</label>
                  <IntroductionAutocompleteField name='introductionId' />
                </div>

                <div className='paym-exp__group'>
                  <label htmlFor='topic' className='paym-exp__label'>
                    Topic
                  </label>
                  <Field
                    type='text'
                    name='topic'
                    placeholder='e.g. "Family office strategy", "Dialogue on investment & innovation"'
                    className='paym-exp__input'
                  />
                </div>

                <div className='paym-exp__group'>
                  <label htmlFor='message' className='paym-exp__label'>
                    Message
                  </label>
                  <Field
                    as='textarea'
                    name='message'
                    placeholder='Please write a message to the member explaining why you wish to connect and your preferred timing.'
                    className='paym-exp__textarea'
                  />
                </div>
              </Form>

              {/* FEES BOX RIGHT (MISMA CARD, SOLO CAMBIA EL CONTENIDO) */}
              <aside className='paym-exp__right'>
                {!submitted ? (
                  <>
                    <div className='paym-exp__fees'>
                      <div className='paym-exp__fee-row'>
                        <span>Introduction fee</span>
                        <span>
                          {values.introductionCost ? `$${values.introductionCost}` : '$0.00'}
                        </span>
                      </div>
                      <div className='paym-exp__fee-row'>
                        <span>Platform fee</span>
                        <span>$4.00</span>
                      </div>
                      <div className='paym-exp__fee-row total'>
                        <span>Total Fee</span>
                        <span>
                          {values.introductionCost
                            ? `$${(parseFloat(values.introductionCost) + 4).toFixed(2)}`
                            : '$4.00'}
                        </span>
                      </div>
                    </div>

                    <div className='paym-exp__note'>
                      If the request is rejected, request fee will be refunded lorem ipsum sit amet
                      dolor
                    </div>

                    <div className='paym-exp__checkbox'>
                      <Field type='checkbox' name='agreement' id='agreement' />
                      <label htmlFor='agreement' className='paym-exp__checkbox-label'>
                        I agree to adhere to the platform’s code of conduct and privacy guidelines.
                      </label>
                    </div>

                    <button
                      type='submit'
                      className='custom-submit-btn'
                      onClick={() => handleSubmit()}
                    >
                      <span className='custom-btn-text'>SUBMIT AND PAY</span>
                      <img
                        src='/media/svg/nobilis/vector1.svg'
                        alt=''
                        className='custom-btn-icon'
                      />
                    </button>
                  </>
                ) : (
                  <>
                    <div className='complimentary-title'>2 complimentary introductions left</div>
                    <div className='complimentary-body'>
                      <button type='button' className='custom-intro-btn'>
                        <span className='custom-btn-text'>Request introduction</span>
                        <img
                          src='/media/svg/nobilis/vector1.svg'
                          alt=''
                          className='custom-btn-icon'
                        />
                      </button>
                      <div className='complimentary-desc'>
                        You may use one of your complimentary introductions to initiate this
                        connection.
                      </div>
                    </div>
                  </>
                )}
              </aside>
            </>
          )}
        </Formik>
      </main>
    </div>
  )
}

export {PaymentExpertForm}
