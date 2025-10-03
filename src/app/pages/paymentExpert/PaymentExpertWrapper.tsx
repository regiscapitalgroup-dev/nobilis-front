import {FC, useEffect, useRef} from 'react'
import {useLayout} from '../../../_metronic/layout/core'
import {UserProfileProvider} from '../../context/UserProfileContext'
import {PaymentExpertPage} from './PaymentExpertPage'

const PaymentExpertWrapper: FC = () => {
  const {config, setLayout} = useLayout()
  const restoreRef = useRef(config)

  useEffect(() => {
    restoreRef.current = config

    setLayout({
      ...config,
      header: {...config.header, display: true},
      aside: {...config.aside, display: false},
      toolbar: {...config.toolbar, display: false},
      footer: {...config.footer, display: true},
      expFooter: {...config.footer, display: false},
    })

    return () => setLayout(restoreRef.current)
  }, [])

  return (
    <>
      <UserProfileProvider>
        <PaymentExpertPage />
      </UserProfileProvider>
    </>
  )
}

export {PaymentExpertWrapper}
