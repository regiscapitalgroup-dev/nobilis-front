import React, { useState, useRef, useEffect } from 'react'

interface ValuesVideoProps {
  videoSrc?: string 
  thumbnailSrc?: string 
}

export const ValuesVideo: React.FC<ValuesVideoProps> = ({
  videoSrc = 'https://nobilis-social.s3.us-east-2.amazonaws.com/landingpage/Istock-1423332615.mp4',
  thumbnailSrc,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Se activa cuando el 50% del video es visible
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAutoPlayed && videoRef.current) {
          // Intentar reproducir automáticamente
          videoRef.current.play()
            .then(() => {
              setIsPlaying(true)
              setHasAutoPlayed(true)
            })
            .catch((error) => {
              // Si falla el autoplay (por políticas del navegador), solo marcamos como intentado
              console.log('Autoplay prevented:', error)
              setHasAutoPlayed(true)
            })
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, options)

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [hasAutoPlayed])

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

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        handlePlay()
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handlePlayEvent = () => {
    setIsPlaying(true)
  }

  return (
    <div className="video-section" ref={containerRef}>
      <div className="video-section__container">
        <video
          ref={videoRef}
          className="video-section__video"
          controls
          preload="metadata"
          poster={thumbnailSrc}
          playsInline
          muted // Necesario para autoplay en la mayoría de navegadores
          onClick={handleVideoClick}
          onPause={handlePause}
          onPlay={handlePlayEvent}
        >
          <source src={videoSrc} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
        
        {!isPlaying && (
          <button
            className="video-section__play-button"
            onClick={handlePlay}
            aria-label="Reproducir video"
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