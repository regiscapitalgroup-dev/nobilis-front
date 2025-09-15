import {FC} from 'react'
import {Formik, Form, Field} from 'formik'
import {PaymentExpertModel} from '../models/PaymentExpertModel'
import {Link} from 'react-router-dom'

const initialValues: PaymentExpertModel = {
  typeOfIntroduction: '',
  topic: '',
  message: '',
  agreement: false,
}

const PaymentExpertForm: FC = () => {
  const handleSubmit = (values: PaymentExpertModel) => {
    console.log('Submitting form data:', values)
  }

  return (
    <div className='paym-exp__layout'>
      <main className='paym-exp__container'>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({handleSubmit}) => (
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
                  <label htmlFor='typeOfIntroduction' className='paym-exp__label'>
                    Type of introduction
                  </label>
                  <Field as='select' name='typeOfIntroduction' className='paym-exp__input'>
                    <option value=''>Select the type of introduction from the dropdown</option>
                    <option value='business'>Business</option>
                    <option value='investment'>Investment</option>
                    <option value='personal'>Personal</option>
                  </Field>
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

              {/* FEES BOX RIGHT */}
              <aside className='paym-exp__right'>
                <div className='paym-exp__fees'>
                  <div className='paym-exp__fee-row'>
                    <span>Introduction fee</span>
                    <span>$8</span>
                  </div>
                  <div className='paym-exp__fee-row'>
                    <span>Platform fee</span>
                    <span>$4</span>
                  </div>
                  <div className='paym-exp__fee-row total'>
                    <span>Total Fee</span>
                    <span>$12</span>
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

                <button type='submit' className='paym-exp__btn' onClick={() => handleSubmit()}>
                  <span className='nb-heading-md'>SUBMIT AND PAY</span>
                  <img
                    src='/media/svg/nobilis/vector1.svg'
                    alt=''
                    className='nb-btn-icon nb-btn-icon--black'
                  />
                </button>
              </aside>
            </>
          )}
        </Formik>
      </main>
    </div>
  )
}

export {PaymentExpertForm}
