/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import {shallowEqual, useSelector} from 'react-redux'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import {Logout, AuthPage} from '../modules/auth'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {RootState} from '../../setup'
import PaymentPage from '../pages/memberships/PaymentPage'
import ProfileForm from '../pages/profile/ProfilePage'
import {PublicRoutes} from './PublicRoutes'
import {WebSocketProvider} from '../context/WebSocketContext'
import store from '../../setup/redux/Store'

const Routes: FC = () => {
  const isAuthorized = useSelector<RootState>(({auth}) => auth.user, shallowEqual)
  const {
    auth: {accessToken},
  } = store.getState()
  const wsUrl = process.env.REACT_APP_API_URL ?? ''
  return (
    <Switch>
      {!isAuthorized && (
        <Route path={['/', '/auth/login']}>
          <PublicRoutes />
        </Route>
      )}

      <Route path='/payment' component={PaymentPage} />
      <Route path='/profile' component={ProfileForm} />

      <Route path='/error' component={ErrorsPage} />
      <Route path='/logout' component={Logout} />

      {!isAuthorized ? (
        <Redirect to='/' />
      ) : (
        <WebSocketProvider wsBaseUrl={wsUrl} token={accessToken ?? ''}>
          <MasterLayout>
            <PrivateRoutes />
          </MasterLayout>
        </WebSocketProvider>
      )}
    </Switch>
  )
}

export {Routes}
