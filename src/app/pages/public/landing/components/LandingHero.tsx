// LandingHero.tsx
import React, {FC} from 'react'

interface LandingHeroProps {
  imageUrl?: string
}

export const LandingHero: FC<LandingHeroProps> = ({imageUrl = 'https://placehold.co/1968x1230'}) => {
  return (
    <section className='landing-hero'>
      <div className='landing-hero__image-container'>
        <img 
          src={imageUrl} 
          alt='Hero background' 
          className='landing-hero__image'
        />
        {/* <div className='landing-hero__overlay'>
          <h1 className='landing-hero__title'>
            You Are Here Because You've Been Invited
          </h1>
          <button className='landing-hero__scroll-btn' aria-label='Scroll down'>
            <span className='landing-hero__arrow-down'></span>
          </button>
        </div> */}
      </div>
    </section>
  )
}