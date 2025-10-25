// src/app/modules/auth/components/RegistrationHeader.tsx
import React from 'react'

type Props = {
  step?: number
  total?: number
  title?: string      
  subTitle?: string
}

const RegistrationHeader: React.FC<Props> = ({
  step = 1,
  total = 4,
  title = 'There is currently a waiting list\nfor Nobilis membership',
  subTitle = 'To join the waiting list, please leave your details below:',
}) => {
  return (
    <div className='nb-page-header'>
      <div className='nb-step'>STEP {step}/{total}</div>
      <h1 className='nb-heading-xl'>
        <span className='nb-heading-text'>{title}</span>
      </h1>
      <p className='nb-subtitle'>
        <span className='nb-subtitle-text'>{subTitle}</span>
      </p>
    </div>
  )
}

export default RegistrationHeader
