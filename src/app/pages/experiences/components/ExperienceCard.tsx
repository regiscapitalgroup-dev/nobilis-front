import {FC, useState, useRef, useEffect} from 'react'
import {ExperienceModel} from '../models/ExperienceModel'
import GuestsDropdown from './GuestsDropdown'
import {KTSVG} from '../../../../_metronic/helpers'
import CancelExperienceModal from './modals/CancelExperienceModal'
import ConfirmedGuestsModal from './modals/ConfirmedGuestsModal'

interface Props {
  experience: ExperienceModel
  variant?: 'requests' | 'active' | 'past'
}

const ExperienceCard: FC<Props> = ({experience, variant = 'requests'}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showGuestsModal, setShowGuestsModal] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)

  const handleCancelClick = (expId: number) => {
    setSelectedExperience(expId)
    setShowCancelModal(true)
  }

  const handleConfirmCancel = () => {
    console.log('Cancelled experience:', selectedExperience)
    setShowCancelModal(false)
    setSelectedExperience(null)
  }
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const mockGuests = [
    {
      id: 1,
      name: 'Kristina Adam',
      avatar: 'https://placehold.co/28x28',
      confirmedDate: 'June 20, 2025',
      totalGuests: 2,
      adults: 2,
      children7to12: 0,
      children12plus: 0,
      status: 'confirmed' as const,
    },
    {
      id: 2,
      name: 'John Doe',
      avatar: 'https://placehold.co/28x28',
      daysLeft: 2,
      totalGuests: 12,
      adults: 6,
      children7to12: 4,
      children12plus: 2,
      status: 'pending-payment' as const,
    },
    {
      id: 3,
      name: 'Jane Smith',
      avatar: 'https://placehold.co/28x28',
      daysLeft: 5,
      totalGuests: 12,
      adults: 6,
      children7to12: 4,
      children12plus: 2,
      status: 'pending-invitation' as const,
    },
  ]

  return (
    <>
      <div className='nb-experience-card'>
        <div className='nb-experience-card__wrapper'>
          {/* IMAGEN */}
          <div className='nb-experience-card__image'>
            <img src={experience.imageUrl} alt={experience.title} />
            <div className='nb-experience-card__image-gradient'>
              <h3>{experience.title}</h3>
            </div>
          </div>

          {/* CONTENIDO */}
          <div className='nb-experience-card__content'>
            {/* Header */}
            <div className='nb-experience-card__header'>
              <div className='nb-experience-card__left'>
                <div className='nb-experience-card__host'>
                  <img src={experience.hostAvatar} alt={experience.hostName} />
                  <span className='nb-experience-card__host-name'>{experience.hostName}</span>
                </div>

                {/* Guests con menú */}
                <div
                  className='nb-experience-card__guests-info'
                  ref={dropdownRef}
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  {/* User Icon */}
                  <svg
                    width='14'
                    height='14'
                    viewBox='0 0 14 14'
                    fill='none'
                    style={{position: 'relative', overflow: 'hidden'}}
                  >
                    <circle cx='7' cy='3' r='2.915' stroke='#151515' strokeWidth='1' fill='none' />
                    <path
                      d='M1.99 12.83c0-2.25 2.24-4.08 5.01-4.08s5.01 1.83 5.01 4.08'
                      stroke='#151515'
                      strokeWidth='1'
                      fill='none'
                    />
                  </svg>
                  <span>{experience.guests} Guests</span>
                  <KTSVG path={'/media/svg/nobilis/info.svg'} />

                  {/* Dropdown */}
                  <GuestsDropdown isOpen={isDropdownOpen} />
                </div>
              </div>

              <div className='nb-experience-card__right'>
                <p className='nb-experience-card__date'>{experience.date}</p>
                <div className='nb-experience-card__time-left'>
                  <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
                    <circle cx='7' cy='7' r='5.83' stroke='#151515' strokeWidth='1' />
                    <path d='M7 4.38v4.47l2.38-2.09' stroke='#151515' strokeWidth='1' />
                  </svg>
                  <span>{experience.daysLeft} days left to accept</span>
                  <KTSVG path={'/media/svg/nobilis/info.svg'} />
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className='nb-experience-card__info'>
              <div className='nb-experience-card__info-row'>
                <span className='nb-experience-card__label'>TOPIC</span>
                <span className='nb-experience-card__value'>{experience.topic}</span>
              </div>
              <div className='nb-experience-card__info-row'>
                <span className='nb-experience-card__label'>MESSAGE</span>
                <div className='nb-experience-card__message'>
                  <p>{experience.message}</p>
                  <button className='nb-experience-card__readmore'>READ MORE</button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className='nb-experience-card__actions'>
              <button
                className='nb-btn nb-btn--outline'
                onClick={() => handleCancelClick(experience.id)}
              >
                REJECT
              </button>
              <button
                className='nb-btn nb-btn--dark'
                style={{color: 'white'}}
                onClick={() => setShowGuestsModal(true)}
              >
                ACCEPT
                <img
                  src='/media/svg/nobilis/vector1.svg'
                  alt=''
                  className='nb-btn-icon nb-btn-icon--white'
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <CancelExperienceModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
      />

      <ConfirmedGuestsModal
        isOpen={showGuestsModal}
        onClose={() => setShowGuestsModal(false)}
        guests={mockGuests}
      />
    </>
  )
}

export default ExperienceCard
