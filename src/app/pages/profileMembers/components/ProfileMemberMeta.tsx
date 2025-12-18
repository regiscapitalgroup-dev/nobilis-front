// app/pages/profileMembers/components/ProfileMemberMeta.tsx
import {FC} from 'react'

interface ProfileMemberMetaProps {
  assignedAdmin?: string
  plan?: string
  newMemberGuide?: string
  memberTier?: string
  email: string
}

export const ProfileMemberMeta: FC<ProfileMemberMetaProps> = ({
  assignedAdmin,
  plan,
  newMemberGuide,
  memberTier,
  email,
}) => {
  return (
    <div className='nb-pm-meta-container'>
      <svg
        width='100%' // CAMBIADO de 1060
        height='1'
        viewBox='0 0 1060 1'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none' // AGREGADO
      >
        <path d='M1060 0.5L2.67029e-05 0.499954' stroke='#E9E9E9' />
      </svg>

      <div className='nb-pm-meta'>
        <div className='nb-pm-meta__group'>
          <div className='nb-pm-meta__label'>Assign Admin</div>
          <div className='nb-pm-meta__value'>{assignedAdmin || 'John Doe'}</div>
        </div>

        <div className='nb-pm-meta__group'>
          <div className='nb-pm-meta__label'>Plan</div>
          <div className='nb-pm-meta__value'>{plan || 'Electi'}</div>
        </div>

        <div className='nb-pm-meta__group'>
          <div className='nb-pm-meta__label'>New Member Guide</div>
          <div className='nb-pm-meta__select nb-pm-meta__select--large'>
            <div className='nb-pm-meta__select-inner'>
              <img className='nb-pm-meta__select-avatar' src='https://placehold.co/12x12' alt='' />
              <div className='nb-pm-meta__select-text'>{newMemberGuide || 'Jhon Capwell'}</div>
            </div>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.96005 4.47461L6.70005 7.73463C6.31505 8.11963 5.68505 8.11963 5.30005 7.73463L2.04004 4.47461'
                stroke='#151515'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>

        <div className='nb-pm-meta__group'>
          <div className='nb-pm-meta__label'>Member Tier</div>
          <div className='nb-pm-meta__select nb-pm-meta__select--small'>
            <div className='nb-pm-meta__select-text nb-pm-meta__select-text--bold'>
              {memberTier || 'HA'}
            </div>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.96005 4.47461L6.70005 7.73463C6.31505 8.11963 5.68505 8.11963 5.30005 7.73463L2.04004 4.47461'
                stroke='#151515'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
      </div>

      <svg
        width='100%' // CAMBIADO de 1060
        height='1'
        viewBox='0 0 1060 1'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none' // AGREGADO
      >
        <path d='M1060 0.5L2.67029e-05 0.499954' stroke='#E9E9E9' />
      </svg>
    </div>
  )
}