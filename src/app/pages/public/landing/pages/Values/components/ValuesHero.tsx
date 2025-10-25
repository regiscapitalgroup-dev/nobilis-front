import {FC} from 'react'

export const ValuesHero: FC = () => {
  return (
    <section className='partners-hero'>
      <img 
        src='/media/values_head.png' 
        alt='Partners background' 
        className='partners-hero__background'
      />
      {/* <div className='partners-hero__overlay'>
        <h1 className='partners-hero__title'>Partners</h1>
        <p className='partners-hero__description'>
          The top leading partners may be selected: Alone we will not be able to create the best
          solutions for our members.
        </p>
      </div> */}
    </section>
  )
}