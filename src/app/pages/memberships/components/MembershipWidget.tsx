import React, {useState, useEffect} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import {MembershipDetailModel} from '../models/MembershipModel'
import {useMemberships} from '../../../hooks/membership/useMemberships'

type Props = {
  handleScroll: () => void
  handleMembershipSelected: (data: MembershipDetailModel | null) => void
}

const MembershipWidget: React.FC<Props> = ({handleScroll, handleMembershipSelected}) => {
  const [membershipSelected, setMembershipSelected] = useState<string | null>(null)
  const {memberships, loading} = useMemberships()

  useEffect(() => {
    if (!membershipSelected) {
      handleMembershipSelected(null)
    }
  }, [membershipSelected, handleMembershipSelected])

  return (
    <>
      {loading ? (
        <div
          className='d-flex justify-content-center align-items-center'
          style={{minHeight: '400px'}}
        >
          <span className='spinner-border text-primary' role='status' />
        </div>
      ) : (
        memberships &&
        memberships.map((item) => (
          <div className='col-xl-4' key={item.id}>
            <div
              className={`card card-xl-stretch mb-xl-8 card-custom shadow bg-dark border border-secondary border-hover`}
            >
              <div className='card-body p-0'>
                <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-dark`}>
                  <div className='d-flex flex-stack'>
                    <h3 className='m-0 text-white fw-bolder fs-6'>{item.title}</h3>
                  </div>
                  <div className='d-flex flex-column text-white pt-8'>
                    <span className='fw-bolder fs-2x'>
                      {item.priceYear}
                      <span className='fs-7'>/{item.interval}</span>
                    </span>
                    <span className='fw-bolder fs-2x pt-1'>
                      {item.priceStr}
                      <span className='ms-1 fs-8'>{item.priceDescription}</span>
                    </span>
                    <div className='separator mx-1 my-4'></div>
                  </div>
                </div>

                <div
                  className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-dark d-flex flex-column'
                  style={{marginTop: '-100px', minHeight: '600px'}}
                >
                  <div className='mb-3'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
                      BENEFITS
                    </span>
                  </div>
                  {item.features.map((feature: string, i: number) => (
                    <div key={i} className='d-flex align-items-center mb-4'>
                      <KTSVG
                        path='/media/icons/duotune/general/gen043.svg'
                        className='svg-icon-1'
                      />
                      <div className='d-flex align-items-center flex-wrap w-100 ms-2'>
                        <div className='fw-bolder fs-7 text-white pe-1 text-hover-secondary'>
                          {feature}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='mb-3'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
                      REQUIREMENTS
                    </span>
                  </div>
                  {item.requirements.map((requirement: string, i: number) => {
                    const isLast = i === item.requirements.length - 1

                    return (
                      <div key={i} className='d-flex align-items-center mb-4'>
                        <KTSVG
                          path='/media/icons/duotune/general/gen043.svg'
                          className='svg-icon-1'
                        />
                        <div className='d-flex align-items-center flex-wrap w-100 ms-2'>
                          <a
                          href='#'
                            onClick={() => {
                              if (isLast && item.requirements.length > 1) {
                                handleScroll()
                              }
                            }}
                            className={`${
                              isLast && item.requirements.length > 1
                                ? 'cursor-pointer text-hover-primary'
                                : 'text-hover-secondary'
                            }  'fw-bolder fs-7 text-white pe-1'`}
                          >
                            {requirement}
                          </a>
                        </div>
                      </div>
                    )
                  })}

                  <div className='mt-auto'>
                    <button
                      className={`${
                        membershipSelected === item.id
                          ? 'btn-active-secondary text-dark'
                          : 'bg-dark'
                      } btn border btn-bg-dark text-white btn-lg btn-block w-100 `}
                      disabled={membershipSelected !== null && item.id !== membershipSelected}
                      onClick={() => {
                        setMembershipSelected(item.id === membershipSelected ? null : item.id)
                        handleMembershipSelected(item)
                      }}
                      style={{borderRadius: '25px'}}
                    >
                      {membershipSelected === item.id || membershipSelected === null
                        ? 'Continuar'
                        : 'Inactive'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  )
}

export {MembershipWidget}
