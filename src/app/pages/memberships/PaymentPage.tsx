import {Route, Switch} from 'react-router-dom'
import PaymentSuccessPage from './components/messages/PaymentSuccess'
import PaymentFailurePage from './components/messages/PaymentFailure'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

export default function PaymentPage() {
  return (
    <div className='payment-shell'>
      <div className='payment-hero'>
        <img
          src={toAbsoluteUrl('/media/login-room.png')}
          alt='background'
          className='payment-hero__img'
        />
      </div>

      <div className='payment-content'>
        <div className='payment-logo'>NOBILIS</div>

        <Switch>
          <Route path={`/payment/success`} component={PaymentSuccessPage} />
          <Route path={`/payment/error`} component={PaymentFailurePage} />
        </Switch>
      </div>
    </div>
  )
}
