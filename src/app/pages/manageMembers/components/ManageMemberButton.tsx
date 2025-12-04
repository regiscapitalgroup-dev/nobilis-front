import React from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import {Link} from 'react-router-dom'

interface ButtonProps {
  label: string
  onClick: () => void
  icon?: 'calendar-edit' | 'plus' | 'none'
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
}

export const ManageMemberButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'outline',
  disabled = false,
}) => {
  return (
    <Link className={`nobilis-create-button nobilis-create-button--${variant}`} to={'/biography'}>
      <div className='nobilis-create-button__icon' data-property-1='calendar-edit'>
        <KTSVG path='/media/svg/nobilis/calendar-edit.svg' />
      </div>
      <div className='nobilis-create-button__label'>{label}</div>
    </Link>
  )
}
