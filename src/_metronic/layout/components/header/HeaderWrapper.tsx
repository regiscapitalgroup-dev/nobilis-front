import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import clsx from 'clsx'
import {MenuComponent} from '../../../assets/ts/components'
import {useLayout} from '../../core'
import {KTSVG} from '../../../helpers'

export function HeaderWrapper() {
  const {pathname} = useLocation()
  const {config, classes, attributes} = useLayout()
  const {aside} = config

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [pathname])

  return (
    <div
    id='kt_header'
    className={clsx('header nb-header align-items-center')}
    {...attributes.headerMenu}
  >
    <div className='container-fluid d-flex align-items-center justify-content-between'>
      {/* LOGO */}
      <div className='nb-header__logo'>NOBILIS</div>

      {/* CENTRO */}
      <div className='nb-header__center'>
        <div className='nb-header__tabs'>
          <span className='nb-header__tabs-item nb-header__tabs-item--active'>MEMBERS</span>
          <span className='nb-header__tabs-item nb-header__tabs-item--inactive'>INVITATIONS</span>
        </div>

        <div className='nb-header__search'>
          <input 
            type="text" 
            className='nb-header__search-field' 
            placeholder="Where" 
          />
          <input 
            type="text" 
            className='nb-header__search-field' 
            placeholder="Keywords" 
          />
          <div className='nb-header__search-icon'>
            <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-2' />
          </div>
        </div>
      </div>

      {/* DERECHA */}
      <div className='nb-header__right'>
        <span className='nb-header__right-link'>Community</span>
        <span className='nb-header__right-link'>Expertise</span>
        <div className='nb-header__right-avatar'>
          <KTSVG path='/media/svg/nobilis/bell.svg' className='svg-icon-1' />
          <span className='badge'>2</span>
        </div>
        <div className='nb-header__right-avatar'>
          <img src='https://placehold.co/32x32' alt='User' />
          <span className='badge'>2</span>
        </div>
      </div>
    </div>
  </div>
  )
}
