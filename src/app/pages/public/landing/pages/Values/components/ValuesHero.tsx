import {FC} from 'react'

export const ValuesHero: FC = () => {
  return (
    <section className='partners-hero value-hero'>
      <img 
        src='/media/values.jpg' 
        alt='Partners background' 
        className='partners-hero__background values-hero-background'
      />
      <div className='partners-hero__overlay'>
        <h1 className='partners-hero__title'>Values</h1>
        <p className='partners-hero__description'>
          The principles that guide every relationship, collaboration, and decision
        </p>
      </div>
    </section>
  )
}