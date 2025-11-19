import {FC} from 'react'

export const PartnersHero: FC = () => {
  return (
    <section className='partners-hero'>
      <img 
        src='/media/partners.png' 
        alt='Partners background' 
        className='partners-hero__background'
      />
      <div className='partners-hero__overlay'>
        <h1 className='partners-hero__title'>Partners</h1>
        <p className='partners-hero__description'>
          Where the world’s most trusted companies meet the world’s most accomplished minds
        </p>
      </div>
    </section>
  )
}