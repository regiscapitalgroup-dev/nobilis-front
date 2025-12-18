import {FC} from 'react'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

interface ProfileMemberSocialsProps {
  socialMediaProfiles: any[]
}

const socials = [
  {icon: '/media/svg/nobilis/instagram.svg'},
  {icon: '/media/svg/nobilis/fb_01.svg'},
  {icon: '/media/svg/nobilis/x_01.svg'},
]

export const ProfileMemberSocials: FC<ProfileMemberSocialsProps> = ({socialMediaProfiles}) => {
  return (
    <div className='nb-pm-socials'>
      {socials.map((item, index) => (
        <div key={index} className='nb-pm-socials-icon'>
          <SVG src={toAbsoluteUrl(item.icon)} />
        </div>
      ))}
    </div>
  )
}
