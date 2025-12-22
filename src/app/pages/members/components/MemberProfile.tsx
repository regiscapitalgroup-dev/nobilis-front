import {FC} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'

interface MemberProfileProps {
  firstName?: string
  surname?: string
  bioPresentation?: string
  city?: string
  aliasTitle?: string
}

export const MemberProfile: FC<MemberProfileProps> = ({
  firstName,
  surname,
  bioPresentation,
  city,
  aliasTitle,
}) => {
  return (
    <div className='member-detail__profile'>
      <div className='member-detail__name-wrapper'>
        <div className='member-detail__name'>{`Your ${aliasTitle} ${firstName} ${surname}`}</div>
      </div>
      <svg
        width='413'
        height='1'
        viewBox='0 0 413 1'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M413 0.5L4.76837e-06 0.499982' stroke='#E9E9E9' />
      </svg>

      <div className='member-detail__description'>{bioPresentation}</div>
      <div className='member-detail__location'>
        <KTSVG path='/media/svg/nobilis/location_mark.svg' />
        <div className='member-detail__location-text'>{city}</div>
      </div>
    </div>
  )
}
