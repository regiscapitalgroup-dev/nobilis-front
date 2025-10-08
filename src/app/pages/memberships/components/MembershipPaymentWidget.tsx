import React, {useEffect, useMemo, useRef, useState} from 'react'
import {useFormik} from 'formik'
import {membershipPaymentSchemas, inits} from './MembershipPaymentHelper'
import {MembershipDetailModel} from '../models/MembershipModel'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import {useSubscription} from '../../../hooks/subscription/useSubscription '
import CountryAutocompleteFieldStandalone from './fields/CountryAutocompleteField'
import {useHistory} from 'react-router-dom'
import {formatCurrencyUSD} from '../../../helpers/FormatCurrency'

type Props = {
  membership?: MembershipDetailModel | null | undefined
  handleCancelSelected: () => void
}

type CheckoutPayload = {
  price_id: string
  paymentMethodId: string
  membership_id: number | null
  email: string
  name: string
  address: string
  country: string
}

const MembershipPaymentWidget: React.FC<Props> = ({membership, handleCancelSelected}) => {
  const {subscribe} = useSubscription()
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState<boolean>(false)

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('United States')
  const [billingIsSameAsShipping, setBillingIsSameAsShipping] = useState(false)
  const scrollTopRef = useRef<HTMLDivElement>(null)

  const navigate = useHistory()

  useEffect(() => {
    console.log(membership)
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

  const buildCheckoutPayload = (args: {paymentMethodId: string}): CheckoutPayload => {
    return {
      price_id: membership?.stripePlanId ?? '',
      paymentMethodId: args.paymentMethodId,
      membership_id: Number(membership?.id) ?? 0,
      email: email,
      name: name,
      address: address,
      country: country,
    }
  }

  const formik = useFormik({
    initialValues: inits,
    /* validationSchema: membershipPaymentSchemas[0], */
    onSubmit: async (values) => {
      setLoading(true)
      try {
        if (!stripe || !elements) throw new Error('Stripe.js has not loaded yet.')
        const cardElement = elements.getElement(CardElement)
        if (!cardElement) throw new Error('CardElement is not available.')

        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {name: values.cardHoldName || name, email},
        })

        if (error) {
          navigate.push('/payment/error')
          return
        }

        const payload = buildCheckoutPayload({
          paymentMethodId: paymentMethod?.id ?? '',
        })

        await subscribe({
          ...values,
          ...payload,
        })

        navigate.push('/payment/success')
      } catch (err: any) {
        navigate.push('/payment/failure')
      } finally {
        setLoading(false)
      }
    },
  })

  const calculateTotal = (shipping: number = 0, priceMembership: number = 0): number => {
    const a = Number(shipping) || 0
    const b = Number(priceMembership) || 0

    const total = +(a + b).toFixed(2)
    return total
  }

  const total = React.useMemo(
    () =>
      calculateTotal(
        membership?.shipping, // o el campo que uses para shipping/fee
        Number(membership?.price)
      ),
    [membership?.shipping, membership?.price, membership?.priceStr]
  )

  return (
    <div className='payment-layout' ref={scrollTopRef}>
      {/* LEFT - Order Summary */}
      <section className='payment-summary-section'>
        <div className='summary-wrapper'>
          <div className='nobilis-logo'>NOBILIS</div>

          <div className='summary-middle'>
            <div className='price-card'>
              <div className='price-card__label'>PAY NOBILIS</div>
              <div className='price-card__content'>
                <div className='price-card__amount'>USD {formatCurrencyUSD(membership?.price)}</div>
                <div className='price-card__freq'>Annually</div>
              </div>
            </div>

            <div className='order-details'>
              <div className='order-details__items'>
                <div className='order-row'>
                  <div className='order-row__info'>
                    <div className='order-row__title'>Founding Member Plan</div>
                    <div className='order-row__qty'>
                      <span>Qty</span>
                      <strong>1</strong>
                    </div>
                  </div>
                  <div className='order-row__amount'>
                    USD {formatCurrencyUSD(membership?.price)}
                  </div>
                </div>

                <div className='order-row'>
                  <div className='order-row__title order-row__title--single'>Subtotal</div>
                  <div className='order-row__amount'>
                    USD {formatCurrencyUSD(membership?.price)}
                  </div>
                </div>
              </div>

              <div className='order-details__extra'>
                <div className='order-row order-row--light'>
                  <div className='order-row__title'>Shipping</div>
                  <div className='order-row__amount'>-</div>
                </div>
                <div className='order-row order-row--light'>
                  <div className='order-row__title'>Fee</div>
                  <div className='order-row__amount'>USD $1.000</div>
                </div>
              </div>

              <div className='order-total'>
                <div className='order-total__label'>Total</div>
                <div className='order-total__amount'>USD {formatCurrencyUSD(total)}</div>
              </div>
            </div>
          </div>

          <div className='powered-by'>
            <span className='powered-by-text'>
              Powered by <strong>stripe</strong>
            </span>
            <span className='divider'>|</span>
            <a href='https://stripe.com/terms' target='_blank' rel='noreferrer'>
              Terms
            </a>
            <a href='https://stripe.com/privacy' target='_blank' rel='noreferrer'>
              Privacy
            </a>
          </div>
        </div>
      </section>

      {/* RIGHT - Payment Form */}
      <section className='payment-form-section'>
        <div className='form-wrapper'>
          <div className='form-header'>
            <span className='form-header__text'>Or pay with card</span>
          </div>

          <form onSubmit={formik.handleSubmit} noValidate className='payment-form'>
            {/* Shipping Information */}
            <div className='form-section'>
              <h3 className='form-section__title'>Shipping information</h3>

              <div className='form-group'>
                <label className='form-label'>EMAIL</label>
                <input
                  type='email'
                  className='form-input'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='form-group'>
                <label className='form-label'>SHIPPING ADDRESS</label>
                <input
                  type='text'
                  className='form-input'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className='select-wrapper'>
                  <CountryAutocompleteFieldStandalone value={country} onChange={setCountry} />
                </div>

                <input
                  type='text'
                  className='form-input'
                  placeholder='Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <button type='button' className='manual-entry-btn mb-10'>
                  Enter address manually
                </button>
              </div>
            </div>

            {/* Payment Detail */}
            <div className='form-section'>
              <h3 className='form-section__title'>Payment Detail</h3>

              <div className='form-group'>
                <label className='form-label'>CARD INFORMATION</label>
                <div className='card-input-wrapper mb-10'>
                  <CardElement
                    id='card-element'
                    options={cardStyles as any}
                    className='stripe-card-element'
                  />
                </div>
              </div>
            </div>

            <button type='submit' className='submit-button' disabled={loading}>
              {!loading ? (
                <>
                  <span className='nb-heading-md'>{` PAY USD ${formatCurrencyUSD(total)}`}</span>
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
          </form>
        </div>
      </section>
    </div>
  )
}

export {MembershipPaymentWidget}
