import {FC, useEffect, useRef} from 'react'
import {WaitingListPage} from './WaitingListPage'
import {useLayout} from '../../../_metronic/layout/core'

const WaitingListWrapper: FC = () => {
  const {config, setLayout} = useLayout()
  const restoreRef = useRef(config)

  useEffect(() => {
    restoreRef.current = config

    setLayout({
      ...config,
      header: {...config.header, display: true},
      aside: {...config.aside, display: true},
      toolbar: {...config.toolbar, display: false},
      footer: {...config.footer, display: true},
    })

    return () => setLayout(restoreRef.current)
  }, [])

  return <WaitingListPage />
}

export {WaitingListWrapper}
