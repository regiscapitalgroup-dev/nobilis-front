import React from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import { MembershipDetailModel } from '../models/MembershipModel'

type Props = {
  detail: MembershipDetailModel | null | undefined
}

const MembershipSelectedDetailWidget: React.FC<Props> = ({detail}) => {
  return (
    <>
      {detail && (
        <div className='card bg-dark mx-auto w-100 pt-10 pb-10'>
          <div className={`card  bg-dark`}>
            <div className='card-body p-0'>
              <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-dark`}>
                <div className='d-flex flex-stack'>
                  <h3 className='m-0 text-white fw-bolder fs-3'>{detail.title}</h3>
                </div>
                <div className='d-flex flex-column text-white pt-8'>
                  <span className='fw-bolder fs-2x'>
                    {detail.priceYear}
                    <span className='fs-7'>/{detail.interval}</span>
                  </span>
                  <span className='fw-bolder fs-2x pt-1'>
                    {detail.priceStr}
                    <span className='ms-1 fs-8'>{detail.priceDescription}</span>
                  </span>
                  <div className='separator mx-1 my-4'></div>
                </div>
              </div>

              <div
                className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-dark d-flex flex-column'
                style={{marginTop: '-100px', minHeight: '600px'}}
              >
                <div className='mb-3'>
                  <span className='menu-section text-muted text-uppercase fs-8 ls-1'>BENEFITS</span>
                </div>
                {detail.features.map((feature: string, i: number) => (
                  <div key={i} className='d-flex align-items-center mb-4'>
                    <KTSVG path='/media/icons/duotune/general/gen043.svg' className='svg-icon-1' />
                    <div className='d-flex align-items-center flex-wrap w-100 ms-2'>
                      <div className='fw-bolder fs-7 text-white pe-1 text-hover-secondary'>{feature}</div>
                    </div>
                  </div>
                ))}
                <div className='mb-3'>
                  <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
                    REQUIREMENTS
                  </span>
                </div>
                {detail.requirements.map((requirement: string, i: number) => {
                  return (
                    <div key={i} className='d-flex align-items-center mb-4'>
                      <KTSVG
                        path='/media/icons/duotune/general/gen043.svg'
                        className='svg-icon-1'
                      />
                      <div className='d-flex align-items-center flex-wrap w-100 ms-2'>
                        <span className={'fw-bolder fs-7 text-white pe-1 text-hover-secondary'}>{requirement}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export {MembershipSelectedDetailWidget}
