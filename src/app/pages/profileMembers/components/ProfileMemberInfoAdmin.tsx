// app/pages/profileMembers/components/ProfileMemberInfoAdmin.tsx
import {FC} from 'react'
import {useUserProfileContext} from '../../../context/UserProfileContext'
import {formatDateStr} from '../../../helpers/FormatDate'

export const ProfileMemberInfoAdmin: FC = () => {
  const {data} = useUserProfileContext()

  return (
    <div className='nb-pm-info-card'>
      {/* General Information */}
      <div className='nb-pm-info-card__section'>
        <h3 className='nb-pm-info-card__title'>General Information</h3>
        <div className='nb-pm-info-card__content'>
          <div className='nb-pm-info-card__row'>
            <div className='nb-pm-info-card__field'>
              <span className='nb-pm-info-card__label'>Date of birth</span>
              <span className='nb-pm-info-card__value'>{formatDateStr(data?.birthday ?? '')}</span>
            </div>
            <div className='nb-pm-info-card__field'>
              <span className='nb-pm-info-card__label'>Phone</span>
              <span className='nb-pm-info-card__value'>{data?.phoneNumber}</span>
            </div>
          </div>
          <div className='nb-pm-info-card__row'>
            <div className='nb-pm-info-card__field'>
              <span className='nb-pm-info-card__label'>E-mail</span>
              <span className='nb-pm-info-card__value'>{data?.email}</span>
            </div>
            <div className='nb-pm-info-card__field'>
              <span className='nb-pm-info-card__label'>Preferred Contact Method</span>
              <span className='nb-pm-info-card__value'>
                {[data?.preferedEmail && 'Email', data?.preferedPhone && 'Phone']
                  .filter(Boolean)
                  .join(', ') || ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Separator */}
      <svg
        width='480'
        height='1'
        viewBox='0 0 480 1'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M480 0.5L-2.28882e-05 0.499979' stroke='#E9E9E9' />
      </svg>

      {/* Postal Address */}
      <div className='nb-pm-info-card__section'>
        <h3 className='nb-pm-info-card__title'>Postal Address</h3>
        <div className='nb-pm-info-card__addresses'>
          <div className='nb-pm-info-card__address-block'>
            <span className='nb-pm-info-card__address-label'>Postal Address</span>
            <div className='nb-pm-info-card__address-value'>
              <p>{data?.postalAddress}</p>
              <p className='nb-pm-info-card__address-muted'>{data?.city}</p>
            </div>
          </div>

          <svg
            width='480'
            height='1'
            viewBox='0 0 480 1'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M480 0.5L-2.28882e-05 0.499979' stroke='#E9E9E9' />
          </svg>

          <div className='nb-pm-info-card__address-block'>
            <span className='nb-pm-info-card__address-label'>Primary residence</span>
            <div className='nb-pm-info-card__address-value'>
              <p>{data?.city}</p>
            </div>
          </div>

          <svg
            width='480'
            height='1'
            viewBox='0 0 480 1'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M480 0.5L-2.28882e-05 0.499979' stroke='#E9E9E9' />
          </svg>

          <div className='nb-pm-info-card__address-block'>
            <span className='nb-pm-info-card__address-label'>often in</span>
            <div className='nb-pm-info-card__address-value'>
              {data?.oftenIn?.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}