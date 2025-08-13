import {FC} from 'react'

const HeaderText: FC<{title: string; subtitle: string}> = ({title, subtitle}) => {
  return (
    <>
      <div className='text-center mb-10'>
        <h2 className='nb-heading-h2 nb-text-center mb-3'>{title}</h2>
        <div className='nb-body nb-center'>{subtitle}</div>
      </div>
    </>
  )
}

const HeaderTitle: FC<{text: string}> = ({text}) => {
  return (
    <>
      {/* begin::Title */}
      <div className='text-muted fs-7'>{text}</div>
      {/* end::Title */}
    </>
  )
}

const FooterTitle: FC<{text: string}> = ({text}) => {
  return (
    <>
      {/* begin::Title */}
      <div className='nb-body nb-center  nb-tag'>{text}</div>
      {/* end::Title */}
    </>
  )
}

export {HeaderText, HeaderTitle, FooterTitle}
