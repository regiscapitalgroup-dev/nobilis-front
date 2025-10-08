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

const socials = [
  {icon: '/media/svg/nobilis/instagram.svg'},
  {icon: '/media/svg/nobilis/fb.svg'},
  {icon: '/media/svg/nobilis/x.svg'},
]

const BiographyPage: FC = () => {
  const {data} = useUserProfileContext()
  const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const canEditImage = hasPermission(user, Permission.EDIT_PROFILE_IMAGE)
  const fullName = `${user.firstName} ${user.lastName}`
  const [isMember, setIsMember] = useState<boolean>(false)
  const [isExpert, setIsExpert] = useState<boolean>(false)
  const [profileImage, setProfileImage] = useState<string>(toAbsoluteUrl(''))
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const navigate = useHistory()
  const [module, setModule] = useState<string>('')

  useEffect(() => {
    if (data?.subscription) setIsMember(true)

    if (data?.expertise) setIsExpert(true)
  }, [data])

  useEffect(() => {
    if (data?.profilePicture && typeof data.profilePicture === 'string' && data.profilePicture.trim() !== '') {
      setProfileImage(data.profilePicture)
    } else {
      setProfileImage(toAbsoluteUrl('/media/people3.png'))
    }
  }, [data?.profilePicture])

  const fileInputRef = useRef<HTMLInputElement>(null)

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
    } catch (error) {
      console.error('Error to upload:', error)

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
      {/* <div className='profile-completion-banner'>
        <div className='profile-completion-banner__content'>
          <div className='profile-completion-banner__text'>
            <p className='profile-completion-banner__title'>
              Complete your profile yourself or order professional service.
            </p>
            <p className='profile-completion-banner__subtitle'>
              Earn 1000 Credits, learn <span className='underline'>Loyalty Program</span>
            </p>
          </div>
        </div>

        <button className='profile-completion-banner__btn'>
          <span>GET PROFESSIONAL SERVICE</span>
          <KTSVG path='/media/svg/nobilis/vector1.svg' />
        </button>
      </div> */}

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
                <KTSVG path='/media/svg/nobilis/mark.svg' className='' />
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
            <div className='biography__info-desc'>{data?.bioPresentation}</div>
            <div className='biography__info-location'>
              <span>
                <KTSVG path='/media/svg/nobilis/location_mark.svg' className='' />
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

          {/* Actions */}
          <div className='biography__actions'>
            <div className='biography__actions-buttons'>
              {isMember ? (
                <div className='btn-main btn-main--black'>
                  Request Introduction
                  <img
                    src='/media/svg/nobilis/vector1.svg'
                    alt=''
                    className='nb-btn-icon nb-btn-icon--white'
                  />
                </div>
              ) : null}

              {isExpert ? (
                <div className='btn-main btn-main--blue'>
                  Book Expertise
                  <img
                    src='/media/svg/nobilis/vector1.svg'
                    alt=''
                    className='nb-btn-icon nb-btn-icon--white'
                  />
                </div>
              ) : null}
            </div>
            <div className='biography__actions-socials'>
              {socials.map((item, index) => (
                <KTSVG
                  key={index}
                  path={toAbsoluteUrl(item.icon)}
                  className='social-media-input-icon'
                />
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

          <img src={profileImage} alt='profile' />

          {canEditImage && (
            <>
              <a className='biography__edit-btn' onClick={() => fileInputRef.current?.click()}>
                <KTSVG path='/media/svg/nobilis/edit-img.svg' />
              </a>
            </>
          )}

          <div className='quote'>
            <span>{data?.picFooter}</span>
          </div>
          {canEditImage && (
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

      <BiographyTabs onTabChange={handleModule} />
    </>
  )
}

export {BiographyPage}
