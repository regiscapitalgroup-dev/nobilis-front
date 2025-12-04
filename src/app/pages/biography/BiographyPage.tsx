import {FC, useEffect, useRef, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {BiographyTabs} from './components/BiographyTabs'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {UserModel} from '../../modules/auth/models/UserModel'
import {useUserProfileContext} from '../../context/UserProfileContext'
import {hasPermission} from '../../utils/permissions'
import {Permission} from '../../constants/roles'
import {useHistory} from 'react-router-dom'
import {updateProfileImg} from '../../services/profileService'
import SVG from 'react-inlinesvg'
import {showErrorAlert} from '../../helpers/alert'

const socials = [
  {icon: '/media/svg/nobilis/instagram.svg'},
  {icon: '/media/svg/nobilis/fb_01.svg'},
  {icon: '/media/svg/nobilis/x_01.svg'},
]

const BiographyPage: FC = () => {
  const {data, refetch, searchParams, loading} = useUserProfileContext()
  const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const canEditImage = hasPermission(user, Permission.EDIT_PROFILE_IMAGE)
  const fullName = `${user.firstName} ${user.lastName}`
  const [isMember, setIsMember] = useState<boolean>(false)
  const [isExpert, setIsExpert] = useState<boolean>(false)
  const [profileImage, setProfileImage] = useState<string>(toAbsoluteUrl(''))
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const navigate = useHistory()
  const [module, setModule] = useState<string>('')
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true)
  const searchableUser = !!searchParams.userSelected
  useEffect(() => {
    if (data?.subscription) setIsMember(true)
    if (data?.expertise && data.expertise.length > 0) setIsExpert(true)
  }, [data])

  useEffect(() => {
    if (
      data?.profilePicture &&
      typeof data.profilePicture === 'string' &&
      data.profilePicture.trim() !== ''
    ) {
      setIsImageLoading(true)
      setProfileImage(`${data.profilePicture}?t=${Date.now()}`)
    }
  }, [data?.profilePicture])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageLoad = () => {
    setIsImageLoading(false)
  }

  const handleImageError = () => {
    setIsImageLoading(false)
  }

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const previousImage = profileImage

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      setProfileImage(imageUrl)
    }
    reader.readAsDataURL(file)

    setIsUploading(true)

    try {
      await updateProfileImg(file)
      await refetch()
    } catch (error: any) {
      console.error('Error to upload:', error)

      const statusCode = error?.response?.status || 500

      showErrorAlert({
        title: 'Unable to update profile photo',
        message: "We couldn't save your changes. Please review your information and try again.",
        errorCode: `PROFILE_IMG${statusCode}`,
      })

      setProfileImage(previousImage)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleModule = async (module: string) => {
    setModule(module)
  }

  return (
    <>
      <div className='biography'>
        <div className='biography__watermark'>
          <img src={toAbsoluteUrl('/media/svg/nobilis/mark_bg.svg')} alt='watermark' />
        </div>

        {/* LEFT */}
        <div className='biography__left'>
          {/* Badges */}
          <div className='biography__badges'>
            {isMember ? (
              <div className='badge'>
                <svg
                  width='14'
                  height='15'
                  viewBox='0 0 14 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M7.2583 11.1816C7.34709 11.727 7.63193 12.9268 8.05811 13.3633C7.97002 13.6338 7.63662 14.3333 7.00732 14.9834V15C7.00459 14.9972 7.00223 14.994 6.99951 14.9912C6.99695 14.9939 6.99525 14.9974 6.99268 15V14.9834C6.36335 14.3333 6.02998 13.6338 5.94189 13.3633C6.36805 12.9268 6.65193 11.727 6.74072 11.1816H7.2583ZM4.34326 10.6367C4.1657 11.0005 3.97071 11.7819 4.60986 12C5.24922 12.2181 5.58649 11.5453 5.67529 11.1816H6.2085C6.11969 12.0907 5.62204 13.7454 4.34326 13.0908C3.06493 12.4364 3.81048 11.1823 4.34326 10.6367ZM9.65674 10.6367C10.1895 11.1823 10.9349 12.4364 9.65674 13.0908C8.37798 13.7453 7.88031 12.0907 7.7915 11.1816H8.32471C8.41351 11.5453 8.75076 12.2182 9.39014 12C10.0292 11.7819 9.83429 11.0005 9.65674 10.6367ZM8.57764 9.70996C8.87885 9.70996 9.12349 9.95368 9.12354 10.2549C9.12354 10.5561 8.87888 10.8008 8.57764 10.8008H5.40674C5.10549 10.8008 4.86084 10.5561 4.86084 10.2549C4.86089 9.95368 5.10552 9.70996 5.40674 9.70996H8.57764ZM0.0805664 7.63672C0.72373 5.18212 5.67589 5.72812 6.4751 9.27344H5.40771C5.0524 8.81885 4.0223 7.91016 2.74365 7.91016C1.14562 7.91051 1.41214 10.1115 3.27686 9.5459C2.12254 10.0913 -0.490636 9.81794 0.0805664 7.63672ZM7.5249 9.27344C8.32411 5.7281 13.2763 5.1821 13.9194 7.63672C14.4906 9.81794 11.8775 10.0913 10.7231 9.5459C12.5878 10.1114 12.8543 7.91059 11.2563 7.91016C9.97758 7.91017 8.94652 8.8189 8.59131 9.27344H7.5249ZM7.00732 0.0253906C7.54576 0.948409 8.64561 3.06622 8.85693 4.36328C9.12334 5.99963 8.32433 6.27265 7.7915 7.09082C7.38419 7.71629 7.10867 8.7241 7.00732 9.20898V9.27246C7.00527 9.26196 7.00177 9.25139 6.99951 9.24023C6.99726 9.25132 6.99472 9.26201 6.99268 9.27246V9.20898C6.89133 8.72411 6.61581 7.71629 6.2085 7.09082C5.67567 6.27265 4.87666 5.99963 5.14307 4.36328C5.3544 3.0662 6.45425 0.948386 6.99268 0.0253906V0C6.99509 0.00411618 6.99708 0.00852819 6.99951 0.0126953C7.00203 0.00838505 7.00483 0.004256 7.00732 0V0.0253906Z'
                    fill='#460107'
                  />
                </svg>
                Founding Member
              </div>
            ) : null}
            {isExpert ? (
              <div className='badge'>
                <KTSVG path='/media/svg/nobilis/expertise.svg' className='color-expert-icon ' />
                Expert
              </div>
            ) : null}
          </div>

          {/* Info */}
          <div className='biography__info'>
            <div className='biography__info-name'> {`Your Highness ${fullName}`}</div>
            <div className='biography__divider'></div>
            <div className='biography__info-desc'>
              <div className='biography__info-desc'>{data?.bioPresentation}</div>
            </div>

            <div className='biography__info-location'>
              <span>
                <KTSVG path='/media/svg/nobilis/location_mark.svg' />
                {data?.city}
              </span>
            </div>
          </div>

          {/* Languages */}
          <div className='biography__languages'>
            <div className='biography__languages-title'>Language Spoken</div>
            <div className='biography__languages-list'>
              {data?.languages &&
                data.languages.map((item, index) => {
                  return (
                    <div key={index} className='lang'>
                      {item}
                    </div>
                  )
                })}
            </div>
          </div>
          <div className='biography__languages'>
            <div className='biography__languages-title'>My Introductions</div>
            <div className='biography__languages-list'>
              {data?.introduction &&
                data.introduction.map((item, index) => {
                  return (
                    <div key={index} className='lang'>
                      {item}
                    </div>
                  )
                })}
            </div>
          </div>

          {/* Actions */}
          <div className='biography__actions'>
            <div className='biography__actions-socials'>
              {socials.map((item, index) => (
                <SVG key={index} src={toAbsoluteUrl(item.icon)} />
              ))}
            </div>
          </div>
        </div>
        <div className='biography__right'>
          <div className='bg-block'></div>

          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            style={{display: 'none'}}
            onChange={handleImageChange}
          />

          {isImageLoading && <div className='biography__image-skeleton' />}
          <img
            src={profileImage}
            alt='profile'
            className={isImageLoading ? 'biography__image--hidden' : ''}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          {canEditImage && !searchableUser && (
            <>
              <a
                className='biography__edit-btn cursor-pointer'
                onClick={() => fileInputRef.current?.click()}
              >
                <KTSVG path='/media/svg/nobilis/edit-img.svg' />
              </a>
            </>
          )}

          <div className='quote'>
            <span>{data?.picFooter}</span>
          </div>
          {canEditImage && !searchableUser && (
            <div className='biography__edit-container'>
              <button
                className='biography__edit-link'
                onClick={() => navigate.push('/admin/overview/profile')}
                type='button'
              >
                <span>EDIT</span>
                <KTSVG path='/media/svg/nobilis/vector1.svg' />
              </button>
            </div>
          )}
        </div>
      </div>

      <BiographyTabs onTabChange={handleModule} searchableUser={searchableUser} />
    </>
  )
}

export {BiographyPage}
