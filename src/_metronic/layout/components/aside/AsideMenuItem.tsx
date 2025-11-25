import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {KTSVG} from '../../../helpers'

type Props = {
  to: string
  title: string
  icon?: string
  showIcon?: boolean
  showBadge?: boolean
  badgeCount?: number
  isSelected?: boolean
}

export function AsideMenuItem({
  to,
  title,
  icon,
  showIcon = false,
  showBadge = false,
  badgeCount = 0,
  isSelected = false,
}: Props) {
  const location = useLocation()
  const isActive = isSelected || location.pathname === to

  return (
    <Link
      to={to}
      className={`nb-menu-item ${isActive ? 'nb-menu-item--active' : 'nb-menu-item--inactive'}`}
    >
      {showIcon && icon && (
        <div className='nb-menu-icon'>
          <KTSVG path={icon} className='svg-icon-1' />
        </div>
      )}

      {isActive && (
        <div className='nb-menu-link'>
          <span className='nb-menu-title'>{title}</span>
          {showBadge && badgeCount > 0 && (
            <div className='nb-menu-badge'>
              <span className='nb-badge'>{badgeCount}</span>
            </div>
          )}
        </div>
      )}

      {!isActive && (
        <>
          <span className='nb-menu-title'>{title}</span>
          {showBadge && badgeCount > 0 && (
            <div className='nb-menu-badge'>
              <span className='nb-badge'>{badgeCount}</span>
            </div>
          )}
        </>
      )}
    </Link>
  )
}