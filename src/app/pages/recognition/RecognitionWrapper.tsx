import {FC, useEffect, useRef} from 'react'
import RecognitionForm from './components/RecognitionForm'
import {useLayout} from '../../../_metronic/layout/core'

const RecognitionWrapper: FC = () => {
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
      <RecognitionForm />
    </div>
  )
}

export {RecognitionWrapper}
