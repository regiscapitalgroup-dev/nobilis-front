import React from 'react'
import {AsideDefault} from './components/aside/AsideDefault'
import {Footer} from './components/Footer'
import {HeaderWrapper} from './components/header/HeaderWrapper'
import {Toolbar} from './components/toolbar/Toolbar'
import {ScrollTop} from './components/ScrollTop'
import {Content} from './components/Content'
import {MasterInit} from './MasterInit'
import {PageDataProvider} from './core'
import {DrawerMessenger, ActivityDrawer, Main, InviteUsers, UpgradePlan} from '../partials'
import {useLocation} from 'react-router-dom'
import {getLayoutConfig} from '../../app/config/routeLayouts'
import {ExperiencesSection} from './components/ExperiencesSection'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../setup'
import {UserModel} from '../../app/modules/auth/models/UserModel'
import {hasRole} from '../../app/utils/permissions'
import {UserRole} from '../../app/constants/roles'
import { RequestMembership } from '../partials/layout/request-membership/RequestMembershipDrawer'
import { useDrawer } from '../../app/context/UserWaitlistSelectedContext'

const MasterLayout: React.FC = ({children}) => {
  const location = useLocation()

  const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const isAdmin = hasRole(user, UserRole.ADMIN)
  const layoutConfig = getLayoutConfig(location.pathname, isAdmin)
  const {
    showHeader,
    showAside,
    showFooter = false,
    showToolbar = false,
    showExpFooter,
  } = layoutConfig
  const { isOpen, closeDrawer, payload } = useDrawer();

  return (
    <PageDataProvider>
      <div className='page d-flex flex-column min-vh-100' style={{position: 'relative'}}>
        {/* Header - mantiene estilos originales pero ocupa todo el ancho */}
        {showHeader && <HeaderWrapper />}

        {/* Container principal */}
        <div className='d-flex flex-row flex-fill' style={{position: 'relative'}}>
          {/* Aside */}
          {showAside && <AsideDefault />}

          {/* Contenido principal */}
          <div
            className='wrapper d-flex flex-column flex-fill'
            id='kt_wrapper'
            style={{
              marginLeft: showAside ? '0' : '0', // Sin margin left forzado
              minWidth: 0, // Previene overflow
            }}
          >
            <div id='kt_content' className='content d-flex flex-column flex-fill'>
              {showToolbar && <Toolbar />}
              <div className='post d-flex flex-column flex-fill' id='kt_post'>
                <Content>{children}</Content>
              </div>
            </div>

            {showExpFooter && <ExperiencesSection />}
          </div>
        </div>

        {/* Footer - ocupa todo el ancho */}
        {showFooter && <Footer />}
      </div>

      {/* begin:: Drawers */}
      <ActivityDrawer />
      <DrawerMessenger />
      <RequestMembership
        isOpen={isOpen}
        onClose={closeDrawer}
        dataUser={payload} />
      {/* end:: Drawers */}

      {/* begin:: Modals */}
      <Main />
      <InviteUsers />
      <UpgradePlan />
      {/* end:: Modals */}

      <MasterInit />
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MasterLayout}
