import React from 'react'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'

const PaymentFailure: React.FC = () => {
  return (
    <div className="payment-result-layout">
      <img
        className="payment-result-bg"
        src={toAbsoluteUrl('/media/login-room.png')}
        alt="bg"
      />
      <div className="payment-result-card">
        <h2 className="payment-result-title">Payment unsuccessful</h2>
        <p className="payment-result-text">
          Unfortunately, your payment could not be processed. Please review your
          details and try again. If the issue persists, you may retry payment or
          contact support.
        </p>

        <div className="payment-result-actions">
          <button className="payment-result-link">CONTACT SUPPORT →</button>
          <button className="payment-result-btn">RETRY →</button>
        </div>
      </div>

      <div className="payment-result-logo">NOBILIS</div>
    </div>
  )
}

export default PaymentFailure
