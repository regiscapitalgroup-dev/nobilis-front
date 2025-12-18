import React from 'react'
import {Link} from 'react-router-dom'

const LOGO_TEXT = 'NOBILIS'
const DASHBOARD_ROUTE = '/dashboard'

export function AdminHeaderLogo() {
  return (
    <div className='nb-admin-header__brand'>
      <Link to={DASHBOARD_ROUTE} className='nb-admin-header__logo'>
        {LOGO_TEXT}
      </Link>
    </div>
  )
}
