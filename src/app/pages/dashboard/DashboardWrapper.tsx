/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useRef} from 'react'
import {useIntl} from 'react-intl'
import {useLayout} from '../../../_metronic/layout/core'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import MembershipPageWrapper from '../memberships/MembershipPageWrapper'
import { shallowEqual, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from '../../../setup'
import { UserRole } from '../../constants/roles'

const DashboardPage: FC = () => (
  <>
    <MembershipPageWrapper />
  </>
)

const DashboardWrapper: FC = () => {
  const {config, setLayout} = useLayout()
  const restoreRef = useRef(config)

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

  useEffect(() => {
    restoreRef.current = config

    setLayout({
      ...config,
      header: {...config.header, display: false},
      toolbar: {...config.toolbar, display: false},
      aside: {...config.aside, display: false},
      footer: {...config.footer, display: false},
      main: {
        ...config.main,
        body: {...config.main?.body, class: 'app-blank'},
      },
    })

    document.body.classList.add('bg-white')

    return () => {
      setLayout(restoreRef.current)
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <>
      {/* Fondo idéntico a AuthPage */}
      <div
      /* aria-hidden='true' */
      /* style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          height: '45vh',
          backgroundImage: `url(${toAbsoluteUrl('/media/login-room.png')})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center bottom',
          backgroundSize: 'cover',
          filter: 'grayscale(100%)',
          zIndex: 0,
          pointerEvents: 'none',
        }} */
      />

      {/* Contenido por encima del fondo */}
      
        <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
