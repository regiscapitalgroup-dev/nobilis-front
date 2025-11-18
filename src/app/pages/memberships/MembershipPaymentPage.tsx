import {FC} from 'react'
import {MembershipPaymentWidget} from './components/MembershipPaymentWidget'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import {useLocation} from 'react-router-dom'

const MembershipPaymentPage: FC = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || '', {locale: 'en'})

  const location = useLocation<any>()
  const {membership} = location.state || {}

  return (
    <>
      <div className='payment-layout-header'>
        <div className='nobilis-logo'>NOBILIS</div>
      </div>
      <Elements stripe={stripePromise}>
        <MembershipPaymentWidget membership={membership} handleCancelSelected={() => {}} />
      </Elements>
    </>
  )
}

export {MembershipPaymentPage}
