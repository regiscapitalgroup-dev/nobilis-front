import React, {FC, ReactNode} from 'react'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'

interface LandingFooterProps {
  children?: ReactNode 
}

export const LandingFooter: FC<LandingFooterProps> = ({children}) => {
  return (
    <footer className='landing-footer'>
      <div className='landing-footer__content'>
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
              <a href='/' className='landing-footer__nav-link'>
                Home
              </a>
              <a href='/values' className='landing-footer__nav-link'>
                Values
              </a>
              <a href='/partners' className='landing-footer__nav-link'>
                Partner
              </a>
              <a href='#contact' className='landing-footer__nav-link'>
                Contact us
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