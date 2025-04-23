import {FC, useRef, useState} from 'react'
import {MembershipWidget} from './components/MembershipWidget'
import {MembershipCreditsWidget} from './components/MembershipCreditsWidget'
import {MembershipPaymentWidget} from './components/MembershipPaymentWidget'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import {MembershipDetailModel} from './models/MembershipModel'
import {MembershipWelcomeWidget} from './components/MembershipWelcomeWidget'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../setup'

const MembershipPage: FC = () => {
  const secondSecctionRef = useRef<HTMLDivElement>(null)
  const [membership, setMembership] = useState<MembershipDetailModel | null>(null)
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || '', {
    locale: 'en',
  })
  const {subscription} = useSelector((state: RootState) => state.auth, shallowEqual)

  const handleSectionScroll = () => {
    secondSecctionRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  const handleMembershipSelected = (data: MembershipDetailModel | null) => {
    setMembership(data)
  }

  const handleCancelSelected = () => {
    setMembership(null)
  }

  return (
    <>
      <div className='row g-5 g-xl-8'>      
        {subscription ? (
          <MembershipWelcomeWidget subscriptionDetail={subscription}></MembershipWelcomeWidget>
        ) : membership! == null ? (
          <>
            <MembershipWidget
              handleScroll={handleSectionScroll}
              handleMembershipSelected={handleMembershipSelected}
            />
            <MembershipCreditsWidget refToScroll={secondSecctionRef} />
          </>
        ) : (
          <Elements stripe={stripePromise}>
            <MembershipPaymentWidget
              membership={membership}
              handleCancelSelected={handleCancelSelected}
            ></MembershipPaymentWidget>
          </Elements>
        )}
      </div>
    </>
  )
}

export {MembershipPage}
