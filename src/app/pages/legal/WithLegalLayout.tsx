import {FC, useEffect, useRef, ComponentType} from 'react'
import {useLayout} from '../../../_metronic/layout/core'

export function withLegalLayout<P extends object>(Component: ComponentType<P>): FC<P> {
  return (props: P) => {
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

    return <Component {...props} />
  }
}