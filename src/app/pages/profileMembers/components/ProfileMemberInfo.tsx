import {FC} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import {ProfileMemberBadges} from './ProfileMemberBadges'
import {ProfileMemberLanguages} from './ProfileMemberLanguages'
import {ProfileMemberIntroductions} from './ProfileMemberIntroductions'
import {ProfileMemberSocials} from './ProfileMemberSocials'

interface ProfileMemberInfoProps {
  user: string
  expertise: any[]
  firstName: string
  surname: string
  aliasTitle: string
  bioPresentation: string
  city: string
  languages: string[]
  introduction: any[]
  socialMediaProfiles: any[]
  subscription: any
}

export const ProfileMemberInfo: FC<ProfileMemberInfoProps> = ({
  user,
  expertise,
  firstName,
  surname,
  aliasTitle,
  bioPresentation,
  city,
  languages,
  introduction,
  socialMediaProfiles,
  subscription,
}) => {
  const hasExpertise = expertise.length > 0

  return (
    <div className='nb-pm-info'>
      <div className='nb-pm-info__id'>#{user}</div>

      <div className='nb-pm-info__info-section'>
        <ProfileMemberBadges hasExpertise={hasExpertise} subscription={subscription} />

        <div className='nb-pm-profile'>
          <div className='nb-pm-name-wrapper'>
            <div className='nb-pm-name'>{ `Your ${aliasTitle} ${firstName} ${surname}`}</div>
          </div>
          <div className='nb-pm-description'>{bioPresentation}</div>

          {city && (
            <div className='nb-pm-location'>
              <KTSVG path='/media/svg/nobilis/location_mark.svg' />
              <span className='nb-pm-location-text'>{city}</span>
            </div>
          )}
        </div>
      </div>

      {languages && languages.length > 0 && <ProfileMemberLanguages languages={languages} />}

      {introduction && introduction.length > 0 && (
        <ProfileMemberIntroductions introduction={introduction} />
      )}

      {socialMediaProfiles && socialMediaProfiles.length > 0 && (
        <ProfileMemberSocials socialMediaProfiles={socialMediaProfiles} />
      )}
    </div>
  )
}