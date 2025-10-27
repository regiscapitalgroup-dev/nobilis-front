import React, {FC, useState, useEffect} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useHistory} from 'react-router-dom'

interface LandingMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const LandingMenu: FC<LandingMenuProps> = ({isOpen, onClose}) => {
  const navigate = useHistory()
  const [isClosing, setIsClosing] = useState(false)
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setIsClosing(false)
    } else if (isVisible) {
      setIsClosing(true)
      const timer = setTimeout(() => setIsVisible(false), 300) // igual a la duración de la animación
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const menuItems = [
    {label: 'HOME', id: 'home', path: '/'},
    {label: 'VALUES', id: 'values', path: '/values'},
    {label: 'PARTNERS', id: 'partners', path: '/partners'},
    {label: 'CONTACT US', id: 'contact', path: '/#contact'},
  ]

  const handleMenuClick = (path: string) => {
    navigate.push(path)
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div className={`landing-menu ${isClosing ? 'landing-menu--closing' : ''}`}>
      <div className='landing-menu__overlay' onClick={onClose} />
      <div className='landing-menu__content'>
        <div className='landing-menu__header' onClick={onClose}>
          <KTSVG path='/media/svg/nobilis/X01.svg' className='svg-icon-3x cursor-pointer' />
        </div>

        <nav className='landing-menu__nav'>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className='landing-menu__item'
              onClick={() => handleMenuClick(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
