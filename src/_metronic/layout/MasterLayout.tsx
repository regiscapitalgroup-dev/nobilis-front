import React from 'react'
import {AsideDefault} from './components/aside/AsideDefault'
import {Footer} from './components/Footer'
import {HeaderWrapper} from './components/header/HeaderWrapper'
import {Toolbar} from './components/toolbar/Toolbar'
import {ScrollTop} from './components/ScrollTop'
import {Content} from './components/Content'
import {MasterInit} from './MasterInit'
import {PageDataProvider} from './core'
import {
  DrawerMessenger,
  /* ExploreMain, */
  ActivityDrawer,
  Main,
  InviteUsers,
  UpgradePlan,
} from '../partials'
import {useLocation} from 'react-router-dom'
import {getLayoutConfig} from '../../app/config/routeLayouts'
import {ExperiencesSection} from './components/ExperiencesSection'

const MasterLayout: React.FC = ({children}) => {
  const location = useLocation()
  const layoutConfig = getLayoutConfig(location.pathname)
  const {
    showHeader,
    showAside,
    showFooter = false,
    showToolbar = false,
    showExpFooter,
  } = layoutConfig

  return (
    <PageDataProvider>
      <div className='page d-flex flex-row flex-column-fluid'>
        {showAside && <AsideDefault />}
        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          {showHeader && <HeaderWrapper />}
          {/* <div id='j' className='nb-ms-header'>
            <div className='nb-ms-kicker mt-10'>NOBILIS</div>
          </div> */}
          <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
            {showToolbar && <Toolbar />}
            <div className='post d-flex flex-column-fluid' id='kt_post'>
              <Content>{children}</Content>
            </div>
          </div>

          {showExpFooter && (
            <>
              <ExperiencesSection />
            </>
          )}
          {showFooter && (
            <>
              <Footer />
            </>
          )}
        </div>
      </div>

      {/* begin:: Drawers */}
      <ActivityDrawer />
      {/*  <ExploreMain /> */}
      <DrawerMessenger />
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
