import React from 'react'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'

const PaymentFailurePage: React.FC = () => {
  return (
    <div className='payment-content'>
      {/* Logo */}

      {/* Card */}
      <div className='payment-card'>
        <h2 className='payment-card__title'>Payment unsuccessful</h2>

        <p className='payment-card__desc'>
          Unfortunately, your payment could not be processed. Please review your details and try
          again. If the issue persists, you may retry payment or contact support.
        </p>

        {/* Actions */}
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

          <Link to='/profile' className='pf-outline-btn'>
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
