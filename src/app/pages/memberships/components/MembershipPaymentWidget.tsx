import React, {useEffect, useMemo, useRef, useState} from 'react'
import {useFormik, FormikProvider} from 'formik'
import {inits, IMembershipPayment} from './MembershipPaymentHelper'
import {MembershipDetailModel} from '../models/MembershipModel'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import {useHistory, useLocation} from 'react-router-dom'
import {formatCurrencyUSD} from '../../../helpers/FormatCurrency'
import {useSubscription} from '../../../hooks/subscription/useSubscription '
import CountriesAutocompleteField from './fields/CountryAutocompleteField'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import { useDispatch } from 'react-redux'
import { actions } from '../../../modules/auth/redux/AuthRedux'
type Props = {
  membership?: MembershipDetailModel | null | undefined
  handleCancelSelected: () => void
}

const MembershipPaymentWidget: React.FC<Props> = ({membership, handleCancelSelected}) => {
  const {subscribe} = useSubscription()
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState<boolean>(false)
  const [showManualAddress, setShowManualAddress] = useState<boolean>(false)

  const scrollTopRef = useRef<HTMLDivElement>(null)
  const navigate = useHistory()
  const location = useLocation<{membership: MembershipDetailModel; formData?: IMembershipPayment}>()
  const savedFormData = location.state?.formData

  useEffect(() => {
    scrollTopRef.current?.scrollTo({behavior: 'smooth', top: 0})
  }, [membership])

  const cardStyles = useMemo(
    () => ({
      style: {
        base: {
          fontFamily:
            "'Satoshi', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: '12px',
          fontWeight: '300',
          color: '#808080',
          lineHeight: '16.8px',
          '::placeholder': {
            color: '#808080',
            fontWeight: '300',
          },
          iconColor: '#6B6B6B',
        },
        invalid: {color: '#d32f2f', iconColor: '#d32f2f'},
      },
      hidePostalCode: true,
    }),
    []
  )

  const formik = useFormik<IMembershipPayment>({
    initialValues: savedFormData || {
      ...inits,
      price_id: membership?.stripePlanId ?? '',
    },
    onSubmit: async (values) => {
      setLoading(true)
      try {
        if (!stripe || !elements) throw new Error('Stripe.js has not loaded yet.')
        const cardElement = elements.getElement(CardElement)
        if (!cardElement) throw new Error('CardElement is not available.')

        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: values.name_on_card,
            email: values.email,
            address: {
              country: values.country,
              postal_code: values.postal_code,
              line1: values.address || undefined,
            },
          },
        })

        if (error) {
          console.error(error)
          navigate.push({
            pathname: '/payment/error',
            state: {membership, formData: values},
          })
          return
        }

        const payload: IMembershipPayment = {
          payment_method_id: paymentMethod?.id ?? '',
          price_id: membership?.stripePlanId ?? '',
          card_no: '',
          name_on_card: values.name_on_card,
          address: values.address ?? null,
          postal_code: values.postal_code,
          country: values.country,
          email: values.email,
        }

        await subscribe(payload)

        navigate.push('/payment/success')
      } catch (err: any) {
        console.error(err)
        if (err) {
          console.error(err)
          navigate.push({
            pathname: '/payment/error',
            state: {membership, formData: values},
          })
          return
        }
      } finally {
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    if (savedFormData?.address) {
      setShowManualAddress(true)
    }
  }, [savedFormData])

  const calculateTotal = (shipping: number = 0, priceMembership: number = 0): number => {
    const a = Number(shipping) || 0
    const b = Number(priceMembership) || 0
    const total = +(a + b).toFixed(2)
    return total
  }

  const total = React.useMemo(
    () => calculateTotal(membership?.shipping, Number(membership?.price)),
    [membership?.shipping, membership?.price]
  )

  return (
    <FormikProvider value={formik}>
      <div className='payment-layout' ref={scrollTopRef}>
        <section className='payment-summary-section'>
          <div className='summary-wrapper'>
            <div className='summary-middle'>
              <a onClick={() => navigate.push('/plans')} className='back-arrow'>
                <SVG src={toAbsoluteUrl('/media/svg/nobilis/back.svg')} />
              </a>
              <div className='price-card-container'>
                <div className='price-card'>
                  <div className='price-card__label'>Total</div>
                  <div className='price-card__content'>
                    <div className='price-card__amount'>{formatCurrencyUSD(membership?.price)}</div>
                  </div>
                </div>
              </div>

              <div className='order-details'>
                <div className='order-details__items'>
                  <div className='order-row'>
                    <div className='order-row__info'>
                      <div className='order-row__title'>Initiation fee</div>
                      <div className='order-row__qty'>
                        <span>One time</span>
                      </div>
                    </div>
                    <div className='order-row__amount'>
                      {formatCurrencyUSD(membership?.price ? Number(membership.price) * 0.67 : 100)}
                    </div>
                  </div>

                  <div className='order-row'>
                    <div className='order-row__title'>Annual fee</div>
                    <div className='order-row__amount'>
                      {formatCurrencyUSD(membership?.price ? Number(membership.price) * 0.33 : 50)}
                    </div>
                  </div>
                </div>

                <div className='order-divider'></div>

                <div className='order-details__extra'>
                  <div className='order-row'>
                    <div className='order-row__title'>Subtotal</div>
                    <div className='order-row__amount'>{formatCurrencyUSD(membership?.price)}</div>
                  </div>

                  <div className='order-row order-row--light'>
                    <div className='order-row__title'>Tax</div>
                    <div className='order-row__amount '>$0.00</div>
                  </div>
                </div>

                <div className='order-divider'></div>

                <div className='order-total'>
                  <div className='order-total__label'>Total due today</div>
                  <div className='order-total__amount'>{formatCurrencyUSD(total)}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT - Payment Form */}
        <section className='payment-form-section'>
          <div className='form-wrapper'>
            <div className='form-title-payment'>pay with card</div>
            <form onSubmit={formik.handleSubmit} noValidate className='payment-form'>
              <div className='form-section mb-10'>
                <label className='form-label'>EMAIL</label>
                <input
                  type='email'
                  className='form-input'
                  {...formik.getFieldProps('email')}
                  required
                />
              </div>

              <div className='form-section mb-10'>
                <label className='form-label'>CARD INFORMATION</label>
                <div className='card-input-wrapper'>
                  <CardElement
                    id='card-element'
                    options={cardStyles as any}
                    className='stripe-card-element'
                  />
                </div>
              </div>

              <div className='form-section mb-10'>
                <label className='form-label'>NAME ON CARD</label>
                <input
                  type='text'
                  className='form-input'
                  {...formik.getFieldProps('name_on_card')}
                  required
                />
              </div>

              <div className='form-section'>
                <label className='form-label'>COUNTRY OR REGION</label>
                <CountriesAutocompleteField name='country' />

                <input
                  type='text'
                  className='form-input'
                  placeholder='ZIP'
                  {...formik.getFieldProps('postal_code')}
                  required
                />

                <button
                  type='button'
                  className={`manual-entry-btn ${!showManualAddress ? 'mb-10' : ''}`}
                  onClick={() => setShowManualAddress(!showManualAddress)}
                >
                  Enter address manually
                </button>

                {showManualAddress && (
                  <input
                    type='text'
                    className='form-input mb-10'
                    placeholder='Address'
                    {...formik.getFieldProps('address')}
                  />
                )}
              </div>

              <button type='submit' className='submit-button' disabled={loading || !stripe}>
                {!loading ? (
                  `PAY USD ${formatCurrencyUSD(total)}`
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
            </form>
          </div>
        </section>
      </div>
    </FormikProvider>
  )
}

export {MembershipPaymentWidget}
