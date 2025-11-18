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

  const {data: initialNotifications} = useUserNotifications()

  const [notificationCount, setNotificationCount] = useState(0)
  const [hasNewNotification, setHasNewNotification] = useState(false)

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [pathname])

  useEffect(() => {
    if (initialNotifications && Array.isArray(initialNotifications)) {
      const unreadCount = initialNotifications.filter((n) => !n.isRead).length
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
        <div className='nb-header__logo'>
          <svg
            width='78'
            height='15'
            viewBox='0 0 78 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M72.7419 4.89711L76.7748 8.64198C77.5978 9.4032 77.8242 10.3086 77.8242 11.1521C77.8242 13.4156 76.3221 15 73.9558 15C72.9476 15 71.281 14.7118 70.4784 13.8683C70.3344 13.2304 70.3961 11.9135 70.7254 10.9876H70.8899C70.6843 13.1276 72.0422 14.465 73.8735 14.3826C75.3756 14.2798 76.6308 13.2509 76.6308 11.6255C76.6308 10.8024 76.3221 10.1851 75.8077 9.69137L71.8777 6.02869C71.034 5.26747 70.7665 4.27975 70.7665 3.47736C70.7665 1.74894 72.0217 0 74.3673 0C74.9229 0 75.5814 0.10284 76.1369 0.226339H76.96V0.4732V2.73664H76.7541C76.7541 1.41974 75.7254 0.617215 74.4497 0.617215C72.9271 0.617215 71.9188 1.74894 71.9188 2.9835C71.9188 3.53904 72.0834 4.27975 72.7419 4.89711Z'
              fill='black'
            />
            <path
              d='M68.0463 14.4867V14.6924H63.5607V14.4867H63.8075C64.5277 14.4867 65.1244 13.9105 65.1244 13.2109V1.79114C65.1244 1.07108 64.5277 0.494889 63.8075 0.494889H63.5607V0.289062H68.0463V0.494889H67.7788C67.0791 0.494889 66.4824 1.07108 66.4619 1.79114V13.2109C66.4824 13.9105 67.0586 14.4867 67.7788 14.4867H68.0463Z'
              fill='black'
            />
            <path
              d='M60.9966 11.3786H61.2024L60.009 14.7119H51.4904V14.5061H51.7374C52.4576 14.5061 53.0543 13.9094 53.0543 13.2098V1.79002C53.0543 1.09047 52.4576 0.514292 51.7374 0.514292H51.4904V0.308594H55.976V0.514292H55.7086C54.9884 0.514292 54.4122 1.09047 54.3917 1.79002V14.074H57.3547C59.5357 14.074 60.3587 12.9423 60.9966 11.3786Z'
              fill='black'
            />
            <path
              d='M49.1328 14.4867V14.6924H44.6472V14.4867H44.8941C45.6143 14.4867 46.211 13.9105 46.211 13.2109V1.79114C46.211 1.07108 45.6143 0.494889 44.8941 0.494889H44.6472V0.289062H49.1328V0.494889H48.8653C48.1656 0.494889 47.5689 1.07108 47.5484 1.79114V13.2109C47.5689 13.9105 48.1451 14.4867 48.8653 14.4867H49.1328Z'
              fill='black'
            />
            <path
              d='M32.4735 0.289062L36.5476 0.309712C39.4488 0.309712 41.0332 1.6883 41.0332 3.74591C41.0332 5.49485 39.9221 6.54424 38.7492 6.87343C40.9509 7.20276 42.2883 8.80768 42.2883 10.8446C42.2883 13.1698 40.56 14.713 37.4941 14.713H32.4735V14.5072H32.741C33.4406 14.5072 34.0373 13.9311 34.0579 13.2109V1.79114C34.0579 1.07108 33.4406 0.494889 32.741 0.494889H32.4735V0.289062ZM35.3954 13.9517H37.4118C39.5311 13.9723 40.7452 12.7789 40.7452 10.6801C40.7452 7.61429 38.0908 7.09977 36.0949 7.09977V6.89408C37.3501 6.9146 39.4899 6.54424 39.4899 3.88992C39.4899 2.03814 38.4405 0.968098 36.4859 0.968098H35.3954V13.9517Z'
              fill='black'
            />
            <path
              d='M23.7115 0C27.5106 0 30.1148 3.00402 30.1148 7.48961C30.1148 11.9958 27.5106 14.9794 23.7115 14.9794C19.9125 14.9794 17.3083 11.9958 17.3083 7.48961C17.3083 3.00402 19.9125 0 23.7115 0ZM23.7115 14.3826C26.7438 14.3826 28.7592 11.6255 28.7592 7.51026C28.7592 3.37437 26.7438 0.617215 23.7115 0.617215C20.6794 0.617215 18.6639 3.37437 18.6639 7.51026C18.6639 11.6255 20.6794 14.3826 23.7115 14.3826Z'
              fill='black'
            />
            <path
              d='M10.8543 0.288022H14.9495V0.493849H14.5718C13.9157 0.493849 13.379 1.04939 13.3392 1.72828V12.3662C13.3392 13.6831 13.538 15 13.538 15H13.3592L2.50483 3.02467V13.2716C2.52464 13.9506 3.06149 14.5062 3.7373 14.5062H4.09515V14.7118H0L0.0198093 14.5062H0.377662C1.05361 14.5062 1.59032 13.9506 1.61027 13.2509V2.55133C1.61027 1.15224 1.43127 0 1.43127 0H1.61027L12.4446 11.9547V1.74894C12.4248 1.0699 11.888 0.493849 11.2122 0.493849H10.8543V0.288022Z'
              fill='black'
            />
          </svg>
        </div>

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
              <KTSVG path='/media/svg/nobilis/bell.svg' />

              {notificationCount > 0 && (
                <div
                  className={`notification-badge ${
                    hasNewNotification ? 'notification-badge--new' : ''
                  }`}
                >
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
