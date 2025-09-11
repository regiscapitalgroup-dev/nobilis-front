import {FC, useEffect, useRef} from 'react'
import {useLayout} from '../../../_metronic/layout/core'
import {BiographyPage} from './BiographyPage'
import {UserProfileProvider} from '../../context/UserProfileContext'

const BiographyWrapper: FC = () => {
  const {config, setLayout} = useLayout()
  const restoreRef = useRef(config)

  useEffect(() => {
    restoreRef.current = config

    setLayout({
      ...config,
      header: {...config.header, display: true}, // ← Mostrar header
      aside: {...config.aside, display: false}, // ← Ocultar aside
      toolbar: {...config.toolbar, display: false},
      footer: {...config.footer, display: true},
    })

    return () => setLayout(restoreRef.current)
  }, [])

  return (
    <>
      <div className='nb-app-container'>
        <UserProfileProvider>
          <BiographyPage />
        </UserProfileProvider>
      </div>
    </>
  )
}

export {BiographyWrapper}
