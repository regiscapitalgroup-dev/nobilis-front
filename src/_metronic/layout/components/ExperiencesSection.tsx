/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState, useRef, useEffect} from 'react'
import {KTSVG} from '../../helpers'
import {useUserExperiences} from '../../../app/hooks/profile/useExperiences'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {UserModel} from '../../../app/modules/auth/models/UserModel'

const ExperiencesSection: FC = () => {
  const {data} = useUserExperiences()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const carouselRef = useRef<HTMLDivElement>(null)
  const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel

  const fullName = `${user.firstName} ${user.lastName}`
  const maxIndex = Math.max(0, data.length - cardsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 400
      const gap = 20
      const scrollPosition = currentIndex * (cardWidth + gap)
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      })
    }
  }, [currentIndex])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setCardsPerView(1)
      } else if (width < 1200) {
        setCardsPerView(2)
      } else {
        setCardsPerView(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  return (
    <div className='experiencesWrapper'>
      <div className='backgroundDecoration'>
        <KTSVG path='/media/svg/nobilis/mark_bg.svg' className='svg-icon-2' />
      </div>

      <div className='experiencesContainer'>
        {/* Header */}
        <div className='experiencesHeader'>
          <div className='experiencesHeaderContent'>
            <div className='experiencesTitle'>{fullName}</div>
            <div className='experiencesSubtitle'>Invites You</div>
          </div>
        </div>

        {/* Separador */}
        <div className='experiencesSeparator' />

        {/* Carousel Controls y Container */}
        <div className='carouselWrapper'>
          {/* Botón Previous */}
          {currentIndex > 0 && (
            <button
              className='carouselButton carouselButtonPrev'
              onClick={prevSlide}
              aria-label='Previous experiences'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr063.svg' className='svg-icon-2' />
            </button>
          )}

          {/* Experiences Grid - ahora es un carrusel */}
          <div ref={carouselRef} className='experiencesGrid'>
            {data.map((experience) => (
              <div key={experience.id} className='experienceCard'>
                {/* Image Container */}
                <div className='experienceImageContainer'>
                  <img
                    className='experienceImage'
                    src={experience.experiencePhotograph}
                    alt={experience.title}
                  />
                </div>

                {/* Overlay Content */}
                <div className='experienceOverlay'>
                  {/* Badge */}
                  <div className='experienceBadge'>
                    <div className='experienceBadgeText'>{experience.isNew ? 'New' : 'New'}</div>
                  </div>

                  {/* Authors */}
                  <div className='experienceAuthors'>
                    <div className='experienceAuthor'>
                      {experience.authors &&
                        experience.authors.map((item) => {
                          return (
                            <>
                              <img
                                className='experienceAuthorAvatar'
                                src={item.photoUrl}
                                alt={item.name}
                              />
                              <div className='experienceAuthorName'>{item.name}</div>
                            </>
                          )
                        })}
                    </div>
                  </div>

                  {/* Title */}
                  <div className='experienceTitle'>{experience.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón Next */}
          {currentIndex < maxIndex && (
            <button
              className='carouselButton carouselButtonNext'
              onClick={nextSlide}
              aria-label='Next experiences'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-2' />
            </button>
          )}
        </div>

        {data.length > cardsPerView && (
          <div className='carouselDots'>
            {Array.from({length: maxIndex + 1}, (_, index) => (
              <button
                key={index}
                className={`carouselDot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export {ExperiencesSection}
