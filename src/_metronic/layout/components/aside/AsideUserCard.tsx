import React from 'react'
import {KTSVG} from '../../../helpers'
import {useSupporContact} from '../../../../app/hooks/support/useSupportContac'
import {formatDateStr} from '../../../../app/helpers/FormatDate'

export function AsideUserCard() {
  const {data} = useSupporContact()

  return (
    <div className='nb-user-card'>
      <div className='nb-user-card-header'>
        <div className='nb-user-card-label'>NEW MEMBER</div>
        <div className='nb-user-card-label'>COMMUNITY GUIDE</div>
      </div>

      <div className='nb-user-card-content'>
        <div className='nb-user-card-info'>
          <div className='nb-user-card-name'>{data?.name}</div>

          <div className='nb-user-card-field'>
            <div className='nb-user-card-field-label'>Email</div>
            <div className='nb-user-card-field-value'>{data?.email}</div>
          </div>

          <div className='nb-user-card-field'>
            <div className='nb-user-card-field-label'>Phone</div>
            <div className='nb-user-card-field-value'>{data?.phoneNumber}</div>
          </div>
        </div>

        <div className='nb-user-card-separator'></div>

        <div className='nb-user-card-availability'>
          <KTSVG path='/media/svg/nobilis/financial_nb.svg' className='nb-clock-icon' />
          <span className='nb-availability-text'>{`Available till ${formatDateStr(
            data?.aviableUntil
          )}`}</span>
        </div>
      </div>
    </div>
  )
}
