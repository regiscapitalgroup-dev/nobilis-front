// LandingHeader.tsx
import React, {FC} from 'react'
import {useHistory} from 'react-router-dom'
import {KTSVG} from '../../../../../_metronic/helpers'

interface LandingHeaderProps {
  onMenuClick?: () => void
}

export const LandingHeader: FC<LandingHeaderProps> = ({onMenuClick}) => {
  const history = useHistory()

  const handleLogin = () => {
    history.push('/auth/login')
  }

  const handleRegister = () => {
    history.push('/auth/registration')
  }

  return (
    <header className='landing-header'>
      <div className='landing-header__menu-container'>
        <button
          className='landing-header__hamburger'
          onClick={onMenuClick}
          aria-label='Toggle menu'
        >
          <KTSVG path='/media/svg/nobilis/menu_header.svg' className='svg-icon-2x svg-icon-info' />
        </button>
      </div>

      <div className='landing-header__actions'>
        <button
          className='landing-header__btn landing-header__btn--secondary'
          onClick={handleLogin}
        >
          login
        </button>

        <button
          className='landing-header__btn landing-header__btn--primary'
          onClick={handleRegister}
        >
          Request Invitation
          <img
            src='/media/svg/nobilis/vector1.svg'
            alt=''
            className='nb-btn-icon nb-btn-icon--white'
          />
        </button>
      </div>

      <div className='landing-header__logo'>NOBILIS</div>
    </header>
  )
}
