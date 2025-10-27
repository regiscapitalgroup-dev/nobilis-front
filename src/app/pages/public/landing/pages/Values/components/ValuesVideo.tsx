import React from 'react'

interface ValuesVideoProps {
  videoId?: string 
  thumbnailSrc?: string 
}

export const ValuesVideo: React.FC<ValuesVideoProps> = ({
  videoId = 'fOW8Y09GVek',
  thumbnailSrc = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
}) => {
  const handleClick = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
  }

  return (
    <div className="video-section">
      <div className="video-section__container">
        <img
          className="video-section__thumbnail"
          src={thumbnailSrc}
          alt="Video thumbnail"
        />
        <button
          className="video-section__play-button"
          onClick={handleClick}
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
      </div>
    </div>
  )
}