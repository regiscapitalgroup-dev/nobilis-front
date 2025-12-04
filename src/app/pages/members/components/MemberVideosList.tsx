import {useUserProfileContext} from '../../../context/UserProfileContext'

const MemberVideosList = () => {
  const {data} = useUserProfileContext()
  const videos = data?.videos ?? []

  const getYouTubeId = (url: string) => {
    if (!url) return null
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const getVideoThumbnail = (videoLink: string) => {
    const youtubeId = getYouTubeId(videoLink)
    if (youtubeId) {
      return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    }
    return 'https://via.placeholder.com/640x360'
  }

  const handleVideoClick = (videoLink: string) => {
    window.open(videoLink, '_blank')
  }

  if (!videos.length) {
    return null
  }

  return (
     <div className='member-detail__videos'>
      {videos.map((video) => (
        <div
          key={video.id}
          className='member-detail__video-item'
          onClick={() => handleVideoClick(video.videoLink)}
          style={{ cursor: 'pointer' }}
        >
          <img
            className='member-detail__video-image'
            src={getVideoThumbnail(video.videoLink)}
            alt={video.title || 'video thumbnail'}
          />
          <div className='member-detail__video-overlay'>
            <svg
              className='member-detail__video-play'
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9 4.98534V27.0153C9.00327 27.1911 9.05282 27.363 9.14368 27.5135C9.23453 27.664 9.36347 27.7879 9.51749 27.8728C9.67152 27.9576 9.84518 28.0003 10.021 27.9965C10.1967 27.9928 10.3684 27.9428 10.5188 27.8516L28.5287 16.8366C28.6726 16.7495 28.7916 16.6268 28.8741 16.4803C28.9567 16.3338 29.0001 16.1685 29.0001 16.0003C29.0001 15.8322 28.9567 15.6669 28.8741 15.5204C28.7916 15.3739 28.6726 15.2512 28.5287 15.1641L10.5188 4.14908C10.3684 4.05784 10.1967 4.00785 10.021 4.00413C9.84518 4.00041 9.67152 4.04311 9.51749 4.12792C9.36347 4.21273 9.23453 4.33664 9.14368 4.48718C9.05282 4.63771 9.00327 4.80954 9 4.98534Z'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
    
  )
}

export default MemberVideosList
