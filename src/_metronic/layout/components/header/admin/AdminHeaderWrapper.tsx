import React from 'react'
import {AdminHeaderLogo} from './AdminHeaderLogo'
import {AdminHeaderUser} from './AdminHeaderUser'

export function AdminHeaderWrapper() {
  return (
    <header className='nb-admin-header'>
      <div className='nb-admin-header__container'>
        <AdminHeaderLogo />
        <AdminHeaderUser />
      </div>
    </header>
  )
}
