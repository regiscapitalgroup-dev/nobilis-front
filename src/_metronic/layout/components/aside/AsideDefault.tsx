import React, {FC} from 'react'
import clsx from 'clsx'
import {useLayout} from '../../core'
import {AsideMenu} from './AsideMenu'

const AsideDefault: FC = () => {
  const {config, classes} = useLayout()
  const {aside} = config;
  
  if (!aside.display) {
    return null
  }

  return (
    <div
      id='kt_aside'
      className={clsx('aside d-flex flex-column', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'320px', '300px': '320px'}"
     /*  data-kt-drawer-width="{default:'200px', '300px': '250px'}" */
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
      style={{
        height: '100%',
        position: 'relative'
      }}
    >
      {/* begin::Brand */}
      
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid overflow-auto'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}
    </div>
  )
}

export {AsideDefault}