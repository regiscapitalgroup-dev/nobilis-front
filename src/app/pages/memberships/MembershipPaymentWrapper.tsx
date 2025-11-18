import {FC, useRef, useEffect} from 'react'
import {MembershipPaymentPage} from './MembershipPaymentPage'
import {useLayout} from '../../../_metronic/layout/core'

const MembershipPaymentWrapper: FC = () => {
  const {config, setLayout} = useLayout()
  const restoreRef = useRef(config)

  useEffect(() => {
    restoreRef.current = config

    setLayout({
      ...config,
      header: {...config.header, display: false},
      aside: {...config.aside, display: false},
      toolbar: {...config.toolbar, display: false},
      footer: {...config.footer, display: false},
    })

    return () => setLayout(restoreRef.current)
  }, [])

  return <MembershipPaymentPage />
}

export default MembershipPaymentWrapper
