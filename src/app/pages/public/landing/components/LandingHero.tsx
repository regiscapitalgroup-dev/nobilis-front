import React, {FC} from 'react'

interface LandingHeroProps {
  imageUrl?: string
}

export const LandingHero: FC<LandingHeroProps> = ({imageUrl = 'https://placehold.co/1440x867'}) => {
  return (
    <section className='landing-hero'>
      <div className='landing-hero__image-container'>
        <img src={imageUrl} alt='Hero background' className='landing-hero__image' />
        <div className='landing-hero__overlay'>
          <div className='landing-hero__content'>
            <h1 className='landing-hero__title'>You Are Here Because You've Been Invited</h1>
            <p className='landing-hero__subtitle'>
              The Private Network Connecting the World's Most Accomplished
            </p>
          </div>
          <div className='landing-hero__scroll-icon'>
            <svg
              width='48'
              height='48'
              viewBox='0 0 48 48'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M39 18L24 33L9 18'
                stroke='#B4B4B4'
                stroke-width='3'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
