import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {AuthPage} from '../modules/auth'
import { LandingWrapper } from '../pages/public/landing/LandingWrapper'
import { LandingPage } from '../pages/public/landing/LandingPage'
import { PartnersPage } from '../pages/public/landing/pages/Partners/PartnersPage'
import { MessageComponent } from '../modules/auth/components/messages/messageComponent'
import { ValuesPage } from '../pages/public/landing/pages/Values/ValuesPage'

export function PublicRoutes() {
  return (
    <Switch>
      <Route path='/auth' component={AuthPage} />
      <Route path='/' exact component={LandingPage} />
      <Route path="/partners" component={PartnersPage} />
      <Route path="/values" component={ValuesPage} />
      <Redirect to='/' />
    </Switch>
  )
}
