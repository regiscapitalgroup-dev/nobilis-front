import {FC} from 'react'
import {useUserProfileContext} from '../../../context/UserProfileContext'

export const ProfileMemberInfoFamily: FC = () => {
  const {data} = useUserProfileContext()
  const relatives = data?.relatives ?? []

  return (
    <div className='nb-pm-family-card'>
      {/* Title */}
      <div className='nb-pm-family-card__section'>
        <h3 className='nb-pm-family-card__title'>Family Relation</h3>
      </div>

      {/* Partner */}
      <div className='nb-pm-family-card__partner'>
        <span className='nb-pm-family-card__partner-label'>Life Partner /Spouse</span>
        <span className='nb-pm-family-card__partner-value'>
          {`${data?.lifePartnerName ?? ''} ${data?.lifePartnerLastname ?? ''}`.trim() ||
            'Not specified'}
        </span>
      </div>

      {/* Relatives */}
      <div className='nb-pm-family-card__relatives'>
        <span className='nb-pm-family-card__relatives-label'>relative</span>

        {relatives.length > 0 ? (
          relatives.map((relative) => (
            <div key={relative.id} className='nb-pm-family-card__relative-item'>
              <div className='nb-pm-family-card__relative-info'>
                <span className='nb-pm-family-card__relative-name'>
                  {relative.firstName} {relative.lastName}
                </span>
                <span className='nb-pm-family-card__relative-birth'>
                  Born in {relative.yearOfBirth}
                </span>
              </div>
              <span className='nb-pm-family-card__relative-type'>{relative.relationship}</span>
            </div>
          ))
        ) : (
          <p>No relatives added yet.</p>
        )}
      </div>
    </div>
  )
}