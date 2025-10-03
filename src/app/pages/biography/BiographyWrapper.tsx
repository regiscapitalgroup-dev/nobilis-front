import {FC, useEffect, useRef} from 'react'
import {useLayout} from '../../../_metronic/layout/core'
import {BiographyPage} from './BiographyPage'
import {UserProfileProvider} from '../../context/UserProfileContext'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {UserModel} from '../../modules/auth/models/UserModel'
import {getLayoutConfig} from '../../config/routeLayouts'

const BiographyWrapper: FC = () => {
  const {config, setLayout} = useLayout()
  const restoreRef = useRef(config)
  const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const isAdmin = user?.role === 'ADMIN'

  useEffect(() => {
    restoreRef.current = config
    const layoutConfig = getLayoutConfig('/biography', isAdmin)

    setLayout({
      ...config,
      header: {...config.header, display: layoutConfig.showHeader},
      aside: {...config.aside, display: layoutConfig.showAside},
      toolbar: {...config.toolbar, display: layoutConfig.showToolbar},
      footer: {...config.footer, display: layoutConfig.showFooter},
      expFooter: {...config.expFooter, display: layoutConfig.showExpFooter},
    })

    return () => setLayout(restoreRef.current)
  }, [isAdmin])

  return (
    <>
      <UserProfileProvider>
        <BiographyPage />
      </UserProfileProvider>
    </>
  )
}

export {BiographyWrapper}