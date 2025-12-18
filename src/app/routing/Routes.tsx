import {FC} from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import {shallowEqual, useSelector} from 'react-redux'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import {Logout} from '../modules/auth'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {RootState} from '../../setup'
import {PublicRoutes} from './PublicRoutes'
import {WebSocketProvider} from '../context/WebSocketContext'
import store from '../../setup/redux/Store'
import {DrawerProvider} from '../context/UserWaitlistSelectedContext'
import {UserProfileProvider} from '../context/UserProfileContext'
import {SearchableMembersProvider} from '../context/SearchableMembersContext'
import { ConfirmProvider } from '../helpers/alertConfirm'

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

      <Route path='/error' component={ErrorsPage} />
      <Route path='/logout' component={Logout} />

      {!isAuthorized ? (
        <Redirect to='/' />
      ) : (
        <WebSocketProvider wsBaseUrl={wsUrl} token={accessToken ?? ''}>
          <DrawerProvider>
            <UserProfileProvider>
              <SearchableMembersProvider>
                <ConfirmProvider>
                  <MasterLayout>
                    <PrivateRoutes />
                  </MasterLayout>
                </ConfirmProvider>
              </SearchableMembersProvider>
            </UserProfileProvider>
          </DrawerProvider>
        </WebSocketProvider>
      )}
    </Switch>
  )
}

export {Routes}
