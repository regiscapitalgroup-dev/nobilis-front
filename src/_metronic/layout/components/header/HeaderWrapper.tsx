import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import clsx from 'clsx'
import {MenuComponent} from '../../../assets/ts/components'
import {useLayout} from '../../core'
import {KTSVG} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu} from '../../../partials'
import {UserModel} from '../../../../app/modules/auth/models/UserModel'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import {useWebSocketContext} from '../../../../app/context/WebSocketContext'
import {useUserNotifications} from '../../../../app/hooks/notifications/useNotifications'

export function HeaderWrapper() {
  const {pathname} = useLocation()
  const {config, classes, attributes} = useLayout()
  const {aside} = config
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const {subscribe, isConnected} = useWebSocketContext()
  
  // 🔧 Obtenemos las notificaciones iniciales
  const {data: initialNotifications} = useUserNotifications()
  
  const [notificationCount, setNotificationCount] = useState(0)
  const [hasNewNotification, setHasNewNotification] = useState(false)

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [pathname])

  
  useEffect(() => {
    if (initialNotifications && Array.isArray(initialNotifications)) {
      const unreadCount = initialNotifications.filter(n => !n.isRead).length
      setNotificationCount(unreadCount)
    }
  }, [initialNotifications])

  useEffect(() => {
    if (!isConnected) return

    const unsubscribe = subscribe('notification', (data) => {
      console.log('Nueva notificación en header:', data)
      
      if (!data.is_read && data.is_read !== undefined) {
        setNotificationCount((prev) => prev + 1)
      } else {
        setNotificationCount((prev) => prev + 1)
      }
      
      setHasNewNotification(true)
      
      setTimeout(() => {
        setHasNewNotification(false)
      }, 500)
    })

    return () => {
      unsubscribe()
    }
  }, [subscribe, isConnected])

  const handleNotificationRead = () => {
    setNotificationCount((prev) => Math.max(0, prev - 1))
  }

  return (
    <div
      id='kt_header'
      className={clsx('header nb-header align-items-center')}
      style={{
        width: '100%',
        position: 'relative',
        left: 0,
        right: 0,
      }}
      {...attributes.headerMenu}
    >
      <div
        className='container-fluid d-flex align-items-center justify-content-between'
        style={{
          maxWidth: 'none',
          width: '100%',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        {/* LOGO */}
        <div className='nb-header__logo'>NOBILIS</div>

        {/* CENTRO */}
        <div className='nb-header__center'>
          <div className='nb-header__tabs'>
            <span className='nb-header__tabs-item nb-header__tabs-item--active'>MEMBERS</span>
            <span className='nb-header__tabs-item nb-header__tabs-item--inactive'>INVITATIONS</span>
          </div>

          <div className='nb-header__search'>
            <input type='text' className='nb-header__search-field' placeholder='Where' />
            <input type='text' className='nb-header__search-field' placeholder='Keywords' />
            <div className='nb-header__search-icon'>
              <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-2' />
            </div>
          </div>
        </div>

        {/* DERECHA */}
        <div className='nb-header__right'>
          <span className='nb-header__right-link'>Community</span>
          <span className='nb-header__right-link'>Expertise</span>

          {/* NOTIFICATIONS */}
          <div className='nb-header__right-avatar'>
            <div
              className='notification-icon-wrapper cursor-pointer'
              data-kt-menu-trigger='click'
              data-kt-menu-attach='parent'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='bottom'
            >
              <KTSVG path='/media/svg/nobilis/bell.svg' className='svg-icon-1' />
              
              {notificationCount > 0 && (
                <div className={`notification-badge ${hasNewNotification ? 'notification-badge--new' : ''}`}>
                  <span className='notification-badge__number'>
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </span>
                </div>
              )}
            </div>
            <HeaderNotificationsMenu onNotificationRead={handleNotificationRead} />
          </div>

          {/* USER MENU */}
          <div className='nb-header__right-avatar position-relative'>
            <div
              className='cursor-pointer'
              data-kt-menu-trigger='click'
              data-kt-menu-attach='parent'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='bottom'
            >
              <img
                src={user.profilePicture ? user.profilePicture : 'https://placehold.co/32x32'}
                alt='User'
              />
            </div>
            <HeaderUserMenu />
          </div>
        </div>
      </div>
    </div>
  )
}