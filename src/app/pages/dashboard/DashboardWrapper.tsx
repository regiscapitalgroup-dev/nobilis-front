/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useRef} from 'react'
import {useIntl} from 'react-intl'
import {useLayout} from '../../../_metronic/layout/core'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import MembershipPageWrapper from '../memberships/MembershipPageWrapper'

const DashboardPage: FC = () => (
  <>
    <MembershipPageWrapper />
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  const {config, setLayout} = useLayout()
  const restoreRef = useRef(config)

  useEffect(() => {
    // guarda layout actual
    restoreRef.current = config

    // oculta chrome y agrega clase de página en blanco
    setLayout({
      ...config,
      header: {...config.header, display: false},
      toolbar: {...config.toolbar, display: false},
      aside: {...config.aside, display: false},
      footer: {...config.footer, display: false}, // opcional
      main: {
        ...config.main,
        body: {...config.main?.body, class: 'app-blank'},
      },
    })

    // igual que AuthPage: body blanco
    document.body.classList.add('bg-white')

    return () => {
      // restaura layout y body
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
      <div className='nb-app-container'>
        <DashboardPage />
      </div>
    </>
  )
}

export {DashboardWrapper}
