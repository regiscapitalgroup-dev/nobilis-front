import React, {FC} from 'react'
import {useHistory} from 'react-router-dom'

export const LandingCTA: FC = () => {
  const history = useHistory()

  const handleRequestInvitation = () => {
    history.push('/auth/registration')
  }

  return (
    <section className='landing-cta'>
      <div className='landing-cta__content'>
        <div className='landing-cta__card'>
          <div className='landing-cta__text-container'>
            <h2 className='landing-cta__title'>
              Only 200,000 of the world's most influential individuals will ever belong
            </h2>
            <p className='landing-cta__description'>
              Membership is strictly by invitation, with limited seats per country.
            </p>
          </div>
          <button className='landing-cta__button' onClick={handleRequestInvitation}>
            Request Invitation
            <img
                src='/media/svg/nobilis/vector1.svg'
                alt=''
                className='nb-btn-icon nb-btn-icon--white'
              />
          </button>
        </div>
      </div>
    </section>
  )
}