import Item from 'antd/es/list/Item'
import React, {FC, useState, useEffect, RefObject} from 'react'
import {useHistory} from 'react-router-dom'

interface LandingMenuProps {
  isOpen: boolean
  onClose: () => void
  footerRef?: RefObject<HTMLDivElement>
}

export const LandingMenu: FC<LandingMenuProps> = ({isOpen, onClose, footerRef}) => {
  const navigate = useHistory()
  const [isClosing, setIsClosing] = useState(false)
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setIsClosing(false)
    } else if (isVisible) {
      setIsClosing(true)
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const menuItems = [
    {label: 'HOME', id: 'home', path: '/'},
    {label: 'VALUES', id: 'values', path: '/values'},
    {label: 'PARTNERS', id: 'partners', path: '/partners'},
    {label: 'CONTACT US', id: 'contact', path: ''},
  ]

  const handleMenuClick = (path: string) => {
    navigate.push(path)
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 300)
  }

  const handleScroll = (id: string) => {
    onClose()
    setTimeout(() => {
      footerRef?.current?.scrollIntoView({behavior: 'smooth'})
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div className={`landing-menu ${isClosing ? 'landing-menu--closing' : ''}`}>
      <div className='landing-menu__overlay' onClick={onClose} />
      <div className='landing-menu__content'>
        <div className='landing-menu__header' onClick={onClose}>
          <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M25.7071 24.2931C25.8 24.386 25.8737 24.4963 25.924 24.6177C25.9743 24.7391 26.0001 24.8692 26.0001 25.0006C26.0001 25.132 25.9743 25.2621 25.924 25.3835C25.8737 25.5048 25.8 25.6151 25.7071 25.7081C25.6142 25.801 25.5039 25.8747 25.3825 25.9249C25.2611 25.9752 25.131 26.0011 24.9996 26.0011C24.8682 26.0011 24.7381 25.9752 24.6167 25.9249C24.4953 25.8747 24.385 25.801 24.2921 25.7081L15.9996 17.4143L7.70708 25.7081C7.51944 25.8957 7.26494 26.0011 6.99958 26.0011C6.73422 26.0011 6.47972 25.8957 6.29208 25.7081C6.10444 25.5204 5.99902 25.2659 5.99902 25.0006C5.99902 24.7352 6.10444 24.4807 6.29208 24.2931L14.5858 16.0006L6.29208 7.70806C6.10444 7.52042 5.99902 7.26592 5.99902 7.00056C5.99902 6.73519 6.10444 6.4807 6.29208 6.29306C6.47972 6.10542 6.73422 6 6.99958 6C7.26494 6 7.51944 6.10542 7.70708 6.29306L15.9996 14.5868L24.2921 6.29306C24.4797 6.10542 24.7342 6 24.9996 6C25.2649 6 25.5194 6.10542 25.7071 6.29306C25.8947 6.4807 26.0001 6.73519 26.0001 7.00056C26.0001 7.26592 25.8947 7.52042 25.7071 7.70806L17.4133 16.0006L25.7071 24.2931Z'
              fill='white'
            />
          </svg>
        </div>

        <nav className='landing-menu__nav'>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className='landing-menu__item'
              onClick={() => {
                if (item.id == 'contact') {
                  handleScroll(item.id)
                } else {
                  handleMenuClick(item.path)
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
