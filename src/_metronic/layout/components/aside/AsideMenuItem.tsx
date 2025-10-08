import React from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {checkIsActive, KTSVG} from '../../../helpers'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  showBadge?: boolean
  badgeCount?: number
  showIcon?: boolean
  isSelected?: boolean
}

const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
  showBadge = false,
  badgeCount = 0,
  showIcon = false,
  isSelected = false,
}) => {
  const {pathname} = useLocation()
  const isActive = isSelected || checkIsActive(pathname, to)

  return (
    <div
      className={clsx('nb-menu-item', {
        'nb-menu-item--active': isActive,
        'nb-menu-item--inactive': !isActive,
      })}
    >
      {/* Icon container - only shown when needed */}
      {showIcon && icon && (
        <div className='nb-menu-icon'>
          <KTSVG path={icon} className='svg-icon-1' />
        </div>
      )}

      {/* Conditional navigation - temporary behavior */}
      {to === '/dashboard' ? (
        <div
          className='nb-menu-link nb-menu-link--disabled'
          onClick={(e) => e.preventDefault()}
        >
          <div className='nb-menu-title'>{title}</div>
        </div>
      ) : (
        <Link className='nb-menu-link' to={to}>
          <div className='nb-menu-title'>{title}</div>
        </Link>
      )}

      {/* Badge */}
      {showBadge && badgeCount > 0 && (
        <div className='nb-menu-badge'>
          <span className='nb-badge'>{badgeCount}</span>
        </div>
      )}

      {children}
    </div>
  )
}

export {AsideMenuItem}
