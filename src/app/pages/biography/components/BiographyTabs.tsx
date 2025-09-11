import {useState} from 'react'
import {BiographyTab} from './tabs/BiographyTab'
import {ProfessionalOverviewTab} from './tabs/ProfessionalOverviewTab'
import {LifestyleTab} from './tabs/LifestyleTab'
import {RecognitionTab} from './tabs/RecognitionTab'
import {ExpertiseTab} from './tabs/ExpertiseTab'
import {useUserProfileContext} from '../../../context/UserProfileContext'

const tabs = [
  {id: 'bio', label: 'Biography'},
  {id: 'overview', label: 'Professional Overview'},
  {id: 'lifestyle', label: 'Lifestyle'},
  {id: 'recognition', label: 'Recognition'},
  {id: 'expertise', label: 'Expertise'},
]

const BiographyTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bio')
  const {data} = useUserProfileContext()

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
      // Usa hqdefault que siempre existe
      return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    }

    return 'https://via.placeholder.com/640x360'
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
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </div>
              {index < tabs.length - 1 && <div className='bio-tabs__separator' />}
            </div>
          ))}
        </div>

        {/* Tabs Content */}
        <div className='bio-tabs__content'>
          {activeTab === 'bio' && <BiographyTab />}
          {activeTab === 'overview' && <ProfessionalOverviewTab />}
          {activeTab === 'lifestyle' && <LifestyleTab />}
          {activeTab === 'recognition' && <RecognitionTab />}
          {activeTab === 'expertise' && <ExpertiseTab />}

          {/* {activeTab === 'bio' && (
            <div className='bio-gallery-section'>
              <div className='bio-tabs__gallery'>
                {data?.videos &&
                  data?.videos.map((video) => (
                    <div key={video.id} className='bio-tabs__video'>
                      <div className='bio-tabs__play'></div>
                      <img src={getVideoThumbnail(video.videoLink)} alt={video.title} />
                    </div>
                  ))}
              </div>
            </div>
          )} */}
          {activeTab === 'bio' && (
            <div className='bio-gallery-section'>
              <div className='bio-tabs__gallery'>
                {data?.videos &&
                  data?.videos.map((video) => {
                    // Extraer el ID del video
                    const videoId = video.videoLink.split('v=')[1]?.split('&')[0]

                    return (
                      <div key={video.id} className='bio-tabs__video'>
                        <div className='bio-tabs__play'></div>
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}?controls=0&showinfo=0&modestbranding=1`}
                          frameBorder='0'
                          allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                          allowFullScreen
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none', // Evita que se pueda interactuar
                          }}
                        />
                        {/* Div transparente para capturar el clic */}
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 3,
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            // Aquí puedes abrir el modal o reproducir el video
                            window.open(video.videoLink, '_blank')
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
