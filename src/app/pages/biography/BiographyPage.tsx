import {FC, useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {BiographyTabs} from './components/BiographyTabs'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {UserModel} from '../../modules/auth/models/UserModel'
import {useUserProfileContext} from '../../context/UserProfileContext'

const socials = [
  {icon: '/media/svg/nobilis/instagram.svg'},
  {icon: '/media/svg/nobilis/fb.svg'},
  {icon: '/media/svg/nobilis/x.svg'},
]

const BiographyPage: FC = () => {
  const {data} = useUserProfileContext()
  const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const fullName = `${user.firstName} ${user.lastName}`
  const [isMember, setIsMember] = useState<boolean>(false)
  const [isExpert, setIsExpert] = useState<boolean>(false)

  useEffect(() => {
    if (data?.subscription) setIsMember(true)

    if (data?.expertise) setIsExpert(true)
  }, [data])

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

        {/* RIGHT */}
        <div className='biography__right'>
          <div className='bg-block'></div>
          <img src={toAbsoluteUrl('/media/people3.png')} alt='profile' />
          <div className='quote'>
            <span>{data?.picFooter}</span>
          </div>
        </div>
      </div>

      <BiographyTabs />
    </>
  )
}

export {BiographyPage}
