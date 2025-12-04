import {FC} from 'react'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

const socials = [
  {icon: '/media/svg/nobilis/instagram.svg'},
  {icon: '/media/svg/nobilis/fb_01.svg'},
  {icon: '/media/svg/nobilis/x_01.svg'},
]

export const MemberActions: FC = () => {
  return (
    <div className='member-detail__actions'>
      <div className='member-detail__buttons'>
        <div className='member-detail__btn member-detail__btn--primary'>
          <div className='member-detail__btn-text'>request introduction</div>
          <svg
            width='14'
            height='4'
            viewBox='0 0 14 4'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M8.5 0.379883L12 3.38403H0' stroke='white' />
          </svg>
        </div>
        <div className='member-detail__btn member-detail__btn--secondary'>
          <div className='member-detail__btn-text'>book Expertise</div>
          <svg
            width='14'
            height='4'
            viewBox='0 0 14 4'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M8.5 0.379883L12 3.38403H0' stroke='white' />
          </svg>
        </div>
      </div>

      <div className='member-detail__socials'>
        {socials.map((item, index) => (
          <SVG key={index} src={toAbsoluteUrl(item.icon)} />
        ))}
      </div>
    </div>
  )
}