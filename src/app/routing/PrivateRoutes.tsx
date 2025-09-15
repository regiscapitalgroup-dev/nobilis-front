import React, {Suspense} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import { DashboardCoreWrapper } from '../pages/dashboardCore/DashboardCoreWrapper'
import { BiographyWrapper } from '../pages/biography/BiographyWrapper'
import { PaymentExpertWrapper } from '../pages/paymentExpert/PaymentExpertWrapper'

export function PrivateRoutes() {
  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/plans' component={DashboardWrapper} />
        <Route path='/dashboard' component={DashboardCoreWrapper} />
        <Route path='/biography' component={BiographyWrapper} />
        <Route path='/expert' component={PaymentExpertWrapper} />
        <Redirect from='/auth' to='/plans' />
        <Redirect exact from='/' to='/plans' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
