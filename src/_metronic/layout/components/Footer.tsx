/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState} from 'react'
import {useLayout} from '../core'
import {KTSVG} from '../../helpers'
import {Link} from 'react-router-dom'

interface FooterProps {
  theme?: 'dark' | 'light'
  animated?: boolean
}

const Footer: FC<FooterProps> = ({theme = 'dark', animated = false}) => {
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
  const wrapperClasses = ['customFooterWrapper', getThemeClass(), animated ? 'animate' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapperClasses} id='kt_footer'>
      {/* begin::Container */}
      <div className='customFooterContainer'>
        {/* begin::Left Links */}
        <div className='customFooterLeftSection'>
          <a href='/help-center' className='customFooterLink' aria-label='Go to Help Center'>
            Help Center
          </a>
          <a href='/contact-support' className='customFooterLink' aria-label='Contact Support Team'>
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
            aria-label='Follow us on Instagram'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clip-path='url(#clip0_40000012_262)'>
                <path
                  d='M14.1667 1.66602H5.83341C3.53223 1.66602 1.66675 3.5315 1.66675 5.83268V14.166C1.66675 16.4672 3.53223 18.3327 5.83341 18.3327H14.1667C16.4679 18.3327 18.3334 16.4672 18.3334 14.166V5.83268C18.3334 3.5315 16.4679 1.66602 14.1667 1.66602Z'
                  stroke='white'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M13.3333 9.47525C13.4361 10.1688 13.3176 10.8771 12.9947 11.4994C12.6718 12.1218 12.1609 12.6264 11.5346 12.9416C10.9083 13.2569 10.1986 13.3666 9.50641 13.2552C8.81419 13.1438 8.17472 12.817 7.67895 12.3212C7.18318 11.8255 6.85636 11.186 6.74497 10.4938C6.63359 9.80154 6.74331 9.09183 7.05852 8.46556C7.37374 7.8393 7.87841 7.32837 8.50074 7.00545C9.12307 6.68254 9.83138 6.56407 10.5249 6.66692C11.2324 6.77182 11.8873 7.10147 12.393 7.60717C12.8987 8.11288 13.2283 8.76782 13.3333 9.47525Z'
                  stroke='white'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M14.5833 5.41602H14.5916'
                  stroke='white'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </g>
              <defs>
                <clipPath id='clip0_40000012_262'>
                  <rect width='20' height='20' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </a>

          {/* Facebook Icon */}
          <a
            href='https://facebook.com/nobilis'
            className='customSocialIcon'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Follow us on Facebook'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M14.9999 1.66602H12.4999C11.3949 1.66602 10.335 2.105 9.55364 2.8864C8.77224 3.66781 8.33325 4.72761 8.33325 5.83268V8.33268H5.83325V11.666H8.33325V18.3327H11.6666V11.666H14.1666L14.9999 8.33268H11.6666V5.83268C11.6666 5.61167 11.7544 5.39971 11.9107 5.24343C12.0669 5.08715 12.2789 4.99935 12.4999 4.99935H14.9999V1.66602Z'
                fill='white'
              />
            </svg>
          </a>

          {/* Twitter/X Icon */}
          <a
            href='https://twitter.com/nobilis'
            className='customSocialIcon'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Follow us on Twitter'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M17.58 17.3327L11.7167 8.78468L11.7267 8.79268L17.0133 2.66602H15.2467L10.94 7.65268L7.52 2.66602H2.88667L8.36067 10.6467L8.36 10.646L2.58667 17.3327H4.35334L9.14134 11.7847L12.9467 17.3327H17.58ZM6.82 3.99935L15.0467 15.9993H13.6467L5.41334 3.99935H6.82Z'
                fill='white'
              />
            </svg>
          </a>
        </div>
        {/* end::Social Icons */}

        {/* begin::Right Links */}
        <div className='customFooterRightSection'>
          <Link
            to='/terms-conditions'
            className='customFooterLink'
            aria-label='Read Terms and Conditions'
          >
            Terms and conditions
          </Link>
          <Link to='/privacy-policy' className='customFooterLink' aria-label='Read Privacy Policy'>
            Privacy Policy
          </Link>
        </div>
        {/* end::Right Links */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Footer}
