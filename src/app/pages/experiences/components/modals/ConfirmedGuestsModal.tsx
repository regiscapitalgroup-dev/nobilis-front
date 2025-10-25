import {FC} from 'react'
import { KTSVG } from '../../../../../_metronic/helpers'

interface Guest {
  id: number
  name: string
  avatar: string
  confirmedDate?: string
  daysLeft?: number
  totalGuests: number
  adults: number
  children7to12: number
  children12plus: number
  status: 'confirmed' | 'pending-payment' | 'pending-invitation'
}

interface Props {
  isOpen: boolean
  onClose: () => void
  guests: Guest[]
}

const ConfirmedGuestsModal: FC<Props> = ({isOpen, onClose, guests}) => {
  if (!isOpen) return null

  const confirmedGuests = guests.filter((g) => g.status === 'confirmed')
  const pendingPayments = guests.filter((g) => g.status === 'pending-payment')
  const pendingInvitations = guests.filter((g) => g.status === 'pending-invitation')

  const totalConfirmed = confirmedGuests.reduce((sum, g) => sum + g.totalGuests, 0)
  const maxGuests = 12

  return (
    <div className='nb-modal-overlay' onClick={onClose}>
      <div className='nb-guests-modal' onClick={(e) => e.stopPropagation()}>
        {/* CLOSE BUTTON */}
        <button className='nb-guests-modal__close' onClick={onClose}>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <circle cx='12' cy='12' r='10' stroke='#808080' strokeWidth='1' />
            <path d='M9.17 9.17l5.66 5.66M14.83 9.17l-5.66 5.66' stroke='#808080' strokeWidth='1' />
          </svg>
        </button>

        {/* HEADER */}
        <div className='nb-guests-modal__header'>
          <h2 className='nb-guests-modal__title'>Confirmed Guests</h2>
          <div className='nb-guests-modal__count'>
            <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
              <circle cx='7' cy='4.67' r='2.335' stroke='#151515' strokeWidth='1' fill='none' />
              <path
                d='M2.33 12.25c0-1.93 1.93-3.5 4.67-3.5s4.67 1.57 4.67 3.5'
                stroke='#151515'
                strokeWidth='1'
                fill='none'
              />
            </svg>
            <span>
              {totalConfirmed}/{maxGuests} guests
            </span>
          </div>
        </div>

        {/* CONFIRMED GUESTS */}
        <div className='nb-guests-modal__section'>
          {confirmedGuests.map((guest) => (
            <div key={guest.id} className='nb-guests-modal__item'>
              <div className='nb-guests-modal__item-left'>
                <div className='nb-guests-modal__user'>
                  <img src={guest.avatar} alt={guest.name} />
                  <span className='nb-guests-modal__user-name'>{guest.name}</span>
                </div>
                <div className='nb-guests-modal__date'>Confirmed at {guest.confirmedDate}</div>
              </div>

              <div className='nb-guests-modal__item-right'>
                <div className='nb-guests-modal__total'>
                  {guest.totalGuests} {guest.totalGuests === 1 ? 'Guest' : 'Guests'}
                </div>
                <div className='nb-guests-modal__breakdown'>
                  <div className='nb-guests-modal__breakdown-item'>
                    <span className='nb-guests-modal__breakdown-label'>Adult</span>
                    <span className='nb-guests-modal__breakdown-value'>: {guest.adults}</span>
                  </div>
                  <div className='nb-guests-modal__breakdown-item'>
                    <span className='nb-guests-modal__breakdown-label'>7-12 Years Old</span>
                    <span className='nb-guests-modal__breakdown-value'>: {guest.children7to12}</span>
                  </div>
                  <div className='nb-guests-modal__breakdown-item'>
                    <span className='nb-guests-modal__breakdown-label'>12+ Years Old</span>
                    <span className='nb-guests-modal__breakdown-value'>: {guest.children12plus}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PENDING PAYMENTS */}
        {pendingPayments.length > 0 && (
          <>
            <div className='nb-guests-modal__section-title'>Pending payments</div>
            <div className='nb-guests-modal__section'>
              {pendingPayments.map((guest) => (
                <div key={guest.id} className='nb-guests-modal__item'>
                  <div className='nb-guests-modal__item-left'>
                    <div className='nb-guests-modal__user'>
                      <img src={guest.avatar} alt={guest.name} />
                      <span className='nb-guests-modal__user-name'>{guest.name}</span>
                    </div>
                    <div className='nb-guests-modal__status'>
                      <KTSVG path='/media/svg/nobilis/clock.svg' />
                      <span>{guest.daysLeft} days left to pay</span>
                      <KTSVG path='/media/svg/nobilis/info.svg' />
                    </div>
                  </div>

                  <div className='nb-guests-modal__item-right'>
                    <div className='nb-guests-modal__total'>
                      {guest.totalGuests} {guest.totalGuests === 1 ? 'Guest' : 'Guests'}
                    </div>
                    <div className='nb-guests-modal__breakdown'>
                      <div className='nb-guests-modal__breakdown-item'>
                        <span className='nb-guests-modal__breakdown-label'>Adult</span>
                        <span className='nb-guests-modal__breakdown-value'>: {guest.adults}</span>
                      </div>
                      <div className='nb-guests-modal__breakdown-item'>
                        <span className='nb-guests-modal__breakdown-label'>7-12 Years Old</span>
                        <span className='nb-guests-modal__breakdown-value'>
                          : {guest.children7to12}
                        </span>
                      </div>
                      <div className='nb-guests-modal__breakdown-item'>
                        <span className='nb-guests-modal__breakdown-label'>12+ Years Old</span>
                        <span className='nb-guests-modal__breakdown-value'>
                          : {guest.children12plus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PENDING INVITATIONS */}
        {pendingInvitations.length > 0 && (
          <>
            <div className='nb-guests-modal__section-title'>Pending invitations</div>
            <div className='nb-guests-modal__section'>
              {pendingInvitations.map((guest) => (
                <div key={guest.id} className='nb-guests-modal__item'>
                  <div className='nb-guests-modal__item-left'>
                    <div className='nb-guests-modal__user'>
                      <img src={guest.avatar} alt={guest.name} />
                      <span className='nb-guests-modal__user-name'>{guest.name}</span>
                    </div>
                    <div className='nb-guests-modal__status'>
                      <KTSVG path='/media/svg/nobilis/clock.svg' />
                      <span>{guest.daysLeft} days left to accept</span>
                      <KTSVG path='/media/svg/nobilis/info.svg' />
                    </div>
                  </div>

                  <div className='nb-guests-modal__item-right'>
                    <div className='nb-guests-modal__total'>
                      {guest.totalGuests} {guest.totalGuests === 1 ? 'Guest' : 'Guests'}
                    </div>
                    <div className='nb-guests-modal__breakdown'>
                      <div className='nb-guests-modal__breakdown-item'>
                        <span className='nb-guests-modal__breakdown-label'>Adult</span>
                        <span className='nb-guests-modal__breakdown-value'>: {guest.adults}</span>
                      </div>
                      <div className='nb-guests-modal__breakdown-item'>
                        <span className='nb-guests-modal__breakdown-label'>7-12 Years Old</span>
                        <span className='nb-guests-modal__breakdown-value'>
                          : {guest.children7to12}
                        </span>
                      </div>
                      <div className='nb-guests-modal__breakdown-item'>
                        <span className='nb-guests-modal__breakdown-label'>12+ Years Old</span>
                        <span className='nb-guests-modal__breakdown-value'>
                          : {guest.children12plus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ConfirmedGuestsModal