import {FC} from 'react'
import {useUserProfileContext} from '../../../../context/UserProfileContext'

const ProfessionalOverviewTab: FC = () => {
  const {data} = useUserProfileContext()
  return (
    <div className='professional-overview-content'>
      {/* Primera Columna */}
      <div className='professional-overview-column'>
        {/* Organizations I am involve in / Positions */}
        <div className='professional-overview-section'>
          <div className='professional-overview-section__header'>
            <div className='professional-overview-section__title'>
              <h3>Organizations I am involve in / Positions</h3>
            </div>
          </div>
          <div className='professional-overview-section__content'>
            {data?.professionalProfile &&
              data.professionalProfile.workPositions.map((item) => {
                return (
                  <div className='professional-overview-section__item'>
                    <h4>
                      {item.company}-{item.position}
                    </h4>
                    <p>{`${item.city}, ${item.fromYear}-${item.toYear}`}</p>
                  </div>
                )
              })}
          </div>
        </div>

        <div className='professional-overview-separator' />

        {/* I am on board */}
        <div className='professional-overview-section'>
          <div className='professional-overview-section__header'>
            <div className='professional-overview-section__title'>
              <h3>I am on board</h3>
            </div>
          </div>

          <div className='professional-overview-section__content'>
            {data?.professionalProfile &&
              data.professionalProfile.onBoard.map((item) => {
                return (
                  <div className='professional-overview-section__item'>
                    <h4>
                      {item.company}-{item.position}
                    </h4>
                    <p>{`${item.city}, ${item.fromYear}-${item.toYear}`}</p>
                  </div>
                )
              })}
          </div>
        </div>

        <div className='professional-overview-separator' />

        {/* Non Profit Involvement */}
        <div className='professional-overview-section'>
          <div className='professional-overview-section__header'>
            <div className='professional-overview-section__title'>
              <h3>Non Profit Involvement</h3>
            </div>
          </div>
          <div className='professional-overview-section__content'>
            {data?.professionalProfile &&
              data.professionalProfile.nonProfitInvolvement.map((item) => {
                return (
                  <div className='professional-overview-section__item'>
                    <h4>
                      {item.company}-{item.position}
                    </h4>
                    <p>{`${item.city}, ${item.fromYear}-${item.toYear}`}</p>
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      {/* Segunda Columna */}
      <div className='professional-overview-column'>
        <div className='professional-overview-wrapper'>
          {/* Education */}
          <div className='professional-overview-section'>
            <div className='professional-overview-section__header'>
              <div className='professional-overview-section__title'>
                <h3>Education</h3>
              </div>
            </div>
            <div className='professional-overview-section__content-education'>
              {data?.professionalProfile &&
                data.professionalProfile.education.map((item) => {
                  return (
                    <div className='professional-overview-section__item'>
                      <h4>
                        {item.universityName}-{item.carreer}
                      </h4>
                      <p>{`${item.city}, ${item.fromYear}-${item.toYear}`}</p>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>

        <div className='professional-overview-separator' />

        {/* Industries */}
        <div className='professional-overview-section'>
          <div className='professional-overview-section__header'>
            <div className='professional-overview-section__title'>
              <h3>Industries</h3>
            </div>
          </div>
          <div className='professional-overview-section__tags'>
            {data?.professionalProfile &&
              data.professionalProfile.industries.map((item) => {
                return (
                  <div className='professional-overview-section__tag'>
                    <span>{item}</span>
                  </div>
                )
              })}
          </div>
        </div>

        <div className='professional-overview-separator' />

        {/* Professional Interests */}
        <div className='professional-overview-section'>
          <div className='professional-overview-section__header'>
            <div className='professional-overview-section__title'>
              <h3>Professional Interests</h3>
            </div>
          </div>
          <div className='professional-overview-section__tags'>
            {data?.professionalProfile &&
              data.professionalProfile.professionalInterest.map((item) => {
                return (
                  <div className='professional-overview-section__tag'>
                    <span>{item}</span>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export {ProfessionalOverviewTab}
