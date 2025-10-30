import React, { useState, useRef } from 'react'

interface ValuesVideoProps {
  videoSrc?: string 
  thumbnailSrc?: string 
}

export const ValuesVideo: React.FC<ValuesVideoProps> = ({
  videoSrc = 'https://nobilis-social.s3.us-east-2.amazonaws.com/landingpage/Istock-1423332615.mp4',
  thumbnailSrc,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.error('Error playing video:', error)
        })
    }
  }

  return (
    <div className="video-section">
      <div className="video-section__container">
        <video
          ref={videoRef}
          className="video-section__video"
          controls
          preload="metadata"
          poster={thumbnailSrc}
          playsInline
          onClick={handlePlay}
        >
          <source src={videoSrc} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
        
        {!isPlaying && (
          <button
            className="video-section__play-button"
            onClick={handlePlay}
            aria-label="Play video"
          >
            <svg
              width="79"
              height="79"
              viewBox="0 0 79 79"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.46 19.88L62.54 39.5L32.46 59.13V19.88Z"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}