import React from 'react'
import {AdminHeaderAvatar} from './AdminHeaderAvatar'
import {AdminHeaderUsername} from './AdminHeaderUsername'
import {HeaderUserMenu} from '../../../../partials'

export function AdminHeaderUser() {
  return (
    <div className='nb-admin-header__actions'>
      <div
        className='nb-admin-header__user'
        data-kt-menu-trigger='click'
        data-kt-menu-attach='parent'
        data-kt-menu-placement='bottom-end'
        data-kt-menu-flip='bottom'
      >
        <AdminHeaderAvatar />
        <AdminHeaderUsername />
      </div>
      <HeaderUserMenu />
    </div>
  )
}
