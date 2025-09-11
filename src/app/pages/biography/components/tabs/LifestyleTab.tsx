import {FC} from 'react'
import {useUserProfileContext} from '../../../../context/UserProfileContext'

const LifestyleTab: FC = () => {
  const {data} = useUserProfileContext()

  return (
    <div className='lifestyle-content'>
      <div className='lifestyle-column--left'>
        <div className='lifestyle-clubs-card'>
          <div className='lifestyle-clubs-content'>
            <div className='lifestyle-clubs-title'>My Clubs</div>
            <div className='lifestyle-clubs-list'>
              {data?.personalDetail &&
                data.personalDetail.clubs.map((item) => {
                  return (
                    <div className='lifestyle-clubs-item'>
                      <h4>{item.name}</h4>
                      <p>{item.city}</p>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Segunda Columna - Activities */}
      <div className='lifestyle-column--right'>
        <div className='lifestyle-activities-card'>
          <div className='lifestyle-activities-content'>
            <div className='lifestyle-section'>
              <div className='lifestyle-section-title'>Hobby</div>
              <div className='lifestyle-tags'>
                {data?.personalDetail &&
                  data.personalDetail.hobbies.map((item) => {
                    return (
                      <div className='lifestyle-tag'>
                        <span>{item}</span>
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className='lifestyle-section'>
              <div className='lifestyle-section-title'>MY INTEREST</div>
              <div className='lifestyle-tags--no-stretch'>
                {data?.personalDetail &&
                  data.personalDetail.interests.map((item) => {
                    return (
                      <div className='lifestyle-tag'>
                        <span>{item}</span>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {LifestyleTab}
