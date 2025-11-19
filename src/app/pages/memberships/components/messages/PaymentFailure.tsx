import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {MembershipDetailModel} from '../../models/MembershipModel'
import {IMembershipPayment} from '../MembershipPaymentHelper'

const PaymentFailurePage: React.FC = () => {
  const location = useLocation<{membership: MembershipDetailModel; formData?: IMembershipPayment}>()
  const membership = location.state?.membership
  const formData = location.state?.formData

  return (
    <div className='payment-content'>
      {/* Card */}
      <div className='payment-card'>
        <h2 className='payment-card__title'>Payment unsuccessful</h2>

        <p className='payment-card__desc'>
          Unfortunately, your payment could not be processed. Please review your details and try
          again. If the issue persists, you may retry payment or contact support.
        </p>

        {/* Actions */}
        <div className='payment-card__actions pf-actions'>
          <button type='button' className='pf-link-btn'>
            <span>CONTACT SUPPORT</span>
            <img
              src='/media/svg/nobilis/vector1.svg'
              alt=''
              className='nb-btn-icon nb-btn-icon--black'
            />
          </button>

          <Link
            to={{
              pathname: '/membership/payment',
              state: {membership, formData},
            }}
            className='pf-outline-btn'
          >
            <span>RETRY</span>
            <img
              src='/media/svg/nobilis/vector1.svg'
              alt=''
              className='nb-btn-icon nb-btn-icon--black'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailurePage
