import {Route, Switch} from 'react-router-dom'
import PaymentSuccessPage from './components/messages/PaymentSuccess'
import PaymentFailurePage from './components/messages/PaymentFailure'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import SVG from 'react-inlinesvg'

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
      <SVG src='/media/svg/nobilis/logo-nb.svg' />
       

        <Switch>
          <Route path={`/payment/success`} component={PaymentSuccessPage} />
          <Route path={`/payment/error`} component={PaymentFailurePage} />
        </Switch>
      </div>
    </div>
  )
}
