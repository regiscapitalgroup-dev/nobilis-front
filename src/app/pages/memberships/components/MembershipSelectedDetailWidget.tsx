import React from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import {MembershipDetailModel} from '../models/MembershipModel'

type Props = {
  detail: MembershipDetailModel | null | undefined
}

const MembershipSelectedDetailWidget: React.FC<Props> = ({detail}) => {
  return (
    <>
      {detail && (
        <div className='card mx-auto w-100 pt-10 pb-10'>
          <div className={`card `}>
            <div className='card-body p-0'>
              <div className={`px-9 pt-7 card-rounded h-275px w-100 `}>
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
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export {MembershipSelectedDetailWidget}
