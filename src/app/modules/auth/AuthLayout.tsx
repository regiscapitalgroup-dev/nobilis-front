import React from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import SVG from 'react-inlinesvg'

interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({children}) => {
  return (
    <div className='auth-shell d-flex flex-column flex-column-fluid'>
      <div aria-hidden='true' className='nb-hero'>
        <img
          className='nb-hero__img'
          src={toAbsoluteUrl('/media/login-room.png')}
          alt=''
          loading='eager'
        />
      </div>

      <div
        className='d-flex flex-center flex-column flex-column-fluid'
        style={{position: 'relative', zIndex: 1}}
      >
        <div style={{padding: '0px 0px 48px 0px'}}>
          <SVG src='/media/svg/nobilis/logo-nb.svg' />
        </div>
        {children}
      </div>
    </div>
  )
}
