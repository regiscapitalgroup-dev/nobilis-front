import {FC} from 'react'
import {useUserProfileContext} from '../../../../context/UserProfileContext'

const RecognitionTab: FC = () => {
  const {data} = useUserProfileContext()

  return (
    <div className='recognition-content'>
      <div className='recognition-card'>
        <div className='recognition-section'>
          <div className='recognition-title'>Top Accomplishments</div>
          <div className='recognition-accomplishments'>
            {data?.recognition &&
              data.recognition.topAccomplishments.map((item, index) => {
                return (
                  <>
                    <div className='recognition-accomplishment-item'>
                      <div className='recognition-accomplishment-content'>
                        <p>{item}</p>
                      </div>
                    </div>
                    {index < data.recognition.topAccomplishments.length - 1 && (
                      <div className='recognition-separator' />
                    )}
                  </>
                )
              })}
          </div>
        </div>
      </div>

      <div className='recognition-card'>
        <div className='recognition-title'>additional Links</div>
        <div className='recognition-links'>
          {data?.recognition &&
            data.recognition.additionalLinks.map((item) => {
              return (
                <>
                  <div className='recognition-link-item'>
                    <div className='link-text'>{item}</div>
                  </div>
                </>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export {RecognitionTab}
