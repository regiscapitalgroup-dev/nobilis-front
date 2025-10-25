import {FC, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useWebSocketContext} from '../../../../app/context/WebSocketContext'
import {useUserNotifications} from '../../../../app/hooks/notifications/useNotifications'
import {readNotification} from '../../../../app/services/notificationService'

interface NotificationItem {
  id: number
  verb: string
  description?: string
  timestamp?: string
  isRead: boolean
  type?: string
}

interface HeaderNotificationsMenuProps {
  onNotificationRead?: () => void
}

const HeaderNotificationsMenu: FC<HeaderNotificationsMenuProps> = ({onNotificationRead}) => {
  const {subscribe, isConnected} = useWebSocketContext()
  const {data} = useUserNotifications()
  const navigate = useHistory()
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setNotifications(data)
    }
  }, [data])

  const pendingRequests = notifications.filter((n) => !n.isRead).length

  useEffect(() => {
    if (!isConnected) {
      console.log('WebSocket no conectado')
      return
    }

    console.log('Suscribiéndose a notificaciones...')

    const unsubscribe = subscribe('notification', (data) => {
      console.log('Nueva notificación recibida:', data)

      const newNotification: NotificationItem = {
        id: data.id || Date.now(),
        verb: data.verb || 'New notification',
        description: data.description || data.message || '',
        timestamp: data.timestamp || 'Now',
        isRead: false,
        type: data.type,
      }

      setNotifications((prev) => [newNotification, ...prev])
    })

    return () => {
      console.log('Desuscribiéndose de notificaciones')
      unsubscribe()
    }
  }, [subscribe, isConnected])

  const handleMarkAsRead = async (notificationId: number) => {
    const notification = notifications.find((n) => n.id === notificationId)

    if (notification && !notification.isRead) {
      setNotifications((prev) =>
        prev.map((notif) => (notif.id === notificationId ? {...notif, isRead: true} : notif))
      )

      if (onNotificationRead) {
        onNotificationRead()
      }

      navigate.push('/waitinglist')

      await readNotification(notificationId)
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className='menu menu-sub menu-sub-dropdown notifications-menu' data-kt-menu='true'>
      {/* REQUESTS SECTION */}
      <div className='notifications-menu__section'>
        <div className='notifications-menu__title'>REQUESTS</div>

        <div className='notifications-menu__card'>
          <div className='notifications-menu__badge'>
            <div className='notifications-menu__badge-number'>{pendingRequests}</div>
          </div>
          <div className='notifications-menu__card-text'>Pending Experiences Requests</div>
        </div>
      </div>

      {/* NOTIFICATIONS LIST */}
      <div className='notifications-menu__section'>
        <div className='notifications-menu__list'>
          {notifications.length === 0 ? (
            <div className='notifications-menu__empty'>There are no notifications</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notifications-menu__item ${
                  !notification.isRead ? 'notifications-menu__item--unread' : ''
                }`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className='notifications-menu__item-title'>{notification.verb}</div>
                {notification.description && (
                  <div className='notifications-menu__item-message'>{notification.description}</div>
                )}
                {notification.timestamp && (
                  <div className='notifications-menu__item-time'>{notification.timestamp}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* VIEW ALL LINK */}
      <div className='notifications-menu__view-all'>
        <Link
          to='/biography'
          onClick={() => {
            alert('comming soon')
          }}
        >
          view all notifications
        </Link>
      </div>
    </div>
  )
}

export {HeaderNotificationsMenu}
