import React, {useEffect, useState, useRef} from 'react'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import {MembershipSelectedDetailWidget} from './MembershipSelectedDetailWidget'
import {membershipPaymentSchemas, inits} from './MembershipPaymentHelper'
import {useSubscription} from '../../../hooks/subscription/useSubscription '
import {MembershipDetailModel} from '../models/MembershipModel'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'

type Props = {
  membership?: MembershipDetailModel | null | undefined
  handleCancelSelected: () => void
}

const MembershipPaymentWidget: React.FC<Props> = ({membership, handleCancelSelected}) => {
  const {subscribe} = useSubscription()
  const stripe = useStripe()
  const elements = useElements()
  const [errorStripe, setErrorStripe] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const scrollTopRef = useRef<HTMLDivElement>(null)

  const cardElementOptions = {
    style: {
      base: {
        color: '#ffffff',
        fontSize: '14px',
        '::placeholder': {
          color: '#b5b5c3',
        },
      },
      invalid: {
        color: '#ff6b6b',
      },
    },
    hidePostalCode: true,
    placeholders: {
      cardNumber: 'CARD NUMBER',
      expiry: 'MM/AA',
      cvc: 'CVC',
    },
  }

  const successAlert = () => {
    return Swal.fire({
      theme: 'dark',
      width: '600px',
      title: `
          <div class="fs-4">Titas, thank you for becoming a part of Nobilis!.</div>
          `,
      html: `
          <div class="fs-6 mb-10">To ensure your exclusive spot and full platform access after launch, please complete your member profile and upload your experiences by June 30, 2025..</div>
          <div class="text-center fs-6 fw-bold mb-3">
            Contact Information
          </div>
          <div class="row mb-10  p-8 ">
          <div class="text-center fs-6 fw-bold mb-3">
            Vilma Bareikaite
          </div>
          <div class="col ">                  
            <span class="fs-8 text-start ">vilma@joinnobilis.com</span>
          </div>
          <div class="col">                 
            <span class="fs-8 text-center">+(1)32166222</span>
          </div>
          <div class="col">
           <span class="fs-8 text-start">Or use chatbox anytime</span> 
          </div>
          </div>

          <div class="fs-6">For immediate assistance, contact your dedicated Nobilis representative.</div>
          `,
      icon: 'success',
      iconColor: '#808b96',
      showConfirmButton: true,
      confirmButtonColor: '#808b96',
      confirmButtonText: 'GO TO DASHBOARD',
      allowOutsideClick: false,
    })
  }

  useEffect(() => {
    if (membership) {
      formik.setFieldValue('membershipId', membership.id)
      scrollTopRef.current?.scrollTo({behavior: 'smooth', top: 0})
    }
  }, [membership])

  const formik = useFormik({
    initialValues: inits,
    validationSchema: membershipPaymentSchemas[0],
    onSubmit: async (values) => {
      setLoading(true)
      try {
        if (!membership?.stripePlanId) {
          Swal.fire({
            theme: 'dark',
            title: `<div class="fs-9">It is necessary to select a membership.</div>`,
            icon: 'error',
            showConfirmButton: false,
            timer: 1000,
            allowOutsideClick: false,
          })
          return
        }

        if (!stripe || !elements) throw new Error('Stripe.js has not loaded yet.')

        const cardElement = elements.getElement(CardElement)
        if (!cardElement) throw new Error('CardElement is not available.')

        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: values.cardHoldName,
          },
        })

        if (error) {
          console.error('[Stripe Error]', error)
          setErrorStripe(error.message || 'An error occurred')
          return
        }

        await subscribe({
          ...values,
          paymentMethodId: paymentMethod?.id ?? '',
          price_id: membership.stripePlanId,
        })

        await successAlert()
        window.location.reload()
      } catch (err: any) {
        console.error('[Submit Error]', err)
        setErrorStripe(err.message || 'An unexpected error occurred')
        Swal.fire({
          theme: 'dark',
          title: `<div class="fs-9">${err.message || 'Something went wrong.'}</div>`,
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'OK',
          allowOutsideClick: false,
        })
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <>
      <div className='col-xl-8' ref={scrollTopRef}>
        <form className='form w-100' onSubmit={formik.handleSubmit} noValidate>
          <div className='card bg-dark w-100 pt-10 pb-10'>
            <div className='card-body'>
              <div className='w-100'>
                <div className='pb-10 pb-lg-15 text-center'>
                  <h2 className='fw-bolder text-white'>Payment</h2>

                  <div className='text-gray-400 fw-bold fs-6'>
                    By paying the initiation fee you will be granted the pre-launch access to
                    Nobilis platform .
                  </div>
                </div>

                <div className='d-flex flex-column mb-5 fv-row'>
                  <label className='d-flex align-items-center fs-6 fw-bold form-label mb-2 text-gray-400 '>
                    <span className='required'>CARD HOLD NAME</span>
                  </label>

                  <input
                    {...formik.getFieldProps('cardHoldName')}
                    type='text'
                    className='form-control form-control-solid bg-dark text-white'
                    placeholder='Enter card hold name'
                    name='cardHoldName'
                  />
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block text-white fs-8'>
                      {formik.touched.cardHoldName && formik.errors.cardHoldName && (
                        <div className='text-white mt-2'>{formik.errors.cardHoldName}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='d-flex flex-column mb-5 fv-row'>
                  <label className='d-flex align-items-center fs-6 fw-bold form-label mb-2 text-gray-400 '>
                    <span className='required'>CARD NUMBER</span>
                  </label>

                  <div className='form-control form-control-solid bg-dark text-white'>
                    <CardElement
                      options={cardElementOptions}
                      onChange={() => {
                        if (errorStripe) {
                          setErrorStripe('')
                        }
                      }}
                    />
                  </div>
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block text-white fs-8'>
                      {errorStripe && <div className='text-white mt-2'>{errorStripe}</div>}
                    </div>
                  </div>
                </div>

                <div className='d-flex flex-stack mb-10'>
                  <label className='form-check  form-check-custom form-check-solid'>
                    <input
                      {...formik.getFieldProps('invoice')}
                      className='form-check-input'
                      type='checkbox'
                      value='1'
                      name='invoice'
                    />
                    <span className='form-check-label fw-bold text-gray-400'>
                      Invoice will be needed
                    </span>
                  </label>
                </div>
                <div className='mt-auto text-center'>
                  <div>
                    <button
                      type='submit'
                      className={`${'btn-secondary'} btn  text-dark btn-lg btn-block w-50 mb-3 `}
                      style={{borderRadius: '25px'}}
                    >
                      {!loading && <span className='indicator-label'>CONFIRM AND PAY</span>}
                      {loading && (
                        <span className='indicator-progress' style={{display: 'block'}}>
                          Please wait...{' '}
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>
                  </div>
                  <button
                    className={`btn btn-bg-dark border text-white btn-lg btn-block w-50 `}
                    onClick={handleCancelSelected}
                    style={{borderRadius: '25px'}}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className='col-xl-4'>
        <MembershipSelectedDetailWidget detail={membership} />
      </div>
    </>
  )
}

export {MembershipPaymentWidget}
