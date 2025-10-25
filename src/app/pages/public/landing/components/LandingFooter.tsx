// LandingFooter.tsx
import React, {FC, ReactNode} from 'react'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'

interface LandingFooterProps {
  children?: ReactNode // El formulario se pasa como children
}

export const LandingFooter: FC<LandingFooterProps> = ({children}) => {
  return (
    <footer className='landing-footer'>
      <div className='landing-footer__content'>
        {/* Sección del formulario - renderiza lo que se pase como children */}
        {children && (
          <div className='landing-footer__contact-section'>
            {children}
          </div>
        )}

        <div className='landing-footer__bottom'>
          <img
            src={toAbsoluteUrl('/media/nobilis_footer.png')}
            alt='Nobilis Logo'
            className='landing-footer__logo'
          />

          <nav className='landing-footer__nav'>
            <div className='landing-footer__nav-links'>
              <a href='#home' className='landing-footer__nav-link'>
                Home
              </a>
              <a href='#our-story' className='landing-footer__nav-link'>
                Our Story
              </a>
              <a href='#partner' className='landing-footer__nav-link'>
                Partner
              </a>
              <a href='#contact' className='landing-footer__nav-link'>
                Contact
              </a>
            </div>
          </nav>

          <div className='landing-footer__legal'>
            <span className='landing-footer__copyright'>
              © {new Date().getFullYear()} Nobilis. All rights reserved.
            </span>
            <span className='landing-footer__divider'></span>
            <a href='#terms' className='landing-footer__legal-link'>
              Terms & Conditions
            </a>
            <span className='landing-footer__divider'></span>
            <a href='#privacy' className='landing-footer__legal-link'>
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}