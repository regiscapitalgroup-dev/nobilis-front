import {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {MembersNamesAutocompleteField} from '../fields/MembersNameAutocompleteField'

interface Props {
  isOpen: boolean
  onClose: () => void
  onInvite: (memberName: string) => void
  experienceTitle: string
  location: string
  date: string
  maxGuests: number
  price: string
  duration: string
}

const InviteMemberModal: FC<Props> = ({
  isOpen,
  onClose,
  onInvite,
  experienceTitle,
  location,
  date,
  maxGuests,
  price,
  duration,
}) => {
  const [memberName, setMemberName] = useState('')
  const [selectedNames, setSelectedNames] = useState<string[]>([])

  if (!isOpen) return null

  const handleSubmit = () => {
    if (memberName.trim()) {
      onInvite(memberName)
      setMemberName('')
    }
  }

  return (
    <div className='nb-modal-overlay' onClick={onClose}>
      <div className='nb-invite-modal' onClick={(e) => e.stopPropagation()}>
        {/* CLOSE BUTTON */}
        <button className='nb-invite-modal__close' onClick={onClose}>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <circle cx='12' cy='12' r='10' stroke='#808080' strokeWidth='1' />
            <path d='M9.17 9.17l5.66 5.66M14.83 9.17l-5.66 5.66' stroke='#808080' strokeWidth='1' />
          </svg>
        </button>

        {/* TITLE */}
        <h2 className='nb-invite-modal__title'>Invite Member</h2>

        {/* CONTENT */}
        <div className='nb-invite-modal__content'>
          {/* HOSTS */}
          <div className='nb-invite-modal__hosts'>
            <div className='nb-invite-modal__host'>
              <img src='https://placehold.co/28x28' alt='You' />
              <span>You</span>
            </div>
            <div className='nb-invite-modal__host'>
              <img src='https://placehold.co/28x28' alt='Kristina Adam' />
              <span>Kristina Adam</span>
            </div>
          </div>

          {/* EXPERIENCE INFO */}
          <div className='nb-invite-modal__experience'>
            <div className='nb-invite-modal__label'>Invite Only</div>
            <h3 className='nb-invite-modal__experience-title'>{experienceTitle}</h3>
          </div>

          {/* DETAILS */}
          <div className='nb-invite-modal__details'>
            <div className='nb-invite-modal__details-row'>
              <div className='nb-invite-modal__detail'>
                <KTSVG path='/media/svg/nobilis/location_mark.svg' />
                <span>{location}</span>
              </div>
              <div className='nb-invite-modal__detail'>
                <KTSVG path='/media/svg/nobilis/calendar02.svg' />
                <span>{date}</span>
              </div>
              <div className='nb-invite-modal__detail'>
                <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
                  <circle cx='7' cy='3' r='2.915' stroke='#151515' strokeWidth='1' fill='none' />
                  <path
                    d='M1.99 12.83c0-2.25 2.24-4.08 5.01-4.08s5.01 1.83 5.01 4.08'
                    stroke='#151515'
                    strokeWidth='1'
                    fill='none'
                  />
                </svg>
                <span>Max {maxGuests} Pax</span>
              </div>
            </div>

            <div className='nb-invite-modal__details-row'>
              <div className='nb-invite-modal__detail'>
                <KTSVG path='/media/svg/nobilis/currency.svg' />
                <span>{price}</span>
              </div>
              <div className='nb-invite-modal__detail'>
                <KTSVG path='/media/svg/nobilis/clock.svg' />
                <span>{duration}</span>
              </div>
              <div className='nb-invite-modal__detail nb-invite-modal__detail--hidden'>
                <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
                  <circle cx='7' cy='7' r='5.835' stroke='#151515' strokeWidth='1' fill='none' />
                </svg>
                <span>6 Hour</span>
              </div>
            </div>
          </div>
        </div>

        {/* INPUT */}
        <div className='nb-invite-modal__input-group'>
          <label className='nb-invite-modal__input-label'>Members Name</label>
          <div className='nb-invite-modal__input-wrapper'>
            <MembersNamesAutocompleteField values={selectedNames} onChange={setSelectedNames} />
          </div>
        </div>

        {/* BUTTON */}
        <button className='nb-invite-modal__button' onClick={handleSubmit}>
          <span>invite members</span>
          <KTSVG path='/media/svg/nobilis/vector1.svg' className='nb-btn-icon--white' />
        </button>
      </div>
    </div>
  )
}

export default InviteMemberModal
