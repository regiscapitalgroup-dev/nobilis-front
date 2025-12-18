// app/pages/profileMembers/components/ProfileMemberImage.tsx
import {FC, useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

interface ProfileMemberImageProps {
  profilePicture?: string
  picFooter?: string
  loading: boolean
}

export const ProfileMemberImage: FC<ProfileMemberImageProps> = ({
  profilePicture,
  picFooter,
  loading,
}) => {
  const [profileImage, setProfileImage] = useState<string>(toAbsoluteUrl(''))
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true)

  const handleImageLoad = () => {
    setIsImageLoading(false)
  }

  const handleImageError = () => {
    setIsImageLoading(false)
  }

  useEffect(() => {
    if (profilePicture && typeof profilePicture === 'string' && profilePicture.trim() !== '') {
      setIsImageLoading(true)
      setProfileImage(`${profilePicture}?t=${Date.now()}`)
    }
  }, [profilePicture])

  return (
    <div className='nb-pm-image'>
      <div className='nb-pm-image__background' />

      {isImageLoading && <div className='nb-pm-image__skeleton' />}

      <img
        className={isImageLoading ? 'nb-pm-image__photo--hidden' : 'nb-pm-image__photo'}
        src={profileImage}
        alt='profile'
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      <div className='nb-pm-image__edit-btn'>
        <div className='nb-pm-image__edit-btn-text'>continue edit profile</div>
        <img
          src='/media/svg/nobilis/vector1.svg'
          alt=''
          className='nb-btn-icon nb-btn-icon--white'
        />
      </div>

      {picFooter && (
        <div className='nb-pm-image__quote'>
          <div className='nb-pm-image__quote-text'>{picFooter}</div>
        </div>
      )}
    </div>
  )
}
