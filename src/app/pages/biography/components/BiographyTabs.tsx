import {useState} from 'react'
import {BiographyTab} from './tabs/BiographyTab'
import {ProfessionalOverviewTab} from './tabs/ProfessionalOverviewTab'
import {LifestyleTab} from './tabs/LifestyleTab'
import {RecognitionTab} from './tabs/RecognitionTab'
import {ExpertiseTab} from './tabs/ExpertiseTab'
import {useUserProfileContext} from '../../../context/UserProfileContext'
import InfoAdminTab from './tabs/InfoAdminTab'
import InfoFamilyTab from './tabs/InfoFamilyTab'
import {useIntroduction} from '../../../hooks/introduction/useIntroduction'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import {UserModel} from '../../../modules/auth/models/UserModel'
import {hasPermission} from '../../../utils/permissions'
import {Permission} from '../../../constants/roles'
import {KTSVG} from '../../../../_metronic/helpers'
import {useHistory} from 'react-router-dom'

interface BiographyTabsProps {
  onTabChange?: (tabId: string) => void
}

const tabs = [
  {id: 'bio', label: 'Biography'},
  {id: 'overview', label: 'Professional Overview'},
  {id: 'lifestyle', label: 'Lifestyle'},
  {id: 'recognition', label: 'Recognition'},
  {id: 'expertise', label: 'Expertise'},
]

const BiographyTabs: React.FC<BiographyTabsProps> = ({onTabChange}) => {
  const {data} = useUserProfileContext()
  /* const {collection} = useIntroduction() */
  const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const canEditBio = hasPermission(user, Permission.EDIT_BIOGRAPHY)
  const [activeTab, setActiveTab] = useState(canEditBio ? 'ini' : 'bio')
  const navigate = useHistory()

  const getYouTubeId = (url: string) => {
    if (!url) return null
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const getVideoThumbnail = (video: any) => {
    if (video.thumbnail) {
      return video.thumbnail
    }

    const youtubeId = getYouTubeId(video.videoLink)

    if (youtubeId) {
      return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    }

    return 'https://via.placeholder.com/640x360'
  }

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  return (
    <>
      <div className='bio-tabs'>
        {/* Tabs Header */}
        <div className='bio-tabs__header'>
          {tabs.map((tab, index) => (
            <div key={tab.id} className='bio-tabs__header-item'>
              <div
                className={`bio-tabs__item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </div>
              {index < tabs.length - 1 && <div className='bio-tabs__separator' />}
            </div>
          ))}

          {canEditBio && (
            <div className='bio-tabs-actions-wrapper'>
              <button
                className='bio-tabs__confidential-btn'
                onClick={() => navigate.push('/admin/overview/confidential')}
              >
                Confidential Info
              </button>
              <button
                className='bio-edit-underline-btn'
                onClick={() => {
                  const routes: Record<string, string> = {
                    bio: '/biography/overview',
                    overview: '/admin/overview/professional',
                    lifestyle: '/admin/overview/personal',
                    recognition: '/recognition',
                    expertise: '/expertise',
                  }

                  const route = routes[activeTab] || '/admin/overview/profile'
                  navigate.push(route)
                }}
              >
                <span>EDIT</span>
                <KTSVG path='/media/svg/nobilis/vector1.svg' />
              </button>
            </div>
          )}
        </div>

        {/* Tabs Content */}
        <div className='bio-tabs__content'>
          {activeTab === 'bio' && <BiographyTab />}
          {activeTab === 'overview' && <ProfessionalOverviewTab />}
          {activeTab === 'lifestyle' && <LifestyleTab />}
          {activeTab === 'recognition' && <RecognitionTab />}
          {activeTab === 'expertise' && <ExpertiseTab />}

          {activeTab === 'ini' && (
            <div className='bio-tabs__panel--two-col'>
              <InfoAdminTab />
              <InfoFamilyTab />
            </div>
          )}
          {activeTab === 'bio' && (
            <div className='bio-gallery-section'>
              <div className='bio-tabs__gallery'>
                {data?.videos &&
                  data?.videos.map((video) => {
                    const videoId = video.videoLink.split('v=')[1]?.split('&')[0]

                    return (
                      <div
                        key={video.id}
                        className='bio-tabs__video'
                        style={{position: 'relative'}}
                      >
                        {/* <div className=''>
                          <div
                            data-format='Stroke'
                            data-weight='Regular'
                            style={{width: '100%', height: '100%', position: 'relative'}}
                          >
                            <div
                              style={{
                                width: 21.89,
                                height: 21.89,
                                left: 0,
                                top: 0,
                                position: 'absolute',
                              }}
                            />
                            <div
                              style={{
                                width: 13.68,
                                height: 16.41,
                                left: 6.16,
                                top: 2.74,
                                position: 'absolute',
                                outline: '1.37px white solid',
                                outlineOffset: '-0.68px',
                              }}
                            />
                          </div>
                        </div> */}
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?controls=0&showinfo=0&modestbranding=1`}
                          frameBorder='0'
                          allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                          allowFullScreen
                        />
                        <div
                          onClick={() => {
                            window.open(video.videoLink, '_blank')
                          }}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            cursor: 'pointer',
                            zIndex: 1,
                          }}
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export {BiographyTabs}
