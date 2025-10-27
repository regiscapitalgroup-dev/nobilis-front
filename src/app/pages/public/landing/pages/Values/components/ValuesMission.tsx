import React from 'react'

export const ValuesMission: React.FC = () => {
  return (
    <div className="mission-section">
      <div className="mission-section__image-container">
        <img 
          className="mission-section__image" 
          src='/media/values_mission.png'
          alt='Mission of Nobilis'
        />
      </div>
      
      <div className="mission-section__content">
        <h2 className="mission-section__title">Mission of Nobilis</h2>
        <p className="mission-section__description">
          To unite the world's most accomplished individuals in a trusted, exclusive community where they can share adventures, knowledge, resources, and experiences—enjoying life to the fullest, accelerating personal and professional growth, and creating lasting impact and a collective legacy.
        </p>
      </div>
    </div>
  )
}