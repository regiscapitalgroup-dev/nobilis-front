import {FC, useEffect, useRef} from 'react'
import {useLayout} from '../../../_metronic/layout/core'
import { MemberDetailPage } from './MenmberDetailPage'

const MemberDetailWrapper: FC = () => {
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
    })

    return () => setLayout(restoreRef.current)
  }, [])

  return <MemberDetailPage />
}

export {MemberDetailWrapper}
