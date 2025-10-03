import {FC, useEffect, useRef} from 'react'
import {useLayout} from '../../../_metronic/layout/core'
import { ReferencesPage } from './ReferencesPage'

const ReferencesWrapper: FC = () => {
  const {config, setLayout} = useLayout()
  const restoreRef = useRef(config)

  useEffect(() => {
    restoreRef.current = config

    setLayout({
      ...config,
      header: {...config.header, display: true},
      aside: {...config.aside, display: true},
      toolbar: {...config.toolbar, display: false},
      footer: {...config.footer, display: false},
    })

    return () => setLayout(restoreRef.current)
  }, [])

  return (
    <div>
      <ReferencesPage />
    </div>
  )
}

export {ReferencesWrapper}
