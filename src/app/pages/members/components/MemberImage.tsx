import {FC, useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

interface MemberImageProps {
  profilePicture?: string
  picFooter?: string
  loading: boolean
}

export const MemberImage: FC<MemberImageProps> = ({profilePicture, picFooter, loading}) => {
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
    <div className='member-detail__right'>
      <div className='member-detail__bg-block' />
      {isImageLoading && <div className='member-detail__image-skeleton' />}
      <img
        className={isImageLoading ? 'member-detail__image--hidden' : 'member-detail__image'}
        src={profileImage}
        alt='profile'
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      <div className='member-detail__watermark'>
        <svg
          width='207'
          height='217'
          viewBox='0 0 207 217'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g opacity='0.4'>
            <path
              d='M107.328 161.764C108.641 169.655 112.843 187.014 119.145 193.327C117.843 197.241 112.921 207.365 103.614 216.771V217C103.576 216.962 103.54 216.923 103.502 216.885C103.464 216.923 103.427 216.962 103.39 217V216.771C94.0824 207.365 89.1608 197.241 87.8583 193.327C94.1607 187.014 98.3617 169.655 99.6747 161.764H107.328ZM64.2235 153.873C61.5975 159.134 58.7089 170.443 68.162 173.6C77.6158 176.756 82.6058 167.024 83.9188 161.764H91.7968C90.4837 174.915 83.131 198.851 64.2235 189.382C45.3159 179.913 56.3453 161.764 64.2235 153.873ZM142.78 153.873C150.658 161.764 161.687 179.913 142.78 189.382C123.873 198.851 116.519 174.915 115.206 161.764H123.085C124.398 167.024 129.387 176.756 138.841 173.6C148.294 170.443 145.406 159.134 142.78 153.873ZM127.01 140.464C131.367 140.464 134.9 143.998 134.9 148.355C134.9 152.713 131.367 156.246 127.01 156.246H79.7655C75.4076 156.246 71.875 152.713 71.8749 148.355C71.8749 143.997 75.4075 140.464 79.7655 140.464H127.01ZM1.19128 110.481C10.6967 74.9672 83.9189 82.8634 95.7362 134.154H79.9657C74.7136 127.579 59.4827 114.427 40.5751 114.427C16.9409 114.427 20.8799 146.282 48.453 138.1C31.3856 145.99 -7.25417 142.036 1.19128 110.481ZM111.267 134.154C123.085 82.8634 196.307 74.9672 205.812 110.481C214.258 142.036 175.617 145.99 158.55 138.1C186.123 146.283 190.062 114.427 166.428 114.427C147.52 114.427 132.289 127.579 127.037 134.154H111.267ZM103.614 0.37793C111.578 13.7373 127.841 44.3677 130.963 63.127C134.902 86.7997 123.084 90.7457 115.206 102.582C109.225 111.568 105.138 126.003 103.614 133.072V134.146C103.58 133.972 103.54 133.794 103.502 133.608C103.463 133.794 103.424 133.972 103.39 134.146V133.072C101.866 126.003 97.778 111.568 91.7968 102.582C83.9186 90.7457 72.1018 86.7997 76.0409 63.127C79.1625 44.3676 95.4256 13.7372 103.39 0.37793V0C103.427 0.0623555 103.464 0.12532 103.502 0.188477C103.54 0.12532 103.577 0.0623556 103.614 0V0.37793Z'
              fill='#E9E9E9'
            />
          </g>
        </svg>
      </div>

      <div className='member-detail__quote'>
        <div className='member-detail__quote-text'>{picFooter}</div>
      </div>
    </div>
  )
}
