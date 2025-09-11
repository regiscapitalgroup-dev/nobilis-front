/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState} from 'react'
import {useLayout} from '../core'

interface FooterProps {
  theme?: 'dark' | 'light'
  animated?: boolean
}

const Footer: FC<FooterProps> = ({ 
  theme = 'dark', 
  animated = false 
}) => {
  const {classes} = useLayout()
  const [isVisible, setIsVisible] = useState(true)

  // Clase condicional para temas
  const getThemeClass = () => {
    switch (theme) {
      case 'light':
        return 'lightTheme'
      case 'dark':
      default:
        return 'darkTheme'
    }
  }

  // Clases dinámicas
  const wrapperClasses = [
    'customFooterWrapper',
    getThemeClass(),
    animated ? 'animate' : ''
  ].filter(Boolean).join(' ')

  return (
    <div 
      className={wrapperClasses}
      id='kt_footer'
    >
      {/* begin::Container */}
      <div className='customFooterContainer'>
        {/* begin::Left Links */}
        <div className='customFooterLeftSection'>
          <a 
            href='/help-center' 
            className='customFooterLink'
            aria-label="Go to Help Center"
          >
            Help Center
          </a>
          <a 
            href='/contact-support' 
            className='customFooterLink'
            aria-label="Contact Support Team"
          >
            Contact Support
          </a>
        </div>
        {/* end::Left Links */}

        {/* begin::Social Icons */}
        <div className='customFooterSocialSection'>
          {/* Instagram Icon */}
          <a 
            href='https://instagram.com/nobilis' 
            className='customSocialIcon'
            target='_blank'
            rel='noopener noreferrer'
            aria-label="Follow us on Instagram"
          >
            <div className='customInstagramIcon'></div>
          </a>
          
          {/* Facebook Icon */}
          <a 
            href='https://facebook.com/nobilis' 
            className='customSocialIcon'
            target='_blank'
            rel='noopener noreferrer'
            aria-label="Follow us on Facebook"
          >
            <div className='customFacebookIcon'></div>
          </a>
          
          {/* Twitter/X Icon */}
          <a 
            href='https://twitter.com/nobilis' 
            className='customSocialIcon'
            target='_blank'
            rel='noopener noreferrer'
            aria-label="Follow us on Twitter"
          >
            <div className='customTwitterIcon'></div>
          </a>
        </div>
        {/* end::Social Icons */}

        {/* begin::Right Links */}
        <div className='customFooterRightSection'>
          <a 
            href='/terms-conditions' 
            className='customFooterLink'
            aria-label="Read Terms and Conditions"
          >
            Terms and conditions
          </a>
          <a 
            href='/privacy-policy' 
            className='customFooterLink'
            aria-label="Read Privacy Policy"
          >
            Privacy Policy
          </a>
        </div>
        {/* end::Right Links */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Footer}