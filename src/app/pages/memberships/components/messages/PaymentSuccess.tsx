import { Link } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../../setup'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'

export default function PaymentSuccessPage() {
  const { user } = useSelector((state: RootState) => state.auth, shallowEqual)
  const firstName = user?.firstName || 'Member'

  return (
    <div className="payment-shell">
      {/* Hero con imagen de fondo */}
      <div className="payment-hero">
        <img
          src={toAbsoluteUrl('/media/login-room.png')}
          alt="background"
          className="payment-hero__img"
        />
      </div>

      {/* Contenido */}
      <div className="payment-content">
        {/* Logo */}
        <div className="payment-logo">NOBILIS</div>

        {/* Card */}
        <div className="payment-card">
          <h2 className="payment-card__title">
            Thank you, {firstName}! <br /> Your payment has been received.
          </h2>

          <p className="payment-card__desc">
            To ensure your exclusive spot and full platform access after launch,
            please complete your member profile and upload your experiences by June 30, 2025.
          </p>

          {/* Divider */}
          <div className="payment-card__divider">
            <span className="payment-card__line" />
            <img src="/media/svg/nobilis/mark.svg" alt="divider" className="payment-card__icon" />
            <span className="payment-card__line" />
          </div>

          {/* Botón */}
          <Link to="/auth/registration" className="btn nb-btn-outline">
            <span className="nb-heading-md">COMPLETE PROFILE</span>
            <img
              src="/media/svg/nobilis/vector1.svg"
              alt=""
              className="nb-btn-icon nb-btn-icon--black"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
