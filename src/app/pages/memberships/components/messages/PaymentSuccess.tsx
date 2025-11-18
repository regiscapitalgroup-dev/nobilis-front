import {Link} from 'react-router-dom'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'

export default function PaymentSuccessPage() {
  const {user} = useSelector((state: RootState) => state.auth, shallowEqual)
  const firstName = user?.firstName || 'User'

  return (
    <div className='payment-content'>
      {/* Card */}
      <div className='payment-card'>
        <h2 className='payment-card__title'>
          Thank you, {firstName}! <br /> Your payment has been received.
        </h2>

        <p className='payment-card__desc'>
          To ensure your exclusive spot and full platform access after launch, please complete your
          member profile and upload your experiences by June 30, 2025.
        </p>

        {/* Divider */}
        <div className='nbx-lines' aria-hidden='true'>
          <span className='nbx-lines__line' />
          <span>
            <img src='/media/svg/nobilis/mark.svg' alt='divider' className='payment-card__icon' />
          </span>
          <span className='nbx-lines__line' />
        </div>

        {/* Botón */}
        <Link to='/profile' className='btn nb-btn-outline'>
          <span className='nb-heading-md'>COMPLETE PROFILE</span>
          <img
            src='/media/svg/nobilis/vector1.svg'
            alt=''
            className='nb-btn-icon nb-btn-icon--black'
          />
        </Link>
      </div>
    </div>
  )
}
