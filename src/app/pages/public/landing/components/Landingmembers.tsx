import React, {FC, useState} from 'react'

interface Slide {
  title: string
  subtitle: string
  description: string
  primaryImage: string
  secondaryImage: string
}

export const LandingMembers: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides: Slide[] = [
    {
      title: 'Members',
      subtitle: 'Diverse Leaders. United Vision',
      description:
        'Legacy holders, impact makers, public leaders, c-suit executives and wealth owners worldwide, connected.',
      primaryImage: '/media/members.png',
      secondaryImage: '/media/invitations_lp.png',
    },
    {
      title: 'Invitations',
      subtitle: 'Global Network. Local Impact',
      description:
        'Connecting visionaries across continents, fostering collaborations that shape industries and communities.',
      primaryImage: '/media/invitations_lp.png',
      secondaryImage: '/media/community_lp.png',
    },
    {
      title: 'Community',
      subtitle: 'Excellence. Innovation. Legacy',
      description: 'Mastermind circles of 12.Share insights. Create impact.',
      primaryImage: '/media/community_lp.png',
      secondaryImage: '/media/expertise_lp.png',
    },
    {
      title: 'Expertise',
      subtitle: '',
      description: 'Exclusive, direct access to Members Expertise sharing.',
      primaryImage: '/media/expertise_lp.png',
      secondaryImage: '/media/members.png',
    },
  ]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const currentSlide = slides[currentIndex]

  return (
    <section className='landing-members'>
      <div className='landing-members__container'>
        <div className='landing-members__images'>
          <img
            key={`secondary-${currentIndex}`}
            src={currentSlide.secondaryImage}
            alt='Next slide preview'
            className='landing-members__image landing-members__image--secondary'
          />
          <img
            key={`primary-${currentIndex}`}
            src={currentSlide.primaryImage}
            alt={currentSlide.subtitle}
            className='landing-members__image landing-members__image--primary'
          />
          <h2 className='landing-members__title'>{currentSlide.title}</h2>
        </div>

        <div className='landing-members__content'>
          <div className='landing-members__text'>
            <p className='landing-members__subtitle'>
              {currentSlide.subtitle}
              <br />
              <span className='landing-members__description'>{currentSlide.description}</span>
            </p>
          </div>

          <div className='landing-members__controls'>
            <button
              onClick={handlePrev}
              aria-label='Previous slide'
              className='landing-members__arrow'
            >
              <img src='/media/svg/nobilis/vector01.svg' />
            </button>
            <button onClick={handleNext} aria-label='Next slide' className='landing-members__arrow'>
              <img src='/media/svg/nobilis/vector02.svg' />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}