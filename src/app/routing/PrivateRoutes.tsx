import React, { Suspense, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { FallbackView } from '../../_metronic/partials'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { DashboardCoreWrapper } from '../pages/dashboardCore/DashboardCoreWrapper'
import { BiographyWrapper } from '../pages/biography/BiographyWrapper'
import { PaymentExpertWrapper } from '../pages/paymentExpert/PaymentExpertWrapper'
import { CalendarWrapper } from '../pages/calendar/CalendarWrapper'
import { ProfileAdminWrapper } from '../pages/profileAdmin/ProfileAdminWrapper'
import { BiographyFormWrapper } from '../pages/biography/BiographyFormWrapper'
import { PaymentExpertMessageWrapper } from '../pages/paymentExpert/PaymentExpertMessageWrapper'
import { ExpertiseWrapper } from '../pages/expertise/ExpertiseWrapper'
import { RecognitionWrapper } from '../pages/recognition/RecognitionWrapper'
import { TeamWrapper } from '../pages/team/TeamWrapper'
import { ReferencesWrapper } from '../pages/references/ReferencesWrapper'
import { ExperiecesWrapper } from '../pages/experiences/ExperiencesWrapper'
import { useSelector } from 'react-redux'
import { UserRole } from '../constants/roles'

export function PrivateRoutes() {
  const user = useSelector((state: any) => state.auth?.user)
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    // 🔐 Solo redirige si el usuario acaba de iniciar sesión
    // (si está en "/" o "/auth" o "/auth/login")
    if (location.pathname === '/' || location.pathname.startsWith('/auth')) {
      if (user?.role === UserRole.ADMIN) {
        history.replace('/biography')
      } else {
        history.replace('/plans')
      }
    }
  }, [user, history, location.pathname])

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        {/* Rutas disponibles para todos los usuarios autenticados */}
        <Route path='/plans' component={DashboardWrapper} />
        <Route path='/dashboard' component={DashboardCoreWrapper} />
        <Route path='/biography/overview' component={BiographyFormWrapper} />
        <Route path='/biography' component={BiographyWrapper} />
        <Route path='/calendar' component={CalendarWrapper} />
        <Route path='/admin/overview/:section' component={ProfileAdminWrapper} />
        <Route path='/expert/success' component={PaymentExpertMessageWrapper} />
        <Route path='/expert' component={PaymentExpertWrapper} />
        <Route path='/expertise' component={ExpertiseWrapper} />
        <Route path='/recognition' component={RecognitionWrapper} />
        <Route path='/team' component={TeamWrapper} />
        <Route path='/references' component={ReferencesWrapper} />
        <Route path='/experiences' component={ExperiecesWrapper} />

        {/* Redirecciones seguras */}
        <Redirect exact from='/' to='/plans' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
