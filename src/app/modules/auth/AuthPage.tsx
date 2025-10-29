/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {Redirect, Route, Switch, useLocation} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import SVG from 'react-inlinesvg'
import {RegitrationWizard} from './components/RegistrationWizard'
import {Login} from './components/Login'
import {CreatePassword} from './components/CreatePassword'
import {ForgotPassword} from './components/ForgotPassword'
import {ResetPassword} from './components/ResetPassword'
import {MessageComponent} from './components/messages/messageComponent'
import RegistrationHeader from './components/RegistrationHeader'

export function AuthPage() {
  const {pathname} = useLocation()
  const isRegistration = pathname.startsWith('/auth/registration')
  const [wizStep, setWizStep] = useState(1)
  const [wizTotal, setWizTotal] = useState(4)
  const [headerTitle, setHeaderTitle] = useState(
    'There is currently a waiting list for Nobilis membership'
  )
  const [headerSub, setHeaderSub] = useState(
    'To join the waiting list, please leave your details below:'
  )

  const titles: Record<number, {title: string; sub: string}> = {
    1: {
      title: 'There is currently a waiting list for Nobilis membership',
      sub: 'To join the waiting list, please leave your details below:',
    },
    2: {
      title: 'Your interests and intentions',
      sub: 'Nobilis is member-led community where every member is contributor and participant.',
    },
    3: {
      title: 'Select the category that best represents your accomplishments',
      sub: 'To be considered for membership, applicants must meet at least one of the following criteria. Each reflects a different form of exceptional achievement, leadership, or influence. Accomplishments may be current or past, provided past roles lasted at least 4 years.',
    },
    4: {
      title: 'Your Net Worth',
      sub: 'To qualify as a “Wealth Owner,” you may be asked for proof (e.g., bank statement, CPA attestation, or family-office letter) if your net worth isn’t \npublicly verifiable.\nYour one-time initiation fee is calculated progressively based on your net worth.',
    },
  }

  const insertBreakAfter = (text: string, after: string) =>
    text.includes(after) ? text.replace(after, `${after}\n`) : text

  const formatTitleForStep = (step: number, t: string) => {
    if (step === 1) return insertBreakAfter(t, 'waiting list')
    if (step === 3) return insertBreakAfter(t, 'best ')
    return t
  }

  const formatSubTitleForStep = (step: number, t: string) => {
    if (step === 3) return insertBreakAfter(t, 'exceptional ')
    return t
  }
  const {title, sub} = titles[wizStep] ?? titles[1]
  const displayTitle = formatTitleForStep(wizStep, title)
  const displaySubtitle = formatSubTitleForStep(wizStep, sub)

  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => document.body.classList.remove('bg-white')
  }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{step: number; total: number}>
      const s = ev.detail?.step ?? 1
      const t = ev.detail?.total ?? 4
      setWizStep(s)
      setWizTotal(t)
      const map = titles[s] ?? titles[1]
      setHeaderTitle(map.title)
      setHeaderSub(map.sub)
    }
    window.addEventListener('nb:stepper', handler as EventListener)
    return () => window.removeEventListener('nb:stepper', handler as EventListener)
  }, [])

  return (
    <div className='auth-shell d-flex flex-column flex-column-fluid'>
      <div aria-hidden='true' className='nb-hero'>
        <img
          className='nb-hero__img'
          src={toAbsoluteUrl('/media/login-room.png')}
          alt=''
          loading='eager'
        />
      </div>

      {/* Contenido principal */}
      <div
        className='d-flex flex-center flex-column flex-column-fluid'
        style={{position: 'relative', zIndex: 1}}
      >
        {/* Logo textual */}
        <div className='mb-5'>
          <SVG src='/media/svg/nobilis/logo-nb.svg' />
        </div>

        {isRegistration && (
          <RegistrationHeader
            step={wizStep}
            total={wizTotal}
            title={displayTitle}
            subTitle={displaySubtitle}
          />
        )}

        {/* Card con ancho responsivo*/}
        <div
         /*  className='mx-auto w-100' */
          style={{
            maxWidth: isRegistration ? '846px' : '640px',
            width: '100%',
            ...(isRegistration && wizStep === 1 &&  {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }),
          }}
        >
          <div className='card card-flush nb-auth-card nb-auth-card--p60' style={{
            maxWidth: isRegistration ? '846px' : '640px',
            width: '100%',
            ...(isRegistration && {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }),
          }}>
            <div className='nb-auth-stack'>
              <Switch>
                <Route path='/auth/login' component={Login} />
                <Route path='/auth/registration' component={RegitrationWizard} />
                <Route path='/auth/activate-account/:token/:user' component={CreatePassword} />
                <Route path='/auth/forgot-password' component={ForgotPassword} />
                <Route path='/reset-password/:user/:token' component={ResetPassword} />
                <Route path='/auth/message' component={MessageComponent} />
                <Redirect from='/auth' exact={true} to='/auth/login' />
                <Redirect to='/auth/login' />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
