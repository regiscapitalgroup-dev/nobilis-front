// src/app/components/VideoSection.tsx
import React, { useState } from 'react'

interface ValuesVideoProps {
  videoId?: string 
  thumbnailSrc?: string 
}

export const ValuesVideo: React.FC<ValuesVideoProps> = ({
  videoId,
  thumbnailSrc,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className="video-section">
      <div className="video-section__container">
        {!isPlaying ? (
          <>
            <img
              className="video-section__thumbnail"
              src={`https://www.youtube.com/watch?v=ZXsQAXx_ao0`}
              alt="Video thumbnail"
            />
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
          </>
        ) : (
          <iframe
            className="video-section__iframe"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  )
}