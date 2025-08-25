import {Route, Switch, Redirect, useRouteMatch} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import PaymentFailure from './components/messages/PaymentFailure'

export default function PaymentPage() {
  const {path} = useRouteMatch()

  return (
    <>
      <div >
        <div aria-hidden='true' className='nb-hero'>
          <img
            className='nb-hero__img'
            src={toAbsoluteUrl('/media/login-room.png')}
            alt=''
            loading='eager'
          />
        </div>

        {/* Contenido principal */}
        <div>
          {/* Logo textual */}

          {/* Card con ancho responsivo*/}
          <div>
            <div className='nb-auth-card--p60'>
              <div className=''>
                <Switch>
                 {/*  <Route path={`/payment/success`} component={PaymentSuccess} /> */}
                  <Route path={`/payment/error`} component={PaymentFailure} />                 
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
