import {FC, useState} from 'react'
import {ExperienceModel} from '../../models/ExperienceModel'
import {KTSVG} from '../../../../../_metronic/helpers'
import InviteMemberModal from '../modals/InviteMemberModal'

interface Props {
  experiences: ExperienceModel[]
}

const ActiveTab: FC<Props> = ({experiences}) => {
  const filtered = experiences.filter((exp) => exp.category === 'active')
  const [showInviteModal, setShowInviteModal] = useState(false)

  const handleInvite = (memberName: string) => {
    console.log('Inviting member:', memberName)
    setShowInviteModal(false)
  }

  return (
    <>
      <div className='nb-active-tab'>
        {filtered.map((exp) => {
          const isInviteOnly = exp.status === 'invite-only' // Card con título y botón
          const isDisabled = exp.status === 'paused' // Card disabled
          const isDefault = !isInviteOnly && !isDisabled // Card sin título ni botón

          return (
            <div
              key={exp.id}
              className={`nb-active-card ${
                isDisabled ? 'nb-active-card--disabled' : ''
              } ${
                isInviteOnly ? 'nb-active-card--invite-only' : ''
              }`}
            >
              <div className='nb-active-card__wrapper'>
                {/* IMAGE */}
                <div className='nb-active-card__image'>
                  <img src={exp.imageUrl} alt={exp.title} />
                  <div className='nb-active-card__image-gradient'>
                    <div className='nb-active-card__image-title'>{exp.title}</div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className='nb-active-card__content'>
                  {/* HEADER */}
                  <div className='nb-active-card__header'>
                    <div className='nb-active-card__hosts'>
                      <div className='nb-active-card__host'>
                        <img src={exp.hostAvatar} alt='You' />
                        <span>You</span>
                      </div>
                      <div className='nb-active-card__host'>
                        <img src={exp.coHostAvatar} alt='Kristina Adam' />
                        <span>Kristina Adam</span>
                      </div>
                    </div>
                    <div className='nb-active-card__edit'>
                      <KTSVG
                        path='/media/svg/nobilis/edit_lg.svg'
                        className='svg-icon-3 cursor-pointer'
                      />
                    </div>
                  </div>

                  {/* INFO */}
                  <div className='nb-active-card__info'>
                    {isInviteOnly && <div className='nb-active-card__label'>Invite Only</div>}

                    <div className='nb-active-card__rows'>
                      <div className='nb-active-card__row'>
                        <div className='nb-active-card__item'>
                          <KTSVG path='/media/svg/nobilis/location_mark.svg' />
                          <span>Vilnius, Lithuania</span>
                        </div>
                        <div className='nb-active-card__item'>
                          <KTSVG path='/media/svg/nobilis/calendar02.svg' />
                          <span>30 August 2026</span>
                        </div>
                        <div className='nb-active-card__item'>
                          <svg
                            width='14'
                            height='14'
                            viewBox='0 0 14 14'
                            fill='none'
                            style={{position: 'relative', overflow: 'hidden'}}
                          >
                            <circle
                              cx='7'
                              cy='3'
                              r='2.915'
                              stroke='#151515'
                              strokeWidth='1'
                              fill='none'
                            />
                            <path
                              d='M1.99 12.83c0-2.25 2.24-4.08 5.01-4.08s5.01 1.83 5.01 4.08'
                              stroke='#151515'
                              strokeWidth='1'
                              fill='none'
                            />
                          </svg>
                          <span>Max 12 Guests</span>
                        </div>
                      </div>

                      <div className='nb-active-card__row'>
                        <div className='nb-active-card__item'>
                          <KTSVG path='/media/svg/nobilis/currency.svg' />
                          <span>USD 2000/Guest</span>
                        </div>
                        <div className='nb-active-card__item'>
                          <KTSVG path='/media/svg/nobilis/clock.svg' />
                          <span>6 Hour</span>
                        </div>
                        <div className='nb-active-card__item nb-active-card__item--hidden'>
                          <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
                            <circle
                              cx='7'
                              cy='7'
                              r='5.835'
                              stroke='#151515'
                              strokeWidth='1'
                              fill='none'
                            />
                          </svg>
                          <span>6 Hour</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className='nb-active-card__footer'>
                    <div className='nb-active-card__guests'>
                      <svg
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        fill='none'
                        style={{position: 'relative', overflow: 'hidden'}}
                      >
                        <circle
                          cx='7'
                          cy='3'
                          r='2.915'
                          stroke='#151515'
                          strokeWidth='1'
                          fill='none'
                        />
                        <path
                          d='M1.99 12.83c0-2.25 2.24-4.08 5.01-4.08s5.01 1.83 5.01 4.08'
                          stroke='#151515'
                          strokeWidth='1'
                          fill='none'
                        />
                      </svg>
                      <span>6/12 guests</span>
                    </div>
                    <div className='nb-active-card__actions'>
                      <button className='nb-active-card__preview'>
                        <span>preview</span>
                      </button>

                      {isInviteOnly && (
                        <button className='nb-active-card__invite'  onClick={() => setShowInviteModal(true)} >
                          <span>invite guests</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <p className='nb-experiences__no-results'>No active experiences available.</p>
        )}
      </div>

      <InviteMemberModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={handleInvite}
        experienceTitle='Sailing Experience Through One Of The Most Beautiful River In Lithuania'
        location='Vilnius, Lithuania'
        date='30 August 2026'
        maxGuests={12}
        price='USD 2000/Pax'
        duration='6 Hour'
      />
    </>
  )
}

export default ActiveTab
