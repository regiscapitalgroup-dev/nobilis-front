import React, {Suspense, useEffect} from 'react'
import {Redirect, Route, Switch, useHistory} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {DashboardCoreWrapper} from '../pages/dashboardCore/DashboardCoreWrapper'
import {BiographyWrapper} from '../pages/biography/BiographyWrapper'
import {PaymentExpertWrapper} from '../pages/paymentExpert/PaymentExpertWrapper'
import {CalendarWrapper} from '../pages/calendar/CalendarWrapper'
import {ProfileAdminWrapper} from '../pages/profileAdmin/ProfileAdminWrapper'
import {BiographyFormWrapper} from '../pages/biography/BiographyFormWrapper'
import {PaymentExpertMessageWrapper} from '../pages/paymentExpert/PaymentExpertMessageWrapper'
import {ExpertiseWrapper} from '../pages/expertise/ExpertiseWrapper'
import {RecognitionWrapper} from '../pages/recognition/RecognitionWrapper'
import {TeamWrapper} from '../pages/team/TeamWrapper'
import {ReferencesWrapper} from '../pages/references/ReferencesWrapper'
import {ExperiecesWrapper} from '../pages/experiences/ExperiencesWrapper'
import {shallowEqual, useSelector} from 'react-redux'
import {UserRole} from '../constants/roles'
import {RootState} from '../../setup'
import {SuggestExperienceWrapper} from '../pages/experiences/SuggestExperienceWrapper'
import {WaitingListWrapper} from '../pages/waitingList/WaitingListWrapper'
import {TermsPage} from '../pages/legal/TermsPage'
import {PrivacyPage} from '../pages/legal/PrivacyPage'
import MembershipPaymentWrapper from '../pages/memberships/MembershipPaymentWrapper'
import PaymentPage from '../pages/memberships/PaymentPage'
import ProfileBasePage from '../pages/profile/ProfilePage'

export function PrivateRoutes() {
  const user = useSelector((state: any) => state.auth?.user)
  const history = useHistory()
  const subscription = useSelector((state: RootState) => state.auth?.subscription, shallowEqual)

  useEffect(() => {
    if (!user) return

    if (user.role === UserRole.STAFF_USER) {
      history.replace('/waitinglist')
      return
    }

    if (user.role === UserRole.ADMIN) {
      history.replace(subscription ? '/biography' : '/plans')
      return
    }
  }, [user, subscription, history])

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/plans' component={DashboardWrapper} />
        <Route path='/membership/payment' component={MembershipPaymentWrapper} />
        <Route path='/payment' component={PaymentPage} />
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
        <Route path='/experiences/create' component={SuggestExperienceWrapper} />
        <Route path='/experiences' component={ExperiecesWrapper} />
        <Route path='/waitinglist' component={WaitingListWrapper} />
        <Route path='/terms-conditions' component={TermsPage} />
        <Route path='/privacy-policy' component={PrivacyPage} />
        <Route path='/my-experience' component={AddExperiencePage} />
        <Route path='/profile' component={ProfileBasePage} />
        <Route path='/searchable-members' component={MembersWrapper} />
        <Route path='/member/overview' component={MemberDetailWrapper} />
        <Route path='/manage-members' component={ManageMemberWrapper} />
        <Redirect to='/error/404' />
      </Switch>
    </Suspense>
  )
}
