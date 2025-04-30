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
import {useMemberships} from '../../hooks/membership/useMemberships'
import NoMembershipsFound from './components/NoMembershipsFound'

const MembershipPage: FC = () => {
  const secondSecctionRef = useRef<HTMLDivElement>(null)
  const [membership, setMembership] = useState<MembershipDetailModel | null>(null)
  const {memberships, loading} = useMemberships()
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
          <MembershipWelcomeWidget subscriptionDetail={subscription} />
        ) : membership == null ? (
          <>
            {Array.isArray(memberships) && memberships.length ? (
              <>
                <MembershipWidget
                  memberships={memberships}
                  loading={loading}
                  handleScroll={handleSectionScroll}
                  handleMembershipSelected={handleMembershipSelected}
                />
                <MembershipCreditsWidget refToScroll={secondSecctionRef} />
              </>
            ) : <NoMembershipsFound />}
          </>
        ) : (
          <Elements stripe={stripePromise}>
            <MembershipPaymentWidget
              membership={membership}
              handleCancelSelected={handleCancelSelected}
            />
          </Elements>
        )}
      </div>
    </>
  )
}

export {MembershipPage}
